const webpack = require('webpack')
const postcssNested = require('postcss-nested')
const postcssInlineSvg = require('postcss-inline-svg')

module.exports = {
  context: __dirname + '/src',

  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/dist/'
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          "presets": ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.json/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style?' + JSON.stringify({
            sourceMap: true
          }),
          'css?' + JSON.stringify({
            modules: true,
            importLoaders: 1,
            localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
          }),
          'postcss'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url',
        query: {
          "noquotes": true
        }
      }
    ]
  },

  target: 'electron-renderer',

  postcss: () => [
    postcssNested,
    postcssInlineSvg({
      path: './src'
    })
  ]
}
