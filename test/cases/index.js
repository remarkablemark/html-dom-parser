import fs from 'fs';
import path from 'path';
import url from 'url';
import { minify } from 'html-minifier';
import htmlCases from './html.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * Reads file (helper for `readFileSync`).
 *
 * @param  {String} filepath - The file path.
 * @return {String}          - The file text.
 */
function read(filepath) {
  return fs.readFileSync(path.resolve(__dirname, filepath), 'utf8');
}

const html = [
  ...htmlCases,
  {
    name: 'complex html',
    data: minify(read('./complex.html'), {
      collapseWhitespace: true,
    }),
  },
];

const svg = [
  {
    name: 'complex svg',
    data: read('./complex.svg'),
  },
];

export default {
  html,
  svg
}
