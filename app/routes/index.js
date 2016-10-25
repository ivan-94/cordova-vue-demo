import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouterMap from './routes'
import configRouterHooks from './hooks'

Vue.use(VueRouter)

let router = new VueRouter({
  hashbang: true,
  linkActiveClass: 'active'
})

// register route maps
configRouterMap(router)
configRouterHooks(router)

export default router
