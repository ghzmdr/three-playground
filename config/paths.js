const appPath = '.'
const distPath = 'build'
const publicPath = `${distPath}/public`
const artifactsPath = `${distPath}/artifacts`

module.exports = {
  root: appPath,
  src: {
    styles: `${appPath}/styles`,
    scripts: `${appPath}/scripts`,
    assets: `${appPath}/assets`,
    views: `${appPath}/views`,
  },

  dist: {
    root: distPath,
    public: publicPath,
    artifacts: artifactsPath,
    releases: `${artifactsPath}/releases`,
    styles: `${publicPath}/css`,
    scripts: `${publicPath}/js`,
    assets: `${publicPath}/assets`,
    manifest: `${artifactsPath}/rev-manifest.json`
  }
}
