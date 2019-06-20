import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    authenticated: false
  },
  mutations: {
    setUserAuthenticate (state, user) {
      state.user = user
      state.authenticated = true
    },
    removeUserAuthenticate (state) {
      state.user = {}
      state.authenticated = false
    }
  },
  actions: {
    setUser (state, user) {
      store.commit('setUserAuthenticate', user)
    },
    removeUser () {
      store.commit('removeUserAuthenticate')
    }
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    }
  }
})
