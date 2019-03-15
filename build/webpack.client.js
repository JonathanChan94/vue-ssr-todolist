const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
console.log(`isProd: ${isProd}`);

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '~api': path.resolve(__dirname, '../src/api/api.js')
    }
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {                          // 内部的配置项会覆盖外部的配置项
        vendors: {                            // 打包出来自node_modules的文件，vue等
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,                      // 优先级越高先打包
          chunks: 'initial'
        },
        common: {
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        }
      }
    },
    runtimeChunk: {                           // 将webpack运行依赖打包成单独的runtime文件
      name: "runtime"
    }
  },
  plugins: isProd ? [
    new VueSSRClientPlugin(),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    })
  ] : [
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"'
    })
  ]
})
