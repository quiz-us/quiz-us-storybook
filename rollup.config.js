import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import input from './buildInputs';
import pkg from './quiz-us-components/package.json';

import { createFilter } from 'rollup-pluginutils';

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

// list all dependencies as external so that it is not bundled into the
// dist build:
const external = createFilter(
  // @material-ui/** is explicitly listed because sometimes of specified imports,
  // like: 'import red from '@material-ui/core/colors/red';'
  deps.concat(peerDeps, ['@material-ui/**']),
  null,
  { resolve: false }
);
// {resolve: false} will make sure these filters are not passed to
// path.resolve first and resolved against the current working directory

module.exports = {
  input,
  external,
  output: {
    dir: 'quiz-us-components/dist',
    format: 'esm'
  },
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**']
    }),
    commonjs()
  ]
};
