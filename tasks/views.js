const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const notifier = require('node-notifier')

const fs = require('fs')
const path = require('path')

const paths = require('../config/paths')
const nunjucks = require('nunjucks')

const viewPath = paths.src.views
const distPath = paths.dist.public
const manifestPath = paths.dist.manifest

const options = require('../config/options')

const viewPaths = [
  `${viewPath}/{,*/}*.{njk,html}`,
  `!${viewPath}/templates/**`,
  `!${viewPath}/partials/**`,
  `!${viewPath}/macro/**`,
]

function errorNotifier(error) {
  if (!error) return

  notifier.notify({
    title: 'Views Failed!',
    message: error.filename
      ? `In file: ${path.basename(error.fileName)}`
      : JSON.stringify(error)
  })
}

module.exports = function views() {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPath))
  const revisions = options.production
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {}

  return gulp.src(viewPaths)
    .pipe(plugins.plumber({errorHandler: errorNotifier}))
    .pipe(plugins.nunjucks.compile({revisions}, {
      env: env
    }))
    .pipe(plugins.rename({
      extname: '.html',
    }))
    .pipe(plugins.if(options.production, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest(distPath))
}

