const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './test/cli/test.js'),

  output: {
    path: path.resolve(__dirname, './test/cli/build'),
    filename: 'test-cli.api.min.js',
    library: 'ipfsFrbr-test-cli',
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
