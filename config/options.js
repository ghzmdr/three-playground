const options = {
  production: false,
  buildHash: `buildhash:${Date.now()}`,
  tommy: {
    src: '/src',
    dst: '/dst',
    timeout: null,
    config: {
      'tester.image': {
        enabled: false
      },
      'processor.svg': {
        'enabled': true
      },
      'processor.resize': {
        'enabled': true,
        'suffix': '-${i}.${ext}',
        'dimensions': [10, 300],
      },
      'processor.lazyLoadBlurried': {
        'enabled': false
      }
    }
  }
}

module.exports = options
