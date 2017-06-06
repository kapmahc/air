import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import plugins from './plugins'

export default new Router({
  routes: plugins.routes
})
