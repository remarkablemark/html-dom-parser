import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const getConfig = (minify = false) => ({
  input: 'src/index.ts',

  output: {
    file: `dist/html-dom-parser${minify ? '.min' : ''}.cjs`,
    format: 'umd',
    name: 'HTMLDOMParser',
    sourcemap: true,
  },

  plugins: [
    alias({
      entries: [
        {
          find: './server/html-to-dom',
          replacement: './client/html-to-dom',
        },
      ],
    }),

    typescript({
      declaration: false,
      declarationMap: false,
      module: 'esnext',
    }),

    commonjs(),
    resolve({ browser: true }),
    minify && terser(),
  ],
});

const configs = [getConfig(), getConfig(true)];

if (process.env.NODE_ENV === 'test') {
  configs.push({
    input: 'node_modules/htmlparser2',
    output: {
      file: 'dist/htmlparser2.cjs',
      format: 'umd',
      name: 'htmlparser2',
      sourcemap: true,
    },
    plugins: [commonjs(), resolve({ browser: true })],
  });
}

export default configs;
