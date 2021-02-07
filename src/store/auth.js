import { Auth } from 'aws-amplify'

export const auth = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async login({dispatch}, {username, password}) {
      try {
        await Auth.signIn(username, password)
        dispatch("loginCheck")
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async loginCheck({commit}) {
      try {
        const user = await Auth.currentUserInfo()
        commit("setUser", user)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout({commit}) {
      commit("setUser", null)
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
    }
  }
}