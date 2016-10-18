var webpack = require('webpack')
var config  = require('../config/index')
var path = require('path')

var vendors = [
  'vue',
  'vuex',
  'vue-router',
  'vue-resource',
  'vue-i18n',
  'vue-validator',
  'quill',
  'lodash',
  'query-string',
  'camelize',
  'snakeize'
]

module.exports = {
  output: {
    path: config.env.dist,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'manifest.json'),
      name: '[name]',
      context: __dirname,
    }),
  ],
}
