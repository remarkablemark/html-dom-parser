import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * 通用插件配置
 * @param {boolean} isBrowser 是否為瀏覽器環境
 * @param {boolean} minify 是否壓縮
 * @param {string} outputDir 輸出目錄，用於解決路徑衝突
 */
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

/**
 * UMD 配置
 */
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

/**
 * ESM 配置 (修復 CodeSandbox 報錯)
 */
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
  {
    input: 'src/client/html-to-dom.ts',
    output: {
      file: 'esm/client/html-to-dom.mjs',
      format: 'es',
      sourcemap: true,
    },
    plugins: getPlugins(true, false, 'esm'),
  },
];

const configs = [
  getUMDConfig(),
  getUMDConfig(true),
  ...esmConfigs,
  // 測試依賴：Karma 測試需要這個文件
  {
    // 使用 require.resolve 自动寻找 htmlparser2 的主入口文件
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
