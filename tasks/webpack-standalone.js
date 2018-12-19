const standaloneBundler = require('./utils/webpack-bundlers').standalone
const runBundler = require('./utils/run-bundler')

function webpackStandalone() {
  return runBundler(standaloneBundler)
}

module.exports = webpackStandalone
