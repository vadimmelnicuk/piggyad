/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_PROFILETABLE_ARN
	API_ADSTR_PROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk')
var docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  if (event.request.userAttributes.sub) {
    try {
      await docClient.put({
        TableName: process.env.API_ADSTR_PROFILETABLE_NAME,
        Item: {
          'id': event.request.userAttributes.sub,
          'owner': event.userName
        }
      }).promise()

      console.log("Success")
    } catch (err) {
      console.log("Error", err)
    }

    console.log("Success: Everything executed correctly")
  } else {
    console.log("Error: Nothing was written to DynamoDB")
  }

  context.done(null, event)
}
