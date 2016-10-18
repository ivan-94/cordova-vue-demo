var path = require('path')

module.exports = {
  entry:  path.resolve(__dirname,'../app/main.js'),        //入口文件
  // ⚠  disable publicPath. because publicPath will affect html-webpack-plugin inject, and cordova APP inside use file:// protocol
  publicPath: undefined,

  src:    path.resolve(__dirname, '../app'),                // 源代码目录
  dist:   path.resolve(__dirname, '../www'),               // 输出目录
  assets: path.resolve(__dirname, '../app/assets'),         // 资源文件
  static: path.resolve(__dirname, '../static'),             // 一些纯静态的文件

  // 数据代理
  proxy: {
    'development': {
    },

    'test': {
    },
  },

  // exclude packages for vendor. see ../build webpack.config.prod.js
  vendorExcludes: [],
}
