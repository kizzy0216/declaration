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
          }
        }
      ]
    ]
  };
};
