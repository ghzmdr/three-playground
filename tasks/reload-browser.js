const options = require('../config/options')

module.exports = function reloadBrowserSync() {
  return new Promise(function(resolve, _) {
    const bs = require('browser-sync').get(options.buildHash)
    if (!options.production) bs.reload()
    resolve()
  })
}
