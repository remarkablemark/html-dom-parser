const { assert } = require('chai');
const cases = require('./cases');
const htmlparser = require('htmlparser2');
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
 * Throws tests (a helper that runs tests and verifies that error is thrown).
 *
 * @param {Function} parser - The parser.
 */
function throwTests(parser) {
  const values = [undefined, null, 1, true, {}, ['Array'], Function, Date];
  values.forEach(value => {
    it(`throws when argument is ${value}`, () => {
      assert.throws(() => {
        parser(value);
      }, TypeError);
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

/**
 * Tests for parser.
 */
describe('server parser', () => {
  const parser = require('../');

  // check if invalid parameter type throws error
  throwTests(parser);

  // should be equivalent to `htmlparser2.parseDOM()`
  runTests(parser, cases.html);
  runTests(parser, cases.svg);
});

describe('client parser in jsdom', () => {
  const jsdomify = require('jsdomify').default;
  jsdomify.create();
  const parser = require('../lib/html-to-dom-client');

  // check if invalid parameter type throws error
  throwTests(parser);

  // should return the same output as `htmlparser2.parseDOM()`
  runTests(parser, cases.html);
  runTests(parser, cases.svg);

  testCaseSensitiveTags(parser);

  jsdomify.destroy();
});
