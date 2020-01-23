const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: path.resolve(__dirname, './test/browser/test.js'),

  output: {
    path: path.resolve(__dirname, './test/browser/build'),
    filename: 'test-browser.api.min.js',
  },

  mode: 'production',

  target: 'web',

  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/^fs$/),
    new webpack.IgnorePlugin(/akomando$/),
  ],
};
