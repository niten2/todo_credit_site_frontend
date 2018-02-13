const path = require('path')

module.exports = {
  webpack: (config, env) => {
    console.log(1111)
    console.log(1111111111111111)

    config.resolve.alias.src = path.resolve(__dirname, './src/')
    config.resolve.alias.graphql = path.resolve('./node_modules/graphql')

    return config
  },
  jest: (config) => {
    config.modulePaths = ['src/']

    return config
  }
}
