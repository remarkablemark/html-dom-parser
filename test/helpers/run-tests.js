/**
 * Runs tests.
 *
 * @param {Object}   testCases      - The test cases.
 * @param {Function} expectedParser - The expected parser.
 * @param {Function} actualParser   - The actual parser.
 * @param {Function} [assert]       - The assertion module.
 */
function runTests(testCases, expectedParser, actualParser, assert) {
  if (typeof assert !== 'function') {
    assert = require('assert');
  }

  if (typeof expectedParser !== 'function') {
    throw new TypeError('Missing or invalid expected parser');
  }

  if (typeof actualParser !== 'function') {
    throw new TypeError('Missing or invalid actual parser');
  }

  Object.keys(testCases).forEach(function(type) {
    var testCase = testCases[type];

    it(type, function() {
      assert.deepEqual(expectedParser(testCase), actualParser(testCase));
    });
  });
}

module.exports = runTests;
