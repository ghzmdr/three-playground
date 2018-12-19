const glob = require('glob')
const webpack = require('webpack')

const path = require('path')
const paths = require('../../config/paths')

const options = require('../../config/options')

const srcPath = path.resolve(paths.src.scripts)

const webpackConfig = require('../../config/webpack.config.js')

const entries = {}
const standaloneEntries = {}
const plugins = []

glob.sync(`${srcPath}/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  const entry = []

  if (!options.production) {
    entry.push('webpack/hot/dev-server')
    entry.push('webpack-hot-middleware/client?reload=true')
  }

  // Actual entry MUST be after webpack stuff
  entry.push(filepath)

  entries[entryId] = entry
})

glob.sync(`${srcPath}/standalone/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  standaloneEntries[entryId] = filepath
})

if (!options.production) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const bundlers = {
  scripts: webpack(Object.assign({}, webpackConfig, {entry: entries, plugins})),
}

if (Object.keys(standaloneEntries).length) {
  bundlers.standalone = webpack(Object.assign({}, webpackConfig, {entry: standaloneEntries, plugins: [], output: {
    ...webpackConfig.output,
    path: path.resolve(paths.dist.scripts + '/standalone')
  }}))
}

module.exports = bundlers
