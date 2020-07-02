const path = require('path');
const webpack = require('webpack');

module.exports = {
  env: {
    API_BASE_URL: 'http://localhost:8080/v1/graphql',
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  }
};
