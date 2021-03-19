export const toast = {
  namespaced: true,
  state: {
    duration: 3000,
    toasts: []
  },
  mutations: {
    add(state, payload) {
      state.toasts.push(payload)

      setTimeout(() => {
        state.toasts.shift()
      }, state.duration)
    }
  },
  actions: {

  },
  getters: {
    get(state) {
      return state.toasts
    }
  }
}