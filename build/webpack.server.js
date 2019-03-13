const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  resolve: {
    alias: {
      '~api': path.resolve(__dirname, '../src/api/api-server.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'null-loader'
      }
    ]
  },
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})