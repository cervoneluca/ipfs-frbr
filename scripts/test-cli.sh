#!/usr/bin/env bash
npm run build:cli
rm -fr ./test/cli/build
mkdir ./test/cli/build
webpack  --config webpack.config.test-cli.js
node_modules/mocha/bin/mocha --reporter spec test/cli/build/*.js
# node ./test/cli/build/test-cli.api.min.js
