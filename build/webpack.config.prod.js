/**
 *
 *  生产环境配置文件
 * @author ivan
 * @date 2016.9.2
 *
 */
var webpack = require('webpack')
var pkg = require('../package.json')
var config = require('../config/')
var baseConfig = require('./webpack.config.base')
var merge = require('webpack-merge')
var helpers = require('./helpers')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

var webpackConfig = {
  // for test-build
  devtool: 'source-map',
  /** 分离第三方模块  **/
  entry: {
    vendor: Object.keys(pkg.dependencies).filter(name => {
      // 不包括的模块
      var excludes = config.env.vendorExcludes
      if (excludes.indexOf(name) !== -1) {
        return false
      }
      return true
    })
  },

  /** 为文件添加hash，对抗缓存  **/
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js'
  },

  /** 样式抽取 **/
  module: {
    // *.vue 外部的css文件
    loaders: helpers.loaderStyles({extract: true})
  },

  vue: {
    loaders: Object.assign({
      // disable eslint
      js: 'babel',
      autoprefixer: {
        browsers: ['iOS >= 7', 'Android >= 4.1']
      }
    }, helpers.vueStyles({extract: true}))
  },

  /**  插件  **/
  plugins: [
    // 进度条
    new ProgressBarPlugin(),

    // 抽取css到文件
    new ExtractTextPlugin('css/style.[contenthash:8].css'),

    // 优化
    // 给常用的模块或chunk指定更短的id，从而减少整体文件大小
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[chunkhash:8].js'
    })
  ]
}

// 生成环境构建的一些额外操作
if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = undefined
  webpackConfig.plugins = webpackConfig.plugins.concat([
    // 压缩js文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = merge(baseConfig, webpackConfig)
