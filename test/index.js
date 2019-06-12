'use strict';

/**
 * Module dependencies.
 */
var assert = require('chai').assert;
var cases = require('./cases');
var htmlparser = require('htmlparser2');
var CASE_SENSITIVE_TAG_NAMES = require('../lib/constants')
  .CASE_SENSITIVE_TAG_NAMES;

/**
 * Helper that creates and runs tests based on available cases.
 *
 * @param {Function} parser - The parser.
 * @param {Object}   cases  - The cases.
 */
function runTests(parser, cases) {
  Object.keys(cases).forEach(function(type) {
    it(type, function() {
      var data = cases[type];
      assert.deepEqual(parser(data), htmlparser.parseDOM(data));
    });
  });
}

/**
 * Helper that runs tests and confirms an error is thrown.
 *
 * @param {Function} parser - The parser.
 */
function throwTests(parser) {
  [undefined, null, 1, true, {}, ['Array'], Function, Date].forEach(function(
    value
  ) {
    it('throws when argument is ' + value, function() {
      assert.throws(function() {
        parser(value);
      }, TypeError);
    });
  });
}

/**
 * Tests the case sensitive SVG tags to make sure their case is preserved.
 *
 * @param {Function} parser - The parser.
 */
function testCaseSensitiveTags(parser) {
  it('preserves case of case-sensitive SVG tags', function() {
    CASE_SENSITIVE_TAG_NAMES.forEach(function(tag) {
      var parsed = parser('<' + tag + '></' + tag + '>');
      assert.equal(parsed[0].name, tag);
    });
  });
}

/**
 * Tests for parser.
 */
describe('html-dom-parser', function() {
  describe('server', function() {
    var parser = require('../');

    // check if invalid parameter type throws error
    throwTests(parser);

    // should be equivalent to `htmlparser2.parseDOM()`
    runTests(parser, cases.html);
    runTests(parser, cases.svg);
  });

  describe('client', function() {
    var jsdomify = require('jsdomify').default;
    jsdomify.create();
    var parser = require('../lib/html-to-dom-client');

    // check if invalid parameter type throws error
    throwTests(parser);

    // should return the same output as `htmlparser2.parseDOM()`
    runTests(parser, cases.html);
    runTests(parser, cases.svg);

    testCaseSensitiveTags(parser);

    jsdomify.destroy();
  });
});
