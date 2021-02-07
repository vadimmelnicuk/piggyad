/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_PROFILETABLE_ARN
	API_ADSTR_PROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
  if (event.request.userAttributes.sub) {
    let date = new Date()
    let params = {
      Item: {
          'id': {S: event.request.userAttributes.sub},
          '__typename': {S: 'Profile'},
          'owner': {S: event.userName},
          'createdAt': {S: date.toISOString()},
          'updatedAt': {S: date.toISOString()}
      },
      TableName: process.env.API_ADSTR_PROFILETABLE_NAME
    }

    // Call DynamoDB
    try {
      await ddb.putItem(params).promise()
      console.log("Success")
    } catch (err) {
        console.log("Error", err)
    }

    console.log("Success: Everything executed correctly")
    context.done(null, event)
  } else {
    console.log("Error: Nothing was written to DynamoDB")
    context.done(null, event)
  }
}
