import { API, Storage } from 'aws-amplify'
import { createAdvert } from '@/graphql/mutations'
import { v4 as uuidv4 } from 'uuid'

export const advert = {
  namespaced: true,
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    async createAdvert(_, advert) {
      if (!advert.asset) return

      const extension = advert.asset.name.substr(advert.asset.name.lastIndexOf('.') + 1)
      const type = advert.asset.type
      const id = uuidv4()
      const key = 'adverts/' + id + '.' + extension

      console.log(type)
      console.log(key)

      try {
        const object = await Storage.put(key, advert.asset, {
          level: 'protected',
          contentType: type,
          metadata: {
            id: id
          }
        })

        console.log(object)

        const response = await API.graphql({ query: createAdvert, variables: { input: {
          title: advert.title,
          type: type,
          asset: {
            key: key
          }
        }}})

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {

  }
}
