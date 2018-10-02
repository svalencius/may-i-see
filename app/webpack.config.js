const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const devMode = env !== 'production'

const publicPath = devMode ? 'http://127.0.0.1:8080/dist/' : ''

const appHtmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.hbs',
  filename: 'index.js',
  inject: false
})
const cssPlugin = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
})
const postCssOptions = {
  plugins: () => [
    autoprefixer,
    cssnano({
      zindex: false,
      reduceIdents: false,
      preset: ['default', {
        discardComments : {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        safe: true,
        sourcemap: true
      }]
    })
  ]
}

const config = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude : /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.s?[ac]ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'postcss-loader', options: postCssOptions },
        'sass-loader'
      ]
    }, {
      test: /\.ttf(\?.*)?$/,
      use: {
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      }
    }, {
      test: /\.eot(\?.*)?$/,
      use: {
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
      }
    }, {
      test: /\.woff(\?.*)?$/,
      use: {
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      }
    }, {
      test: /\.woff2(\?.*)?$/,
      use: {
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      }
    }, {
      test: /\.(png|jpg|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    }, {
      test: /\.(wav|mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'audio/'
        }
      }
    }, {
      test: /\.hbs$/,
      use: {
        loader: 'handlebars-loader'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    cssPlugin,
    appHtmlPlugin,
    new webpack.DefinePlugin({
      'process.env'  : {
        'NODE_ENV' : JSON.stringify(env)
      },
      'NODE_ENV'     : env,
      '__DEV__'      : env === 'development',
      '__PROD__'     : env === 'production',
      '__TEST__'     : env === 'test'
    }),
    new CopyWebpackPlugin([
      { context: 'src/static/', from: '**/*' }
    ])
  ]
}

module.exports = config
