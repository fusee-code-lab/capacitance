const { resolve } = require('path');
const { external, plugins } = require('./base');

module.exports = {
  input: resolve('electronic/preload/index.ts'),
  output: {
    file: resolve('app/dist/preload/index.js'),
    format: 'cjs',
    sourcemap: false
  },
  external,
  plugins
};
