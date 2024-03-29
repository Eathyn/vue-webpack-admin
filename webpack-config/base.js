const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const threadLoader = require('thread-loader')

const plugins = [
  new HtmlWebpackPlugin({
    template: resolve(process.cwd(), 'public/index.html'),
  }),
  new VueLoaderPlugin(),
  new DefinePlugin({
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
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
]

if (process.env.ANALYSE_BUNDLE === 'true') {
  const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  plugins.push(new BundleAnalyzerPlugin())
}

threadLoader.warmup({}, ['babel-loader'])

module.exports = {
  context: process.cwd(),

  output: {
    path: resolve(process.cwd(), 'dist'),
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
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/,
        type: 'asset',
        exclude: resolve(process.cwd(), 'src/icon'),
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
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

  plugins,

  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true,
      },
    },
    client: {
      logging: 'error',
    },
  },
}
