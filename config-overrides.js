const path = require('path');

module.exports = {
  webpack: (config, env) => {
    config.resolve.alias.src = path.resolve(__dirname, './src/');
    return config;
  },
  jest: (config) => {
    config.modulePaths = ['src/'];
    return config;
  }
}
