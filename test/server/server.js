const { assert } = require('chai');
const htmlparser = require('htmlparser2');
const cases = require('../cases');
const { runTests, throwErrors } = require('../helpers');
const { CASE_SENSITIVE_TAG_NAMES } = require('../../lib/client/constants');

/**
 * Tests case-sensitive tags (SVG) to make sure their case is preserved.
 *
 * @param {Function} parser - The parser.
 */
function testCaseSensitiveTags(parser) {
  it('preserves case of case-sensitive SVG tags', () => {
    CASE_SENSITIVE_TAG_NAMES.forEach(tag => {
      const parsed = parser(`<${tag}></${tag}>`);
      assert.equal(parsed[0].name, tag);
    });
  });
}

describe('server parser', () => {
  // before
  const serverParser = require('../..');

  // tests
  throwErrors(assert, serverParser);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.html);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.svg);
});

describe('client parser in jsdom', () => {
  // before
  const jsdomify = require('jsdomify').default;
  jsdomify.create();
  const clientParser = require('../../lib/client/html-to-dom');

  // tests
  throwErrors(assert, clientParser);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.html);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.svg);
  testCaseSensitiveTags(clientParser);

  // after
  jsdomify.destroy();
});
