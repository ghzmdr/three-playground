const standaloneBundler = require('./utils/webpack-bundlers').standalone
const runBundler = require('./utils/run-bundler')

function webpackStandalone() {
  if (standaloneBundler) {
    return runBundler(standaloneBundler)
  }

  return Promise.resolve()
}

module.exports = webpackStandalone
