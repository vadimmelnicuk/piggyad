/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_ADSTR_ADVERTJOBTABLE_ARN
	API_ADSTR_ADVERTJOBTABLE_NAME
	API_ADSTR_ADVERTTABLE_ARN
	API_ADSTR_ADVERTTABLE_NAME
	API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_GRAPHQLAPIKEYOUTPUT
	API_ADSTR_IMPRESSIONTABLE_ARN
	API_ADSTR_IMPRESSIONTABLE_NAME
	API_ADSTR_SECRETTABLE_ARN
	API_ADSTR_SECRETTABLE_NAME
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const textract = new AWS.Textract()
const twitchm3u8 = require("twitch-m3u8")
const ffmpeg = require('fluent-ffmpeg')
const fsAsync = require('fs').promises
const axios = require('axios')
const uuidv4 = require('uuid').v4
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const {getTwitchStreamerData, getTwitchUserData} = require('twitch')

// ffmpeg setup
ffmpeg.setFfmpegPath('/opt/bin/ffmpeg')

// declare a new express app
var app = express()
var twitchAccessToken = null
var twitchClientId = null

app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

// Adstr methods
app.post('/stream/verify', async (req, res) => {
  if (!twitchAccessToken) {
    await getSecrets()
  }

  const stream = await getStream(req.body.id)
  const twitchStreamerDataResponse = await getTwitchStreamerData(twitchClientId, twitchAccessToken, stream)
  
  console.log(twitchStreamerDataResponse)

  if (twitchStreamerDataResponse.status == 200 && twitchStreamerDataResponse.data.data.length) {
    // Stream is online
    // Get stream user data
    const twitchUserDataResponse = await getTwitchUserData(twitchClientId, twitchAccessToken, stream)

    // Get stream link
    const streamLink = await getStreamLink(stream.Item.username)
    console.log(streamLink)
    
    // Download the stream link snippet
    try {
      const streamFile = await axios.get(streamLink[0].url, { responseType: 'blob' })
      
      let lines = streamFile.data.toString().split('\n')
      let streamUrlTs = null

      console.log(lines)
      
      for (const line of lines) {
        const lineStart = line.slice(0,5)
        
        if (lineStart === 'https') {
          streamUrlTs = line
          break
        }
      }
      
      console.log('Stream ts link: ' + streamUrlTs)
      
      const streamFileTs = await axios.get(streamUrlTs, { responseType: 'arraybuffer' })
      await fsAsync.writeFile('/tmp/' + stream.Item.username + '.ts', streamFileTs.data)
      await getStreamScreenshot(stream.Item.username)
      const screenshot = await fsAsync.readFile('/tmp/' + stream.Item.username + '.png')
      
      const recognition = await textract.detectDocumentText({
        Document: {
          Bytes: screenshot
        }
      }).promise()
  
      console.log(recognition)
      
      const verificationToken = stream.Item.verificationToken.split('-')
      const verification1 = recognition.Blocks.find(block => {return block.Text === verificationToken[1]})
      const verification2 = recognition.Blocks.find(block => {return block.Text === verificationToken[2]})
      const verification3 = recognition.Blocks.find(block => {return block.Text === verificationToken[3]})
      
      if (verification1 && verification2 && verification3) {
        console.log("Changing stream verification status")

        await docClient.update({
          TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
          Key: {'id': stream.Item.id},
          UpdateExpression: 'set #status=:status, twitchUserData=:twitchUserData',
          ExpressionAttributeNames: {'#status': 'status'},
          ExpressionAttributeValues: {':status': 'OFFLINE', ':twitchUserData': twitchUserDataResponse.data.data[0]}
        }).promise()

        await postQuery({
          query: `mutation ($owner: String!) {streamResolver(owner: $owner) {owner}}`,
          variables: {owner: stream.Item.owner}
        })
        
        res.json({success: 'Stream successfully verified'})
      } else {
        res.json({error: 'Stream verification failed'})
      }
    } catch (error) {
      res.json({error: error})
    }
  } else {
    res.json({error: 'Stream is offline'})
  }
})

app.post('/advert-job/fulfill', async (req, res) => {
  const advertJob = await getAdvertJob(req.body.id)
  const stream = await getStream(advertJob.Item.advertJobStreamId)

  console.log(advertJob)

  //Add impressions record
  const date = new Date()
  const impression = await docClient.put({
    TableName: process.env.API_ADSTR_IMPRESSIONTABLE_NAME,
    Item: {
      'id': uuidv4(),
      'streamer': advertJob.Item.streamer,
      'streamId': advertJob.Item.advertJobStreamId,
      'advertId': advertJob.Item.advertJobAdvertId,
      // 'impressions': stream.Item.twitchStreamData['viewer_count'],
      'impressions': 125, // Impressions placeholder
      'createdAt': date.toISOString(),
      'updatedAt': date.toISOString()
    }
  }).promise()

  //Delete advert job
  await docClient.delete({
    TableName: process.env.API_ADSTR_ADVERTJOBTABLE_NAME,
    Key: {'id': advertJob.Item.id}
  }).promise()

  await postQuery({
    query: `mutation ($streamer: String!) {advertJobResolver(streamer: $streamer) {streamer}}`,
    variables: {streamer: advertJob.Item.streamer}
  })

  //Update last impression date
  await docClient.update({
    TableName: process.env.API_ADSTR_ADVERTTABLE_NAME,
    Key: {'id': advertJob.Item.advertJobAdvertId},
    UpdateExpression: 'set lastImpression=:lastImpression',
    ExpressionAttributeValues: {':lastImpression': date.toISOString()}
  }).promise()

  res.json({success: 'Advert job processed'})
})

async function getSecrets() {
  console.log('Getting secrets')
  
  try {
    const data = await docClient.scan({TableName: process.env.API_ADSTR_SECRETTABLE_NAME}).promise()
    
    if (data.Items.length) {
      twitchAccessToken = data.Items.find(secret => {return secret.name === 'twitchAccessToken'})
      twitchClientId = data.Items.find(secret => {return secret.name === 'twitchClientId'})
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

async function getStream(id) {
  console.log('Getting stream')
  
  try {
    const data = await docClient.get({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      Key: {'id': id}
    }).promise()

    return data
  } catch (error) {
    return error
  }
}

async function getStreamLink(username) {
  console.log('Getting stream link')
    
  try {
    const data = await twitchm3u8.getStream(username)
    return data
  } catch(error) {
    console.log(error)
  }
}

async function getStreamScreenshot(username) {
  return new Promise((resolve, reject) => {
    console.log('Getting stream screenshot')
    
    ffmpeg('/tmp/' + username + '.ts')
    .screenshots({
      timestamps: ['00:00.000'],
      filename: username + '.png',
      folder: '/tmp',
    })
    .on("error", function(err) {
      console.log('An Error Occurred: ' + err.message)
      reject()
    })
    .on("end", function() {
      console.log('Screenshot Downloaded')
      resolve()
    })
  })
}

async function getAdvertJob(id) {
  console.log('Getting advert job')
  
  try {
    const data = await docClient.get({
      TableName: process.env.API_ADSTR_ADVERTJOBTABLE_NAME,
      Key: {'id': id}
    }).promise()

    return data
  } catch (error) {
    return error
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

module.exports = app