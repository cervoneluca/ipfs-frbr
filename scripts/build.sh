#!/usr/bin/env bash
rm -fr ./dist
mkdir ./dist
webpack  --config webpack.config.build.js
