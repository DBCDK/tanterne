const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const noErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();
const extractCss = new extractTextPlugin({filename: '../css/[name].css', allChunks: true});

module.exports = [{
  name: 'browser',
  cache: true,
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-async-to-generator', 'transform-class-properties', 'transform-es2015-modules-commonjs', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: extractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']) /* Checkout postcss.config.js for details */
      }
    ]
  },
  plugins: [
    extractCss,
    noErrorsPlugin
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-enroute': 'preact-enroute'
    }
  }
}];
