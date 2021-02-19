import { Auth } from 'aws-amplify'

export const auth = {
  namespaced: true,
  state: {
    user: null,
    groups: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setGroups(state, payload) {
      state.groups = payload
    }
  },
  actions: {
    async login({dispatch}, {username, password}) {
      try {
        await Auth.signIn(username, password)
        dispatch('loginCheck')
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async loginCheck({commit}) {
      try {
        const user = await Auth.currentUserInfo()
        commit('setUser', user)
        
        const session = await Auth.currentSession()

        if (session.accessToken.payload['cognito:groups']) {
          commit('setGroups', session.accessToken.payload['cognito:groups'])
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout({commit}) {
      commit('setUser', null)
      try {
        await Auth.signOut()
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async signup(_, {username, password, email}) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
        })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async signupConfirm(_, {username, code}) {
      try {
        await Auth.confirmSignUp(username, code)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    groups(state) {
      return state.groups
    }
  }
}