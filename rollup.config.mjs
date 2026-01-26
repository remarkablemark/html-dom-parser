import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const getPlugins = (isBrowser = false, minify = false, outputDir) =>
  [
    isBrowser &&
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
      compilerOptions: {
        outDir: outputDir,
      },
    }),
    commonjs(),
    resolve({ browser: isBrowser }),
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
    plugins: getPlugins(true, minify, 'dist'),
  };
};

const esmConfigs = [
  {
    input: 'src/index.ts',
    output: {
      file: 'esm/index.mjs',
      format: 'es',
      sourcemap: true,
    },
    plugins: getPlugins(false, false, 'esm'),
  },
  // Client build: use preserveModules for proper module structure
  {
    input: 'src/client/html-to-dom.ts',
    output: {
      dir: 'esm/client',
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src/client',
      sourcemap: true,
    },
    plugins: getPlugins(true, false, 'esm/client'),
  },
  {
    input: 'src/server/html-to-dom.ts',
    output: {
      file: 'esm/server/html-to-dom.mjs',
      format: 'es',
      sourcemap: true,
    },
    plugins: getPlugins(false, false, 'esm'),
  },
];

const configs = [
  getUMDConfig(),
  getUMDConfig(true),
  ...esmConfigs,
  {
    input: require.resolve('htmlparser2'),
    output: {
      file: 'dist/htmlparser2.js',
      format: 'umd',
      name: 'htmlparser2',
      sourcemap: true,
    },
    plugins: [commonjs(), resolve({ browser: true })],
  },
];

export default configs;
