import {API, Storage} from 'aws-amplify'
import {createAdvert, deleteAdvert, updateAdvert} from '@/graphql/mutations'
import {v4 as uuidv4} from 'uuid'

export const advert = {
  namespaced: true,
  state: {
    cpm: 0.05, // £
    impressionsMin: 5000,
    impressionsMax: 100000,
    assetMaxSize: 10 // Mb
  },
  mutations: {
    
  },
  actions: {
    async createAdvert({state, rootState}, advert) {
      console.log('Creating advert')

      if (!advert.title) {
        console.log('Title is missing')
        return
      }

      if (!advert.asset) {
        console.log('File is missing')
        return
      }
      
      let fileSize = Math.round(advert.asset.size / 1024)

      if (fileSize > state.assetMaxSize * 1024) {
        console.log('File is over 10Mb')
        return
      }

      const extension = advert.asset.name.substr(advert.asset.name.lastIndexOf('.') + 1)
      const type = advert.asset.type
      const id = uuidv4()
      const key = 'adverts/' + id + '.' + extension
      const date = new Date()

      // console.log(type)
      // console.log(key)

      try {
        await Storage.put(key, advert.asset, {
          level: 'protected',
          contentType: type,
          metadata: {
            id: id
          }
        })

        await API.graphql({query: createAdvert, variables: {input: {
          title: advert.title,
          type: advert.type,
          asset: {
            key: key,
            identity: rootState.auth.user.id
          },
          status: 'INACTIVE',
          impressions: 5000,
          lastImpression: date.toISOString()
        }}})
      } catch (error) {
        console.log(error)
        await Storage.remove(key, {level: 'protected' })
      }
    },
    async deleteAdvert(_, id) {
      if (!id) return
      console.log('Deleting advert')

      try {
        const response = await API.graphql({query: deleteAdvert, variables: { input: {
          id: id
        }}})

        if (response.data.deleteAdvert.asset) {
          await Storage.remove(response.data.deleteAdvert.asset.key, {level: 'protected' });
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updateAdvert(_, advert) {
      console.log(advert)
      
      try {
        const response = await API.graphql({query: updateAdvert, variables: { input: {
          id: advert.id,
          status: advert.status,
          impressions: advert.impressions
        }}})

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    cpm(state) {
      return state.cpm
    },
    impressionsMin(state) {
      return state.impressionsMin
    },
    impressionsMax(state) {
      return state.impressionsMax
    }
  }
}
