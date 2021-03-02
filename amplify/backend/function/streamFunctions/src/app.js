/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
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
const aws4 = require('aws4')
const urlParse = require('url').URL
const https = require('https')
const cognitoSP = new AWS.CognitoIdentityServiceProvider({region: process.env.REGION})
const AWSAppSyncClient = require('aws-appsync').default
const gql = require('graphql-tag')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const {getTwitchStreamerData} = require('twitch')

require('es6-promise').polyfill()
require('isomorphic-fetch')

// ffmpeg setup
ffmpeg.setFfmpegPath('/opt/bin/ffmpeg')

// declare a new express app
var app = express()
var twitchAccessToken = null
var twitchClientId = null
var cognitoUserPoolClientId  = null
var cognitoUserPoolId = null
var cognitoAdmin = null

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
      const verification1 = recognition.Blocks.find(block => { return block.Text === verificationToken[1] })
      const verification2 = recognition.Blocks.find(block => { return block.Text === verificationToken[2] })
      const verification3 = recognition.Blocks.find(block => { return block.Text === verificationToken[3] })
      
      if (verification1 && verification2 && verification3) {
        console.log("Changing stream verification status")

        // TODO: refactor to use AppSync API
        // Below is the DynamoDB implementation

        // ================================================= DynamoDB Method

        // await docClient.update({
        //   TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
        //   Key: { 'id': stream.Item.id },
        //   UpdateExpression: 'set #verified=:verified',
        //   ExpressionAttributeNames: { '#verified': 'verified' },
        //   ExpressionAttributeValues: { ':verified': true }
        // }).promise()

        // ================================================= Cognito Method

        // const authParams = {
        //   AuthFlow: "ADMIN_NO_SRP_AUTH",
        //   ClientId: cognitoUserPoolClientId.key,
        //   UserPoolId: cognitoUserPoolId.key,
        //   AuthParameters: {
        //     USERNAME: 'admin',
        //     PASSWORD: cognitoAdmin.key
        //   }
        // }
        
        // const credentials = await getCredentials(authParams)

        // const client = new AWSAppSyncClient({
        //   disableOffline: true,
        //   url: process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT,
        //   region: process.env.REGION,
        //   auth: {
        //     type: "AMAZON_COGNITO_USER_POOLS",
        //     jwtToken: credentials.AuthenticationResult.IdToken
        //   }
        // })
        // await client.hydrated()

        // const updateStream = gql(`
        //   mutation updateStream($input: UpdateStreamInput!) {
        //     updateStream(input: $input) {
        //       id
        //       verified
        //     }
        //   }
        // `)

        // const response = await client.mutate({
        //   mutation: updateStream,
        //   variables: {
        //     input: {
        //       id: stream.Item.id,
        //       verified: true
        //     }
        //   },
        //   fetchPolicy: 'no-cache'
        // })

        // ================================================= aws4 Method

        // const updateStream = `
        // mutation updateStream($input: UpdateStreamInput!) {
        //   updateStream(input: $input) {
        //     id
        //     verified
        //   }
        // }`

        // const body = {
        //   query: updateStream,
        //   operationName: 'updateStream',
        //   variables: {
        //     input: {
        //       id: stream.Item.id,
        //       verified: true
        //     }
        //   }
        // }

        const updateNote = `
        mutation updateNote($input: UpdateNoteInput!) {
          updateNote(input: $input) {
            id
            body
          }
        }`
        const body = {
          query: updateNote,
          operationName: 'updateNote',
          variables: {
            input: {
              id: '9434df1e-fe39-45a5-8052-cff71c22173f',
              body: 'lambda-mutation'
            }
          }
        }
        const signOptions = {
          method: 'POST',
          url: process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT,
          host: new urlParse(process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT).hostname.toString(),
          path: '/graphql',
          region: process.env.REGION,
          service: 'appsync',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body),
          data: body
        }
        const credentials = {
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          sessionToken: process.env.AWS_SESSION_TOKEN
        }
        const signed = aws4.sign(signOptions, credentials)
        delete signed.headers.Host
        delete signed.headers['Content-Length']

        const response = await axios(signed)

        // ================================================= Official Method

        // const updateStream = `
        // mutation updateStream($input: UpdateStreamInput!) {
        //   updateStream(input: $input) {
        //     id
        //     verified
        //   }
        // }`

        // const updateNote = `
        // mutation updateNote($input: UpdateNoteInput!) {
        //   updateNote(input: $input) {
        //     id
        //     body
        //   }
        // }`

        // let req = new AWS.HttpRequest(process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT, process.env.REGION)
        // req.method = 'POST'
        // req.path = '/graphql'
        // req.headers.host = new urlParse(process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT).hostname.toString()
        // req.headers['Content-Type'] = 'application/json'
        // req.body = JSON.stringify({
        //   query: updateNote,
        //   operationName: 'updateNote',
        //   variables: {
        //     input: {
        //       id: '9434df1e-fe39-45a5-8052-cff71c22173f',
        //       body: 'test mutation'
        //     }
        //   }
        // })

        // let signer = new AWS.Signers.V4(req, 'appsync', true);
        // signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

        // const data = await new Promise((resolve, reject) => {
        //   let httpRequest = https.request({...req, host: req.headers.host}, (result) => {
        //     result.on('data', (data) => {
        //       resolve(JSON.parse(data.toString()));
        //     })
        //   })
        //   httpRequest.write(req.body)
        //   httpRequest.end()
        // })

        // axios method

        // const response = await axios({
        //   method: 'post',
        //   url: process.env.API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT,
        //   data: req.body,
        //   headers: req.headers
        // })

        console.log(response)

        if (response.status === 200) {
          console.log(response.data)
        }
        
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

async function getSecrets() {
  console.log('Getting secrets')
  
  try {
    const data = await docClient.scan({TableName: process.env.API_ADSTR_SECRETTABLE_NAME}).promise()
    
    if (data.Items.length) {
      twitchAccessToken = data.Items.find(secret => {return secret.name === 'twitchAccessToken'})
      twitchClientId = data.Items.find(secret => {return secret.name === 'twitchClientId'})
      cognitoUserPoolClientId = data.Items.find(secret => {return secret.name === 'cognitoUserPoolClientId' })
      cognitoUserPoolId = data.Items.find(secret => {return secret.name === 'cognitoUserPoolId'})
      cognitoAdmin = data.Items.find(secret => {return secret.name === 'cognitoAdmin'})
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

async function getImageBuffer(url) {
  try {
    const response = await axios.get(url, {responseType: 'arraybuffer'})
    const buffer = Buffer.from(response.data, 'binary')
    return buffer
  } catch (error) {
    console.log(error)
  }
}

async function getCredentials(authParams) {
  console.log('Getting Cognito Credentials')

  return new Promise((resolve, reject) => {
    cognitoSP.adminInitiateAuth(authParams, (authErr, authData) => {
      if (authErr) {
        console.log(authErr)
        reject(authErr)
      } else if (authData === null) {
        reject("Auth data is null")
      } else {
        console.log("Auth Successful")
        resolve(authData)
      }
    })
  })
}

module.exports = app