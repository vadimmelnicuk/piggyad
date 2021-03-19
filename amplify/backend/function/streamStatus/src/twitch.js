var axios = require('axios')

exports.getTwitchAccessToken = async (twitchClientId, twitchClientSecret) => {
  console.log("Getting Twitch access token")

  try {
    const response = await axios({
      method: "POST",
      url: "https://id.twitch.tv/oauth2/token?client_id=" + twitchClientId.key + "&client_secret=" + twitchClientSecret.key + "&grant_type=client_credentials"
    })
    
    return response
  } catch (error) {
    return error
  }
}

exports.validateTwitchAccessToken = async (twitchClientId, twitchAccessToken) => {
  console.log("Validating Twitch access token")

  try {
    const response = await axios({
      method: "GET",
      url: "https://id.twitch.tv/oauth2/validate",
      headers: {
        "client-id": twitchClientId.key,
        "Authorization": "Bearer " + twitchAccessToken.key
      }
    })

    console.log("Twitch access token is valid")
    return true
  } catch (error) {
    return false
  }
}

exports.getTwitchStreamersData = async (twitchClientId, twitchAccessToken, streams) => {
  console.log("Getting Twitch streamers data")

  let userLogins = ''

  for (const [index, stream] of streams.entries()) {
    if (index) {
      userLogins = userLogins + '&user_login=' + stream.username
    } else {
      userLogins = 'user_login=' + stream.username
    }
  }

  try {
    const response = await axios({
      method: "GET",
      url: "https://api.twitch.tv/helix/streams?" + userLogins,
      headers: {
        "client-id": twitchClientId.key,
        "Authorization": "Bearer " + twitchAccessToken.key
      }
    })

    return response
  } catch (error) {
    return error
  }
}

exports.getTwitchStreamerData = async (twitchClientId, twitchAccessToken, stream) => {
  console.log("Getting Twitch streamer data")

  let userLogin = 'user_login=' + stream.Item.username

  try {
    const response = await axios({
      method: "GET",
      url: "https://api.twitch.tv/helix/streams?" + userLogin,
      headers: {
        "client-id": twitchClientId.key,
        "Authorization": "Bearer " + twitchAccessToken.key
      }
    })

    return response
  } catch (error) {
    return error
  }
}
