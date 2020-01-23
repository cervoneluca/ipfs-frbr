const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './test/node/test.js'),

  output: {
    path: path.resolve(__dirname, './test/node/build'),
    filename: 'test-node.api.min.js',
    library: 'ipfsFrbr-test-node',
    libraryTarget: 'umd',
  },

  mode: 'production',

  target: 'node',

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
};
