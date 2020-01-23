#!/usr/bin/env bash
npm run build
rm -fr ./test/node/build
mkdir ./test/node/build
webpack  --config webpack.config.test-node.js
node_modules/mocha/bin/mocha --reporter spec test/node/build/*.js
# node ./test/node/build/test-node.api.min.js
