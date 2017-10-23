const path = require('path');
const webpack = require('webpack');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const LoadMinifed = require('./load-minified');

const ProdConfig = {
  // source-maps
  devtool: 'source-map',

  // stats
  stats: {
    modules: false,
    children: false
  },

  // output
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkHash:8].js',
    publicPath: '/',
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ]
        })
      }
    ]
  },

  // plugins
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'HN Preact',
      template: './src/index.ejs',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${LoadMinifed(path.join(__dirname,
        './sw-prod.js'))}</script>`
    }),
    new ExtractTextWebpackPlugin('app.[chunkHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({resource}) => (
        resource &&
        /\.js$/.test(resource) &&
        resource.indexOf('node_modules') >= 0
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
      filename: '[name].[hash:8].js'
    }),
    new workboxPlugin({
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,css}'],
      swDest: path.join('dist', 'sw.js'),
      navigateFallback: '/index.html'
    })
  ]
};

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  ProdConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = Merge(CommonConfig, ProdConfig);
