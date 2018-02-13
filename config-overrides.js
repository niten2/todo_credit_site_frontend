const path = require('path')

module.exports = {
  webpack: (config, env) => {
    config.resolve.alias.src = path.resolve(__dirname, './src/')
    config.resolve.graphql = path.resolve('./node_modules/graphql')

    return config
  },
  jest: (config) => {
    config.modulePaths = ['src/']

    return config
  }
}
