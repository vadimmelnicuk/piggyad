/* Amplify Params - DO NOT EDIT
	API_ADSTR_GRAPHQLAPIIDOUTPUT
	API_ADSTR_STREAMTABLE_ARN
	API_ADSTR_STREAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const sm = new aws.SecretsManager({ region: process.env.REGION })
const axios = require('axios')


exports.handler = async (event, context) => {
  const secrets = await getSecrets("dev_adstr_keys")

  console.log(secrets)

  // if (!twitchAccessToken) {
  //   const twitchAccessTokenResponse = await getTwitchAccessToken()
    
  //   if (twitchAccessTokenResponse.status == 200) {
  //     console.log(twitchAccessTokenResponse)
  //   }
  // } else {
  //   let twitchAccessTokenValid = await validateTwitchAccessToken()

  //   if (twitchAccessTokenValid) {
  //     const twitchStreamerDataResponse = await getTwitchStreamerData()

  //     if (twitchStreamerDataResponse.status == 200) {
  //       console.log(twitchStreamerDataResponse.data)
  //     }
  //   } else {
  //     const renewTwitchAccessTokenResponse = await renewTwitchAccessToken()
  //   }
  // }

  context.done(null, event)
}

const getSecrets = async (secretId) => {
  return await new Promise((resolve, reject) => {
    sm.getSecretValue({ SecretId: secretId }, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(result.SecretString))
      }
    })
  })
}

const updateSecrets = async (secretId) => {
  
}

const validateTwitchAccessToken = async () => {
  console.log("Validating Twitch access token")

  try {
    const response = await axios({
      method: "GET",
      url: "https://id.twitch.tv/oauth2/validate",
      headers: {
        "Authorization": "Bearer " + twitchAccessToken
      }
    })

    console.log("Twitch access token is valid")
    return true
  } catch (error) {
    return false
  }
}

const getTwitchStreamerData = async () => {
  console.log("Getting Twitch streamer data")

  try {
    const response = await axios({
      method: "GET",
      url: "https://api.twitch.tv/helix/streams?user_login=vadimcchi",
      headers: {
        "client-id": process.env.API_TWITCH_CLIENTID,
        "Authorization": "Bearer " + twitchAccessToken
      }
    })

    return response
  } catch (error) {
    return error
  }
}

const getTwitchAccessToken = async () => {
  console.log("Getting Twitch access token")

  try {
    const response = await axios({
      method: "POST",
      url: "https://id.twitch.tv/oauth2/token?client_id=" + process.env.API_TWITCH_CLIENTID + "&client_secret=" + process.env.API_TWITCH_CLIENTSECRET + "&grant_type=client_credentials"
    })

    twitchAccessToken = response.data.access_token
    return response
  } catch (error) {
    return error
  }
}

const renewTwitchAccessToken = async () => {
  console.log("Renewing Twitch access token")
}