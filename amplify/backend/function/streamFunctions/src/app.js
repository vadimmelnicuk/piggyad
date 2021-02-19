/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_SECRETTABLE_ARN
	API_ADSTR_SECRETTABLE_NAME
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient()
const textract = new aws.Textract()
const twitchm3u8 = require("twitch-m3u8")
const ffmpeg = require('fluent-ffmpeg')
const fsAsync = require('fs').promises
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { getTwitchStreamerData } = require('twitch')

// ffmpeg setup
ffmpeg.setFfmpegPath('/opt/nodejs/ffmpeg')

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
});

// Adstr methods
app.post('/stream/verify', async (req, res) => {
  if (!twitchAccessToken) {
    await getSecrets()
  }

  const stream = await getStream(req.body.id)
  const twitchStreamerDataResponse = await getTwitchStreamerData(twitchClientId, twitchAccessToken, stream)
  
  console.log(stream)
  console.log(twitchStreamerDataResponse.data)

  if (twitchStreamerDataResponse.status == 200 && twitchStreamerDataResponse.data.data.length) {
    // Stream is online
    // const buffer = await getImageBuffer('https://static-cdn.jtvnw.net/previews-ttv/live_user_vadimcchi-1920x1080.jpg')
    
    // console.log(buffer)
    
    // const params = {
    //   Document: {
    //     Bytes: buffer
    //   },
    //   FeatureTypes: ['TABLES', 'FORMS']
    // }

    // const request = textract.analyzeDocument(params)
    // const data = await request.promise()

    // console.log(data)
    const streamLink = await getStreamLink(stream.Item.username)
    console.log(streamLink)
    
    // Download the stream link snippet
    try {
      const streamFile = await axios.get(streamLink[0].url, { responseType: 'blob' })
      // await fsAsync.writeFile('/tmp/' + stream.Item.username + '.m3u8', file.data)
      
      let lines = streamFile.data.toString().split('\n')
      let streamUrlTs = null
      
      for (const line of lines) {
        const lineStart = line.slice(0,5)
        
        if (lineStart === 'https') {
          streamUrlTs = line
          break
        }
      }
      
      console.log(streamUrlTs)
      
      const streamFileTs = await axios.get(streamUrlTs, { responseType: 'blob' })
      await fsAsync.writeFile('/tmp/' + stream.Item.username + '.ts', streamFileTs.data)
      
      await getStreamScreenshot(stream.Item.username)

    } catch (error) {
      console.log(error)
    }

    console.log('Finished')
  } else {
    // res.json({error: 'Streamer is offline'})
  }

  
  
  res.json({success: 'Verified!'})
})

async function getSecrets() {
  try {
    const data = await docClient.scan({ TableName: process.env.API_ADSTR_SECRETTABLE_NAME }).promise()
    
    if (data.Items.length) {
      twitchAccessToken = data.Items.find(secret => { return secret.name === 'twitchAccessToken' })
      twitchClientId = data.Items.find(secret => { return secret.name === 'twitchClientId' })
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

async function getStream(id) {
  try {
    const data = await docClient.get({
      TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
      Key: {
        'id': id
      }
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
      .output('/tmp/' + username + '.png')
      .noAudio()
      .seek('0:00')
      .on("error", function(err) {
        console.log('An Error Occurred: ' + err.message)
        reject()
      })
      .on("end", function() {
        console.log('Screenshot Downloaded')
        resolve()
      })
      .run()
  })
}

async function getImageBuffer(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'binary')
    return buffer
  } catch (error) {
    console.log(error)
  }
}

module.exports = app