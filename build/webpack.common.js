const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry
  entry: {
    app: './src'
  },

  // loaders
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
    ]
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HN Preact',
      template: './src/index.ejs'
    }),
  ]
};
