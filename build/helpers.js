/**
* fork from vuejs-template/webpack
* 一些重复的样式生成相关的配置
*/
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.vueStyles = function (options) {
  options = options || {}

  function generateLoader (loaders) {
    var original = loaders.map(function (loader) {
      var extraParamChar
      // 包含参数
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      // 添加sourceMap
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // 抽取css为文件
    if (options.extract) {
      // vue-style-loader 为回退loader
      return ExtractTextPlugin.extract('vue-style-loader', original)
    } else {
      return ['vue-style-loader', original].join('!')
    }
  }

  return {
    css: generateLoader(['css']),
    sass: generateLoader(['css', 'sass?indentedSyntax']),
    scss: generateLoader(['css', 'sass'])
  }
}

// Generate loaders for standalone style files (outside of *.vue)
exports.loaderStyles = function (options) {
  var output = []
  var loaders = exports.vueStyles(options)
  for (var ext in loaders) {
    var loader = loaders[ext]
    output.push({
      test: new RegExp('\\.' + ext + '$'),
      loader: loader
    })
  }
  return output
}

exports.generateCSPString = function (csp) {
  if (csp) {
    var str = ''
    for (var key in csp) {
      str += key + ' ' + csp[key] + '; '
    }

    if (str !== '') {
      return str
    }
  }
}
