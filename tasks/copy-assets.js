const paths = require('../config/paths')
const options = require('../config/options')
const gulp = require('gulp')

module.exports = () => {
  if (options.production) {
    return gulp.src(paths.src.assets + '/**/*')
      .pipe(gulp.dest(paths.dist.assets + '/'))
  }

  return gulp.src(paths.src.assets)
    .pipe(gulp.symlink(paths.dist.public))
}
