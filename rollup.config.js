import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

/**
 * Build rollup config for development (default) or production (minify = true).
 *
 * @param {Boolean} [minify=false]
 * @return {Object}
 */
const getConfig = (minify = false) => ({
  input: 'index.js',
  output: {
    file: `dist/html-dom-parser${minify ? '.min' : ''}.js`,
    format: 'umd',
    name: 'HTMLDOMParser',
    sourcemap: true
  },
  plugins: [commonjs(), resolve({ browser: true }), minify && uglify()]
});

export default [getConfig(), getConfig(true)];
