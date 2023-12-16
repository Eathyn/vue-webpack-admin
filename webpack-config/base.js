const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const threadLoader = require('thread-loader')

const isProd = process.env.NODE_ENV === 'production'
const filename = isProd
  ? 'js/[name].[contenthash:8].bundle.js'
  : 'js/[name].bundle.js'
const chunkFilename = isProd
  ? 'js/[name].[contenthash:8].chunk.js'
  : 'js/[name].chunk.js'
threadLoader.warmup({}, ['babel-loader'])

module.exports = {
  context: process.cwd(),

  entry: resolve(process.cwd(), 'src/main.ts'),

  output: {
    path: resolve(process.cwd(), 'dist'),
    filename,
    chunkFilename,
    clean: true,
  },

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
    mainFields: ['jsnext:main', 'browser', 'main'],
  },

  watchOptions: {
    ignored: /node_modules/,
  },

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    profile: true,
  },

  module: {
    noParse: /^(vue|vue-router|pinia|element-plus)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset',
        generator: {
          filename: 'font/[name].[hash:8][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(process.cwd(), 'public/index.html'),
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: 'false',
      __VUE_PROD_DEVTOOLS__: 'false',
      'process.env': JSON.stringify(process.env),
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new CaseSensitivePathsPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: resolve('public'),
          toType: 'dir',
          globOptions: {
            ignore: ['.DS_Store', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        extensions: {
          vue: {
            enabled: true,
            compiler: '@vue/compiler-sfc',
          },
        },
      },
    }),
  ],
}
