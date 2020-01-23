const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/api/ipfs-frbr.api.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ipfsFrbr.api.min.js',
    library: 'ipfsFrbr',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
