// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App'
import { i18n, detect as detectLocale, load as loadLocaleMessage } from './i18n'

import './main.css'
// import './layouts'
// import './components'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(App)
})

loadLocaleMessage(detectLocale())
