import {Auth, API} from 'aws-amplify'
import {v4 as uuidv4} from 'uuid'
import {getProfile} from '@/graphql/queries'
import {createStream, updateProfile} from '@/graphql/mutations'

export const stream = {
  namespaced: true,
  state: {
    payout: 0.1, // per 10 views
    platforms: ['Twitch', 'Youtube'],
    twitchLanguages: [
      {short: 'all', full: 'All languages'},
      {short: 'en', full: 'English'},
      {short: 'es', full: 'Spanish'},
      {short: 'zh', full: 'Chinese'},
      {short: 'ko', full: 'Korean'},
      {short: 'ru', full: 'Russian'}
    ],
    twitchTags: [
      {id: '4d1eaa36-f750-4862-b7e9-d0a13970d535', title: 'All categories', description: 'Target all stream categories'},
      {id: '4d1eaa36-f750-4862-b7e9-d0a13970d535', title: 'Action', description: 'For games that feature elements consistent with the Action genre'},
      {id: '67259b26-ff83-444e-9d3c-faab390df16f', title: 'AMA', description: 'For streams with an emphasis on the answering of viewer questions. Abbreviation for "Ask Me Anything."'},
      {id: '7ff66192-68ef-4b69-8906-24736bf66ed0', title: 'Arcade', description: 'For games that feature elements consistent with the Arcade genre'}
    ]
  },
  mutations: {

  },
  actions: {
    async createStream(_, stream) {
      try {
        if (!stream.username) {
          return Promise.reject({error: 'Username is empty'})
        }

        const user = await Auth.currentUserInfo()
        const profile = await API.graphql({query: getProfile, variables: {
          id: user.attributes.sub
        }})

        if (profile.data.getProfile && profile.data.getProfile.stream === null) {
          // Replace verification token zeros
          const char = String.fromCharCode(97+Math.floor(Math.random()*26))
          let verificationToken = uuidv4()
          verificationToken = verificationToken.replaceAll('0', char)

          const response = await API.graphql({query: createStream, variables: { input: {
            username: stream.username,
            platform: stream.platform.toLowerCase(),
            status: 'UNVERIFIED',
            urlToken: uuidv4(),
            verificationToken: verificationToken
          }}})
    
          await API.graphql({query: updateProfile, variables: {input: {
            id: user.attributes.sub,
            profileStreamId: response.data.createStream.id
          }}})
        } else {
          return Promise.reject({error: 'Stream already exists.'})
        }

        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  getters: {
    payout(state) {
      return state.payout
    },
    platforms(state) {
      return state.platforms
    },
    twitchLanguages(state) {
      return state.twitchLanguages
    },
    twitchTags(state) {
      return state.twitchTags
    }
  }
}
