import Vue from 'vue'
Vue.config.productionTip = false

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import './main.css'
import './components'
import './layouts'

import App from './App'
import router from './router'
import {i18n, detect as detectLocale, load as loadLocaleMessage} from './i18n'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: {
    App
  }
})

loadLocaleMessage(detectLocale())
