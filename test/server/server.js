const { assert } = require('chai');
const htmlparser = require('htmlparser2');
const cases = require('../cases');
const { runTests, throwsError } = require('../helpers');
const { CASE_SENSITIVE_TAG_NAMES } = require('../../lib/constants');

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
  const parser = require('../..');

  // tests
  throwsError(parser);
  runTests(cases.html, parser, htmlparser.parseDOM);
  runTests(cases.svg, parser, htmlparser.parseDOM);
});

describe('client parser in jsdom', () => {
  // before
  const jsdomify = require('jsdomify').default;
  jsdomify.create();
  const parser = require('../../lib/html-to-dom-client');

  // tests
  throwsError(parser);
  runTests(cases.html, parser, htmlparser.parseDOM);
  runTests(cases.svg, parser, htmlparser.parseDOM);
  testCaseSensitiveTags(parser);

  // after
  jsdomify.destroy();
});
