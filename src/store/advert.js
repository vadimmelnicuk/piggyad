import {API, Storage} from 'aws-amplify'
import {createAdvert, deleteAdvert, updateAdvert} from '@/graphql/mutations'
import {v4 as uuidv4} from 'uuid'

export const advert = {
  namespaced: true,
  state: {
    cpm: 0.35, // $ per 1000 views
    impressionsMin: 3000,
    impressionsMax: 300000,
    durationMin: 1,
    durationMax: 30,
    assetMaxSize: 12 // Mb
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
          status: 'DRAFT',
          impressionsPerDay: state.impressionsMin,
          lastImpression: date.toISOString(),
          duration: state.durationMin,
          languages: JSON.stringify([]),
          categories: JSON.stringify([])
        }}})

        return true
      } catch (error) {
        console.log(error)
        await Storage.remove(key, {level: 'protected'})
        return false
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
      try {
        const response = await API.graphql({query: updateAdvert, variables: { input: {
          id: advert.id,
          status: advert.status,
          impressionsPerDay: advert.impressionsPerDay,
          duration: advert.duration,
          languages: advert.languages,
          categories: advert.categories
        }}})
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
    },
    durationMin(state) {
      return state.durationMin
    },
    durationMax(state) {
      return state.durationMax
    }
  }
}
