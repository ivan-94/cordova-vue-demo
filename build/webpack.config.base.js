/**
* webpack 基础配置文件
* @author ivan
* @date 2016.9.2
*/
var webpack = require('webpack')
var path    = require('path')
var config  = require('../config/index')
var pkg     = require('../package.json')
var svgoConfig = require('../config/svgo.config.json')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')
var helpers = require('./helpers')
var exec = require('child_process').execSync


// 清空
exec('rm -rf ' + path.join(config.env.dist, '*'))
try {
  // 复制
  exec('cp -r ' + path.join(config.env.static, '*') + ' ' + config.env.dist)
} catch (ignore) {}

module.exports = {
  entry: {
    app: ['babel-polyfill', config.env.entry],
  },

  output: {
    path: config.env.dist,
    filename: "[name].js",
    publicPath: config.env.publicPath,
  },

  /** 模块查找 **/
  resolve: {
    // 限制只在当前项目下进行模块查找，另外可以避免引用到非本项目的依赖
    fallback: [path.join(__dirname, '../node_modules')],
    extensions: ['','.js','.vue'],
    //设置别名，这样就可以使用简短的require, 比如require('src/main.js')
    alias: {
      'src':        config.env.src,                                    //源码根目录，
      'assets':     path.join(config.env.src, '/assets'),              //静态资源目录
      'components': path.join(config.env.src, '/components'),          //组件目录
      'helpers':    path.join(config.env.src, '/helpers'),             //实用程序
      'views':      path.join(config.env.src, '/views'),               //页面组件
      'mixins':     path.join(config.env.src, '/views/_mixins'),       //全局的可复用的组件mixins
      'resources':  path.join(config.env.src, '/server/resources'),   //后台资源对象目录
      'services':   path.join(config.env.src, '/server/services'),    //后台服务目录
      'actions':    path.join(config.env.src, '/vuex/actions'),       //vuex 的actions， 相当于控制器的角色
    }
  },

  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')],
  },

  /** 环境模拟 **/
  node: {
    __filename: true,
    __dirname: true,
  },

  /** 模块加载器 **/
  module: {
    loaders: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue'
      },

      // images
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,                //小于10kb 转换为base64 data url
          name: 'images/[name].[hash:8].[ext]'  //文件名模板
        },
        exclude: /assets\/icons/,
      },

      //fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },

      //svg icon
      {
        test: /\.svg$/,
        loaders: [
          'svg-sprite',
          'svgo?' + JSON.stringify(svgoConfig)
        ],
        include: /assets\/icons/,
      },

      // js
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      },

      //jade
      {
        test: /\.jade$/,
        loader: 'jade',
        include: /assets/
      },

      //json
      {
        test: /\.json$/,
        loader: 'json',
      },
    ].concat(helpers.loaderStyles()),
  },

  /**  插件  **/
  plugins: [
    //生成入口文件html
    new HtmlWebpackPlugin(
      {
        title: pkg.name,
        filename: 'index.html',
        template: path.join(config.env.assets,'index.jade'),
        inject: true,
        //favicon: ''
      }
    ),

    new webpack.DefinePlugin({
      //定义环境变量
      'process.env': process.env.NODE_ENV === 'production'
        ? require('../config/env.prod.js')
        : process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test-build'
        ? require('../config/env.test.js')
        : require('../config/env.dev.js')
    }),

    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./manifest.json'),
    // }),

  ],
  
  // vue 配置
  vue: {
    loaders: Object.assign({
      autoprefixer: {
        browsers: ['not ie <= 8','last 2 versions']
      },
    }, helpers.vueStyles())
  },

  // sass loader 配置
  sassLoader: {
    includePaths: [
      path.dirname(require.resolve('sassbean')),    //sass-helpers
      path.join(config.env.assets, 'sass')
    ]
  }
}
