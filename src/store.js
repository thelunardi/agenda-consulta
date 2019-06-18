import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    state: {
        user: {},
        authenticated: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            state.authenticated = true
        },
        removeUser(state) {
            state.user = {}
            state.authenticated = false
        }
    },
    actions: {
        set(state, user) {
            store.commit('setUser', user)
        },
        remove() {
            store.commit('removeUser')
        }
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        }
    }
}

export const store = new Vuex.Store({
    modules: {
        auth: moduleA
    }
})

