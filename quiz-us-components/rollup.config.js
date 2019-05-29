import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

module.exports = {
  input: 'src/index.js',
  external: Object.keys(pkg.peerDependencies),
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    commonjs()
  ]
};
