import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import jwtDecode from 'jwt-decode'

const store = new Vuex.Store({
  state: {
    currentUser: null,
    siteInfo: {
      links: [],
      cards: [],
      languages: []
    }
  },
  mutations: {
    refresh (state, info) {
      state.siteInfo = info
    },
    signIn (state, token) {
      try {
        state.currentUser = jwtDecode(token)
      } catch (e) {
        console.error()
      }
    },
    signOut (state) {
      state.currentUser = null
    }
  }
})

export default store
