const { loadEnv } = require('./utils')
loadEnv('development')

const { merge } = require('webpack-merge')
const base = require('./base')
const style = require('./style')
const { resolve } = require('path')

const filename = 'js/[name].bundle.js'
const chunkFilename = 'js/[name].chunk.js'

module.exports = merge(base, style, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  entry: resolve(process.cwd(), 'src/main-dev.ts'),

  output: {
    filename,
    chunkFilename,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
        include: resolve(process.cwd(), 'src/icon'),
      },
    ],
  },

  optimization: {
    minimize: false,
    concatenateModules: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: false,
  },

  performance: {
    hints: 'warning',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true,
      },
    },
  },
})
