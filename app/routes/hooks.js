export default function configRouterHooks (router) {
  router.beforeEach(({to, next}) => {
    // do something
    next()
  })
}
