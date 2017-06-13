// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

import './main.css'
import App from './App'
import plugins from './plugins'
import store from './store'
import {TOKEN} from './constants'

Vue.http.defaults.baseURL = process.env.API_HOST
Vue.http.defaults.headers.common['Authorization'] = `BEARER ${window.sessionStorage.getItem(TOKEN)}`

console.log(Vue.http.get('/site/info'))

const router = new VueRouter({
  routes: plugins.routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
