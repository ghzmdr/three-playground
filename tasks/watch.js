const gulp = require('gulp')
const paths = require('../config/paths')
const options = require('../config/options')

module.exports = function watch() {
  return new Promise(resolve => {
    gulp.watch(`${paths.src.styles}/**/*.less`,
      gulp.series('styles')
    )

    gulp.watch(`${paths.src.scripts}/standalone/**/*.js`,
      gulp.series('webpack-standalone', 'reload-browser')
    )

    gulp.watch(`${paths.src.views}/**/*.{njk,html}`,
      gulp.series(
        'views',
        'reload-browser'
      )
    )

    gulp.watch(`${paths.src.assets}/**/*.*`,
      gulp.series('copy-assets', 'reload-browser')
    )

    resolve()
  })
}
