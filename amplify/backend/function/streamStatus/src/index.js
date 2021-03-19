/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_GRAPHQLAPIKEYOUTPUT
	API_ADSTR_SECRETTABLE_ARN
	API_ADSTR_SECRETTABLE_NAME
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient()
const axios = require('axios')
const { getTwitchAccessToken, validateTwitchAccessToken, getTwitchStreamersData } = require('twitch')

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
    const streamsOnline = await getStreams('ONLINE')
    const streamsOffline = await getStreams('OFFLINE')
    const streams = [...streamsOnline.Items, ...streamsOffline.Items]

    if (streams.length) {
      const twitchStreamerDataResponse = await getTwitchStreamersData(twitchClientId, twitchAccessToken, streams)

      if (twitchStreamerDataResponse.status === 200) {
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

async function getStreams(status) {
  try {
    const data = await docClient.query({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      IndexName: 'getStreamByStatus',
      KeyConditionExpression: "#status=:status",
      ExpressionAttributeNames:{
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":status": status
      }
    }).promise()

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
      Key: {'id': twitchAccessToken.id},
      UpdateExpression: 'set #key=:key',
      ExpressionAttributeNames: {'#key': 'key'},
      ExpressionAttributeValues: {':key': twitchAccessToken.key}
    }).promise()
    
    return response
  } catch (error) {
    return error
  }
}

async function updateStreamsStatus(streams, streamsCurrentState) {
  console.log("Updating streams status")

  for (const stream of streams) {
    var twitchStatus = 'OFFLINE'

    const twitchStream = streamsCurrentState.find(data => { return data.user_login === stream.username})

    if (twitchStream) {
      twitchStatus = 'ONLINE'
    }

    console.log('username: ' + stream.username + ' stream: ' + stream.status + ' online: ' + twitchStatus)

    if (stream.status !== twitchStatus) {
      await setStreamOnlineStatus(stream, twitchStatus)
    }
    if (twitchStatus === 'ONLINE') {
      await setTwitchStreamData(stream, twitchStream)
    }
  }
}

async function setStreamOnlineStatus(stream, twitchStatus) {
  console.log("Changing stream status")
  
  try {
    await docClient.update({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      Key: {'id': stream.id},
      UpdateExpression: 'set #status=:status',
      ExpressionAttributeNames: {'#status': 'status'},
      ExpressionAttributeValues: {':status': twitchStatus}
    }).promise()

    await postQuery({
      query: `mutation ($owner: String!) {streamResolver(owner: $owner) {owner}}`,
      variables: {owner: stream.owner}
    })
  } catch (error) {
    console.log(error)
  }
}

async function setTwitchStreamData(stream, twitchStreamData) {
  console.log("Setting twitch stream data")

  try {
    await docClient.update({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      Key: {'id': stream.id},
      UpdateExpression: 'set twitchStreamData=:twitchStreamData',
      ExpressionAttributeValues: {':twitchStreamData': twitchStreamData}
    }).promise()

    await postQuery({
      query: `mutation ($owner: String!) {streamResolver(owner: $owner) {owner}}`,
      variables: {owner: stream.owner}
    })
  } catch (error) {
    console.log(error)
  }
}

async function postQuery(query) {
  console.log('Posting query')

  try {
    await axios({
      method: 'POST',
      url: process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT,
      headers: {'x-api-key': process.env.API_ADSTR_GRAPHQLAPIKEYOUTPUT},
      data: query
    })
  } catch (error) {
    console.log(error)
  }
}