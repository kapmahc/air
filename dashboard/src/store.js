import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
import vuexI18n from 'vuex-i18n'

import jwtDecode from 'jwt-decode'

const store = new Vuex.Store({
  state: {
    title: null,
    currentUser: null
  },
  mutations: {
    refresh (state, title) {
      state.title = title
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

Vue.use(vuexI18n.plugin, store)

export default store
