const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  // entry
  entry: {
    app: './src',
  },

  // output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkHash:8].js',
    publicPath: '/'
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
          ]
        })
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  },

  // dev-server
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3001,
    stats: "errors-only",
    open: true,
    openPage: '',
    historyApiFallback: {
      index: '/'
    },
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HN Preact',
      template: './src/index.ejs'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({resource}) => (
        resource &&
        /\.js$/.test(resource) &&
        resource.indexOf(path.join(__dirname, 'node_modules')) >= 0
      ),
    }),

    new ExtractTextWebpackPlugin('app.[chunkHash:8].css')
  ]
}
