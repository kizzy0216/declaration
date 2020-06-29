const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      // NOTE: there's a difference between:
      // - shared, the symlinked directory in this project root
      // - shared, the import alias defined here
      // Using the import alias was problematic for Android when importing fonts and images.
      // Prefer to use the import alias, and defer to symlink whenever that fails.
      'shared': path.resolve(__dirname, '../interface/src'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../interface/src'),
  ],
};
