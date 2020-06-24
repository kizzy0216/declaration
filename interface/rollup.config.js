import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ["styled-jsx/babel"],
      }),
      commonjs(),
    ]
  },
  {
    input: 'src/styles/variables.css',
    output: {
      file: 'build/styles/variables.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        plugins: [
          postcssPresetEnv(),
        ],
      }),
    ],
  },
  {
    input: 'src/styles/media.css',
    output: {
      file: 'build/styles/media.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        plugins: [
          postcssPresetEnv(),
        ],
      }),
    ],
  },
  {
    input: 'src/styles/base.css',
    output: {
      file: 'build/styles/base.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        plugins: [
          postcssPresetEnv({
            importFrom: [
              './src/styles/variables.css',
              './src/styles/media.css',
            ],
          }),
        ],
      }),
    ],
  },
];
