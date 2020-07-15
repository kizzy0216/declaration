const path = require('path');
const webpack = require('webpack');

module.exports = {
  env: {
    HASURA_BASE_URL: process.env.HASURA_BASE_URL || 'http://localhost:8080/v1/graphql',
    REST_BASE_URL: process.env.REST_BASE_URL || 'http://localhost:3000/api',
    DASHBOARD_BASE_URL: process.env.DASHBOARD_BASE_URL || 'http://localhost:55000',
    BASE_URL: process.env.BASE_URL || 'http://localhost:55001/log-in',
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  }
};
