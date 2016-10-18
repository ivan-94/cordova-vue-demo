import Vue from 'vue'

/* 开发工具 */
if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true
  Vue.config.devtools = true
} else {
  Vue.config.debug = false
  Vue.config.devtools = false
}

/* 后端资源对象初始化 */
// import configResource from 'src/server'
// configResource()

/* 全局UI组件 */
// import registerComponents from './components'
// // register global components
// registerComponents()

/* 国际化支持 */
// import configI18n from  'assets/i18n.js'
// configI18n()

/* 全局mixin */
// import configMixin from 'views/_mixins'
// configMixin()

/* 全局filter */
// import configFilters from 'helpers/filters'
// configFilters()

/* 启动路由, 在所有插件都配置完毕后 */
import router from './routes'
import App from './app'

const app = {
  initialize () {
    this.bindEvents()
  },

  bindEvents () {
    if (typeof cordova != 'undefined') {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    } else {
      this.onDeviceReady()
    }
  },

  onDeviceReady () {
    router.start(App, '#app')
  },
}

app.initialize()