import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
import vuexI18n from 'vuex-i18n'

import jwtDecode from 'jwt-decode'

const store = new Vuex.Store({
  state: {
    siteInfo: null,
    currentUser: null
  },
  mutations: {
    refresh (state, payload) {
      state.siteInfo = payload.info
    },
    signIn (state, payload) {
      try {
        state.currentUser = jwtDecode(payload.token)
      } catch (e) {
        console.error()
      }
    },
    signOut (state) {
      state.currentUser = null
    }
  },
  actions: {
    signIn ({commit}, token) {
      commit({type: 'signIn', token})
    }
  }
})

Vue.use(vuexI18n.plugin, store)

export default store
