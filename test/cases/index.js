const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const htmlCases = require('./html');

/**
 * Reads file (helper for `readFileSync`).
 *
 * @param  {String} filepath - The file path.
 * @return {String}          - The file text.
 */
function read(filepath) {
  return fs.readFileSync(path.join(__dirname, filepath), 'utf8');
}

const html = [
  ...htmlCases,
  {
    name: 'complex html',
    data: minify(read('./complex.html'), {
      collapseWhitespace: true
    })
  },
  {
    name: 'html with script',
    data: minify(read('./with-script.html'), {
      collapseWhitespace: true
    })
  }
];

const svg = [
  {
    name: 'complex svg',
    data: read('./complex.svg')
  }
];

module.exports = {
  html,
  svg
};
