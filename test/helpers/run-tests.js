/**
 * Runs tests.
 *
 * @param {Object}   testCases      - Test cases.
 * @param {Function} expectedParser - Expected parser.
 * @param {Function} actualParser   - Actual parser.
 * @param {Function} [assert]       - Assertion module.
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

  // enable `decodeEntities` for both parsers
  // because entities are decoded on the browser
  var parserOptions = { decodeEntities: true };

  testCases.forEach(function (testCase) {
    var _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      assert.deepEqual(
        actualParser(testCase.data, parserOptions),
        expectedParser(testCase.data, parserOptions)
      );
    });
  });
}

module.exports = runTests;
