import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

import { createFilter } from 'rollup-pluginutils';

const external = createFilter(
  ['prop-types', 'react', 'react-dom', '@material-ui/**'],
  null,
  { resolve: false }
);
// {resolve: false} will make sure these filters are not passed to
// path.resolve first and resolved against the current working directory

module.exports = {
  input: 'quiz-us-components/src/index.js',
  external,
  output: {
    file: 'quiz-us-components/dist/index.js',
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
