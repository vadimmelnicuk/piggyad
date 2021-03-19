import {Storage} from 'aws-amplify'

export default {
  methods: {
    async getAssetUrl(key, identity) {
      try {
        const url = await Storage.get(key, {
          level: 'protected',
          identityId: identity
        })

        return url
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
}