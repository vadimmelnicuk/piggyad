import {Auth, API} from 'aws-amplify'
import {v4 as uuidv4} from 'uuid'
import {createStream, updateProfile} from '@/graphql/mutations'

export const stream = {
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {
    async createStream(_, stream) {
      try {
        const response = await API.graphql({query: createStream, variables: { input: {
          username: stream.username,
          platform: stream.platform,
          verified: false,
          online: false,
          urlToken: uuidv4(),
          verificationToken: uuidv4()
        }}})

        const user = await Auth.currentUserInfo()
  
        await API.graphql({query: updateProfile, variables: {input: {
          id: user.attributes.sub,
          profileStreamId: response.data.createStream.id
        }}})

        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  getters: {

  }
}
