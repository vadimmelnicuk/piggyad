/* Amplify Params - DO NOT EDIT
	API_ADSTR_ADVERTJOBTABLE_ARN
	API_ADSTR_ADVERTJOBTABLE_NAME
	API_ADSTR_ADVERTTABLE_ARN
	API_ADSTR_ADVERTTABLE_NAME
	API_ADSTR_GRAPHQLAPIENDPOINTOUTPUT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_GRAPHQLAPIKEYOUTPUT
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const uuidv4 = require('uuid').v4
const axios = require('axios')

exports.handler = async (event) => {
  console.log('Getting the oldest advert')

  const stream = await docClient.query({
    TableName: process.env.API_ADSTR_STREAMTABLE_NAME,
    IndexName: 'getStreamByStatus',
    Limit: 1,
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames:{
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":status": 'ONLINE'
    }
  }).promise()

  console.log(stream)
  
  const advert = await docClient.query({
    TableName: process.env.API_ADSTR_ADVERTTABLE_NAME,
    IndexName: 'getAdvertByStatus',
    ScanIndexForward: true,
    Limit: 1,
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames:{
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":status": 'ACTIVE'
    }
  }).promise()

  console.log(advert)

  const date = new Date()
  const advertJob = await docClient.put({
    TableName: process.env.API_ADSTR_ADVERTJOBTABLE_NAME,
    Item: {
      'id': uuidv4(),
      'streamer': stream.Items[0].owner,
      'advertJobStreamId': stream.Items[0].id,
      'advertJobAdvertId': advert.Items[0].id,
      // 'impressions': stream.Item.twitchStreamData['viewer_count'],
      'impressions': 100,
      'completed': false,
      'createdAt': date.toISOString(),
      'updatedAt': date.toISOString()
    }
  }).promise()

  console.log(advertJob)

  await postQuery({
    query: `mutation ($streamer: String!) {advertJobResolver(streamer: $streamer) {streamer}}`,
    variables: {streamer: stream.Items[0].owner}
  })
  
}

async function postQuery(query) {
  console.log('Posting query: ' + query)

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