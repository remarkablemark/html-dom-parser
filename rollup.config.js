import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

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
  plugins: [commonjs(), resolve({ browser: true }), minify && terser()]
});

export default [getConfig(), getConfig(true)];
