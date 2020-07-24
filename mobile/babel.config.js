const path = require('path');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ios.js', '.android.js', '.native.js'],
          alias: {
            '~': './',
            'Shared': '../interface/src',
            // resolve local (to `mobile/`) version of dependencies,
            // such that we can import dependencies from `interface/**/*.js`
            // files without resolver issues
            react: require.resolve('react', {
              paths: [path.join(__dirname, './')],
            }),
          }
        }
      ]
    ]
  };
};
