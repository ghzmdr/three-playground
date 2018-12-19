const path = require('path')
const paths = require('./paths')

const options = require('./options')

const srcPath = path.resolve(paths.src.scripts)
const destPath = paths.dist.scripts

module.exports = {
  context: srcPath,
  mode: options.production ? 'production' : 'development',
  devtool: options.production ? false : 'inline-module-source-map',
  entry: null,
  plugins: null,
  performance: {
    hints: options.production ? 'warning' : false,
  },
  output: {
    path: path.join(process.cwd(), destPath),
    publicPath: destPath.replace(paths.dist.public, '') + '/', // Remove src directory from path
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|vendors)/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules', `${paths.src.scripts}/vendors`],
    alias: {
      '~': `${process.cwd()}/scripts`
    }
  }
}
