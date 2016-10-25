import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import test from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在这里注册所有mutations模块
  modules: {
    test
  },

  // 开发模式下，开启严格模式，确保state不会在mution之外被改变
  strict: process.env.NODE_ENV !== 'production'
})
