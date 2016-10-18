import Vue from 'vue'

const routeMap = {
  '/': {
    name: 'index',
    component: (resolve) => {
      require(['views/index'], resolve)
    },
  },
}

const redirectMap = {
}

/**
* config Routers
*/
export default function configRouterMap(router) {
  router.map(routeMap)
  router.redirect(redirectMap)
}