const { assert } = require('chai');
const htmlparser = require('htmlparser2');
const cases = require('./cases');
const throwsError = require('./helpers/throws-error');
const { CASE_SENSITIVE_TAG_NAMES } = require('../lib/constants');

/**
 * Runs test cases.
 *
 * @param {Function} parser - The parser.
 * @param {Object}   cases  - The test cases.
 */
function runTests(parser, cases) {
  Object.keys(cases).forEach(type => {
    it(type, () => {
      const data = cases[type];
      assert.deepEqual(parser(data), htmlparser.parseDOM(data));
    });
  });
}

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
  const parser = require('../');

  // tests
  throwsError(parser);
  runTests(parser, cases.html);
  runTests(parser, cases.svg);
});

describe('client parser in jsdom', () => {
  // before
  const jsdomify = require('jsdomify').default;
  jsdomify.create();
  const parser = require('../lib/html-to-dom-client');

  // tests
  throwsError(parser);
  runTests(parser, cases.html);
  runTests(parser, cases.svg);
  testCaseSensitiveTags(parser);

  // after
  jsdomify.destroy();
});
