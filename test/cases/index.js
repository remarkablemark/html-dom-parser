const fs = require('node:fs');
const path = require('node:path');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { minify } = require('html-minifier');

const htmlCases = require('./html');

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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

module.exports = {
  html,
  svg,
};

module.exports.default = module.exports;
