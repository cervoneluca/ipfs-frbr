#!/usr/bin/env bash
webpack  --config webpack.config.build-cli.js
npm unlink
npm link
