const gulp = require('gulp')
const glob = require('globby')
const path = require('path')
const options = require('./config/options')
const { argv = {} } = require('yargs')

Object.entries(options)
  .forEach(([key, value]) => {
    options[key] = argv[key] || value
  })

// You can force some options here
// EG: options.compileHtmlPartials = false

// Register all tasks
glob.sync('./tasks/*.js').forEach(taskFile => {
  const name = path.basename(taskFile, '.js')
  const task = require(taskFile)
  gulp.task(name, task)
})


gulp.task('dev',
  gulp.series(
    'clean',
    gulp.parallel(
      'views',
      'styles',
      'copy-assets',
      'webpack-standalone'
    ),
    gulp.parallel(
      'browser-sync',
      'watch'
    )
  )
)

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      'styles',
      'webpack-scripts',
      'webpack-standalone',
      'copy-assets',
    ),
    'rev',
    'views'
  )
)
