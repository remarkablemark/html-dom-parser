import { createRequire } from 'node:module';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const require = createRequire(import.meta.url);

const getPlugins = ({ browser = false, minify = false, outDir }) =>
  [
    browser &&
      alias({
        entries: [
          {
            find: './server/html-to-dom',
            replacement: './client/html-to-dom',
          },
        ],
      }),
    typescript({
      compilerOptions: {
        module: 'esnext',
        outDir,
      },
    }),
    commonjs(),
    resolve({ browser }),
    minify && terser(),
  ].filter(Boolean);

const getUMDConfig = (minify = false) => {
  const output = `dist/html-dom-parser${minify ? '.min' : ''}.js`;
  return {
    input: 'src/index.ts',
    output: {
      file: output,
      format: 'umd',
      name: 'HTMLDOMParser',
      sourcemap: true,
    },
    plugins: getPlugins({
      browser: true,
      minify,
      outDir: 'dist',
    }),
  };
};

const esmConfigs = [
  // ESM server
  {
    input: 'src/index.ts',
    output: {
      dir: 'esm',
      entryFileNames: '[name].mjs',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: getPlugins({
      browser: false,
      minify: false,
      outDir: 'esm',
    }),
  },

  // ESM client
  {
    input: 'src/client/html-to-dom.ts',
    output: {
      dir: 'esm/client',
      entryFileNames: '[name].mjs',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src/client',
      sourcemap: true,
    },
    plugins: getPlugins({
      browser: true,
      minify: false,
      outDir: 'esm/client',
    }),
  },
];

const configs = [];

if (process.env.ESM === 'true') {
  configs.push(...esmConfigs);
}

if (process.env.UMD === 'true') {
  configs.push(getUMDConfig(), getUMDConfig(true), {
    input: require.resolve('htmlparser2'),
    output: {
      file: 'dist/htmlparser2.js',
      format: 'umd',
      name: 'htmlparser2',
      sourcemap: true,
    },
    plugins: [commonjs(), resolve({ browser: true })],
  });
}

export default configs;
