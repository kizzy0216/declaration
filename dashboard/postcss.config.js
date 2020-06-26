module.exports = {
  plugins: {
    'postcss-import': {
      'path': ['./'],
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 0,
    },
  },
}
