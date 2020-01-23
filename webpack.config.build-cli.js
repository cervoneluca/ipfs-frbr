const webpack = require('webpack');
const path = require('path');
const packConfigs = require('./package.json');
const createCliConf = require('./webpack.config.build-cli.before.js');

const libraryName = Object.keys(packConfigs.bin)[0];

const config = {
  entry: path.resolve(__dirname, './src/cli/ipfsFrbr.cli.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ipfsFrbr.cli.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  mode: 'production',

  target: 'async-node',

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
        include: path.resolve(__dirname, 'src'),
        use: [
          'shebang-loader',
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new webpack.DefinePlugin({
      CONFIGS_CLI: JSON.stringify(createCliConf()),
    }),
  ],
};

module.exports = config;
