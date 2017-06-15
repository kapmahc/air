import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'

import plugins from './plugins'

Vue.use(iView)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: plugins.routes
})

export default router
