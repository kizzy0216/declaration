const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, '../src');
    config.resolve.alias['next'] = path.resolve(__dirname, './mockNext');
    return config;
  }
};
