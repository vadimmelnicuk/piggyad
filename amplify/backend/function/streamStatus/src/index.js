/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_SECRETTABLE_ARN
	API_ADSTR_SECRETTABLE_NAME
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require('aws-sdk')
var docClient = new aws.DynamoDB.DocumentClient()
var { getTwitchAccessToken, validateTwitchAccessToken, getTwitchStreamersData } = require('twitch')

var twitchAccessToken = null
var twitchClientId = null
var twitchClientSecret = null

exports.handler = async (event, context) => {
  // Check whether secrets were previously stored
  if (!twitchAccessToken) {
    await getSecrets()
  }

  // Check whether twitchAccessToken key exists
  if (!twitchAccessToken.key) {
    // Get token
    const twitchAccessTokenResponse = await getTwitchAccessToken(twitchClientId, twitchClientSecret)

    if (twitchAccessTokenResponse.status == 200) {      
      twitchAccessToken.key = twitchAccessTokenResponse.data.access_token
      await updateTwitchAccessToken()
    }
  }

  const twitchAccessTokenValid = await validateTwitchAccessToken(twitchClientId, twitchAccessToken)

  if (twitchAccessTokenValid) {
    // Get Streams TODO: limit the query to 100 streams in the future
    const streams = await getStreams()

    if (streams.Items.length) {
      const twitchStreamerDataResponse = await getTwitchStreamersData(twitchClientId, twitchAccessToken, streams)

      if (twitchStreamerDataResponse.status == 200) {
        await updateStreamsStatus(streams, twitchStreamerDataResponse.data.data) 
      }
    }
  } else {
    const renewTwitchAccessTokenResponse = await renewTwitchAccessToken()
  }
  
  context.done(null, event)
}

async function getSecrets() {
  try {
    const data = await docClient.scan({ TableName: process.env.API_ADSTR_SECRETTABLE_NAME }).promise()
    
    if (data.Items.length) {
      twitchAccessToken = data.Items.find(secret => { return secret.name === 'twitchAccessToken' })
      twitchClientId = data.Items.find(secret => { return secret.name === 'twitchClientId' })
      twitchClientSecret = data.Items.find(secret => { return secret.name === 'twitchClientSecret' })
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

async function getStreams() {
  try {
    const data = await docClient.scan({ TableName: process.env.API_ADSTR_STREAMTABLE_NAME }).promise()

    return data
  } catch (error) {
    return error
  }
}

async function renewTwitchAccessToken() {
  console.log("Renewing Twitch access token")
  
}

async function updateTwitchAccessToken() {
  console.log("Updating Twitch access token")
  
  try {
    const response = await docClient.update({
      TableName: process.env.API_ADSTR_SECRETTABLE_NAME,
      Key: { 'id': twitchAccessToken.id },
      UpdateExpression: 'set #key=:k',
      ExpressionAttributeNames: { '#key': 'key' },
      ExpressionAttributeValues: { ':k': twitchAccessToken.key }
    }).promise()
    
    return response
  } catch (error) {
    return error
  }
}

async function updateStreamsStatus(streams, streamsCurrentState) {
  console.log("Updating streams status")

  for (const stream of streams.Items) {
    var online = false

    const streamCurrentState = streamsCurrentState.find(data => { return data.user_login === stream.username })

    if (streamCurrentState) {
      online = true
    }

    console.log('username: ' + stream.username + ' stream: ' + stream.online + ' online: ' + online)

    if (stream.online !== online) {
      await setStreamOnlineStatus(stream.id, online)
    }
  }
}

async function setStreamOnlineStatus(id, online) {
  console.log("Changing stream status")
  
  try {
    await docClient.update({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      Key: { 'id': id },
      UpdateExpression: 'set #online=:online',
      ExpressionAttributeNames: { '#online': 'online' },
      ExpressionAttributeValues: { ':online': online }
    }).promise()
  } catch (error) {
    console.log(error)
  }
}