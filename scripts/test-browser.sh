#!/usr/bin/env bash
npm run build
rm -fr ./test/browser/build
mkdir ./test/browser/build
webpack  --config webpack.config.test-browser.js
open -a 'safari' 'http://127.0.0.1:8080/test/browser/test.html'
http-server .
