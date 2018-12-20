const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const noErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();
const extractCss = new MiniCssExtractPlugin({
  filename: '../css/[name].css',
  allChunks: true
});

module.exports = [
  {
    name: 'browser',
    cache: true,
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
      path: path.join(__dirname, 'public/js'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: 'inline'}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }
      ]
    },
    plugins: [extractCss, noErrorsPlugin],
    devtool: 'source-map#inline',
    resolve: {
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'react-enroute': 'preact-enroute'
      }
    }
  }
];
