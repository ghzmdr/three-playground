const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const notifier = require('node-notifier')

const lazypipe = require('lazypipe')
const path = require('path')
const autoprefixer = require('autoprefixer')
const paths = require('../config/paths')

const options = require('../config/options')
const { production, buildHash } = options

const bs = require('browser-sync').get(buildHash)


function getOptimizePipe() {
  let destPath = paths.dist.styles
  if (production) {
    destPath = path.normalize(destPath.replace(paths.dist.root, '/var/tmp/'))
  }

  return lazypipe()
    .pipe(() => gulp.dest(destPath))
    .pipe(plugins.cleanCss, {
      advanced: false,
      aggressiveMerging: false,
      mediaMerging: false,
      rebase: false
    })()
}

module.exports = function() {
  function errorNotifier(error) {
    console.error('[STYLES] ', error)
    notifier.notify({
      title: 'Styles Failed!',
      message: error
    })
  }

  return gulp.src(`${paths.src.styles}/*.less`)
    .pipe(plugins.plumber({errorHandler: errorNotifier}))
    .pipe(plugins.if(!production, plugins.sourcemaps.init()))
    .pipe(plugins.less({
      paths: [paths.src.styles]
    }))
    .pipe(plugins.postcss([
      autoprefixer()
    ]))
    .pipe(plugins.if(production, getOptimizePipe()))
    .pipe(plugins.if(!production, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist.styles + '/'))
    .pipe(plugins.if(!production, bs.stream({ match: '**/*.css' })))
    .pipe(plugins.size({ title: 'styles' }))
}
