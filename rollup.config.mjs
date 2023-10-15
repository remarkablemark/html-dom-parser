import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

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

const configs = [getConfig(), getConfig(true)];

if (process.env.NODE_ENV === 'test') {
  configs.push({
    input: 'node_modules/htmlparser2',
    output: {
      file: 'dist/htmlparser2.js',
      format: 'umd',
      name: 'htmlparser2',
      sourcemap: true
    },
    plugins: [commonjs(), resolve({ browser: true })]
  });
}

export default configs;
