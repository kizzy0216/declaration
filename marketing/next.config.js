const path = require('path');
const webpack = require('webpack');

module.exports = {
  env: {
    HASURA_BASE_URL: 'http://localhost:8080/v1/graphql',
    REST_BASE_URL: 'http://localhost:3000/api',
    DASHBOARD_BASE_URL: 'http://localhost:55000',
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  }
};
