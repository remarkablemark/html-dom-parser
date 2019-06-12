const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');

/**
 * Reads file (helper for `readFileSync`).
 *
 * @param  {String} filepath - The file path.
 * @return {String}          - The file text.
 */
function read(filepath) {
  try {
    return fs.readFileSync(path.join(__dirname, filepath), 'utf8');
  } catch (error) {
    throw error;
  }
}

const html = {
  directive: '<!DOCTYPE html>',
  head: '<head></head>',
  'head with title': '<head><title>content</title></head>',
  body: '<body></body>',
  'body with div': '<body><div>hello</div></body>',
  'capitalized body': '<BODY></BODY>',
  'head and body': '<head></head><body></body>',
  'empty paragraph': '<p></p>',
  'paragraph with text': '<p>text</p>',
  'multiple spans': '<span>1</span><span>2</span>',
  nested: '<ul><li>foo<span>bar</span></li><li>baz</li></ul>',
  attributes:
    '<hr id="foo" class="bar baz" style="background: #fff; text-align: center;" data-foo="bar" />',
  textarea: '<textarea>foo</textarea>',
  script: '<script>console.log(1 < 2);</script>',
  style: '<style>body > .foo { color: #f00; }</style>',
  img: '<img src="http://stat.ic/img.jpg" alt="Image"/>',
  void: '<link/><meta/><img/><br/><hr/><input/>',
  comment: '<!-- comment -->',
  'closing tag': '</div>',
  'complex html': minify(read('./complex.html'), {
    collapseWhitespace: true
  })
};

const svg = {
  'complex svg': read('./complex.svg')
};

module.exports = {
  html,
  svg
};
