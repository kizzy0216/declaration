const path = require('path');
const webpack = require('webpack');

module.exports = {
  env: {
    HASURA_BASE_URL: 'http://localhost:8080/v1/graphql',
    REST_BASE_URL: 'http://localhost:3000/api',
    MARKETING_BASE_URL: 'http://localhost:55001',
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  }
};
