const notifier = require('node-notifier')

function runBundler(bundler) {
  return new Promise((res) =>  {
    bundler.run((err, stats) => {
      if (err) console.error('[webpack] {ERROR}', err)
      console.log(stats.toString({colors: true}))

      const statsErrors = stats.toJson({errorDetails: false}).errors

      if (statsErrors) {
        notifier.notify({
          title: 'Scripts Failed!',
          message: statsErrors[0]
        })
      }

      res()
    })
  })
}

module.exports = runBundler
