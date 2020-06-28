const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      shared: path.resolve(__dirname, '../interface/src'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, '../interface/src'),
  ],
};
