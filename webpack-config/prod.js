const { loadEnv } = require('./utils')
loadEnv('production')

const { merge } = require('webpack-merge')
const base = require('./base')
const style = require('./style')
// const CompressionPlugin = require('compression-webpack-plugin')
// const zlib = require('zlib')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

// const compressFileExt = /\.(js|css|html|svg)$/

module.exports = merge(base, style, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    // new CompressionPlugin({
    //   filename: '[path][base].gz',
    //   algorithm: 'gzip',
    //   test: compressFileExt,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new CompressionPlugin({
    //   filename: '[path][base].br',
    //   algorithm: 'brotliCompress',
    //   test: compressFileExt,
    //   compressionOptions: {
    //     params: {
    //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //     },
    //   },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false,
    // }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
      threads: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        elementPlus: {
          name: 'chunk-element-plus',
          test(module) {
            return (
              module.resource &&
              (module.resource.includes(`${path.sep}element-plus`) ||
                module.resource.includes(`${path.sep}@element-plus`))
            )
          },
          priority: 10,
        },
        baseLib: {
          name: 'chunk-base-lib',
          test(module) {
            const path = require('path')
            return (
              module.resource &&
              (module.resource.includes(`${path.sep}@vue`) ||
                module.resource.includes(`${path.sep}vue-loader`) ||
                module.resource.includes(`${path.sep}vue-style-loader`) ||
                module.resource.includes(`${path.sep}vue-template-compiler`) ||
                module.resource.includes(`${path.sep}vue-router`) ||
                module.resource.includes(`${path.sep}pinia`) ||
                module.resource.includes(`${path.sep}axios`) ||
                module.resource.includes(`${path.sep}lodash-es`) ||
                module.resource.includes(`${path.sep}core-js-pure`) ||
                module.resource.includes(`${path.sep}core-js-compact`) ||
                module.resource.includes(`${path.sep}escape-html`))
            )
          },
          priority: -10,
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          sourceMap: true,
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true,
          },
        },
      }),
    ],
  },
  performance: {
    hints: 'error',
  },
})
