import { defineConfig } from 'tsdown';

const bundleEntries = ['src/index.ts', 'src/client/html-to-dom.ts'];

const sharedConfig = {
  clean: false,
  dts: {
    sourcemap: true,
  },
  entry: bundleEntries,
  failOnWarn: true,
  root: 'src',
  sourcemap: true,
  tsconfig: 'tsconfig.build.json',
  unbundle: true,
};

const umdOutputOptions = {
  chunkFileNames: '[name]-[hash].js',
  entryFileNames: '[name].js',
};

export default defineConfig([
  // cjs
  {
    ...sharedConfig,
    cjsDefault: false,
    format: 'cjs',
    name: 'cjs',
    outDir: 'lib',
    outExtensions() {
      return {
        dts: '.d.ts',
        js: '.js',
      };
    },
  },

  // esm
  {
    ...sharedConfig,
    format: 'esm',
    name: 'esm',
    outDir: 'esm',
    outExtensions() {
      return {
        dts: '.d.mts',
        js: '.mjs',
      };
    },
  },

  // umd
  {
    deps: {
      alwaysBundle: ['domhandler', 'domelementtype'],
    },
    dts: false,
    entry: {
      'html-dom-parser': 'src/client/html-to-dom.ts',
    },
    failOnWarn: true,
    format: 'umd',
    globalName: 'HTMLDOMParser',
    name: 'umd',
    outDir: 'dist',
    outputOptions: umdOutputOptions,
    platform: 'browser',
    sourcemap: true,
    tsconfig: 'tsconfig.build.json',
  },

  // umd (min)
  {
    deps: {
      alwaysBundle: ['domhandler', 'domelementtype'],
    },
    dts: false,
    entry: {
      'html-dom-parser.min': 'src/client/html-to-dom.ts',
    },
    failOnWarn: true,
    format: 'umd',
    globalName: 'HTMLDOMParser',
    minify: true,
    name: 'umd-min',
    outDir: 'dist',
    outputOptions: umdOutputOptions,
    platform: 'browser',
    sourcemap: true,
    tsconfig: 'tsconfig.build.json',
  },
]);
