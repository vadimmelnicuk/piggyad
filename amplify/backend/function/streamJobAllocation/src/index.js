/* Amplify Params - DO NOT EDIT
	API_ADSTR_ADVERTJOBTABLE_ARN
	API_ADSTR_ADVERTJOBTABLE_NAME
	API_ADSTR_ADVERTTABLE_ARN
	API_ADSTR_ADVERTTABLE_NAME
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log('Getting the oldest advert')
  
  const data = await docClient.query({
    TableName: process.env.API_ADSTR_ADVERTTABLE_NAME,
    ProjectionExpression: "#active",
    KeyConditionExpression: "#active = :active",
    ExpressionAttributeNames:{
      "#active": "active"
    },
    ExpressionAttributeValues: {
      ":active": true
    }
  }).promise()
  
  console.log(data)
}

