/**
 *
 *  开发环境配置文件
 *
 */
var webpack = require('webpack')
var path = require('path')
var config = require('../config/index')
var baseConfig = require('./webpack.config.base')
var merge = require('webpack-merge')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard()


var webpackConfig = {
  devtool: 'source-map',
  plugins: [
    // 控制台
    new DashboardPlugin(dashboard.setData),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  // 开发服务器
  devServer: {
    // 使得局域网内可以访问
    host: '0.0.0.0',
    port: 8080,
    contentBase: config.env.dist,
    hot: true,
    // 静默，避免扰乱控制台
    quiet: true,
    // 代理到mockserver
    proxy: config.env.proxy[process.env.NODE_ENV],
  }
}

module.exports = merge(baseConfig, webpackConfig)
