/**
 * Runs tests.
 *
 * @param {Object}   testCases      - The test cases.
 * @param {Function} expectedParser - The expected parser.
 * @param {Function} actualParser   - The actual parser.
 * @param {Function} [assert]       - The assertion module.
 */
module.exports = function runTests(
  testCases,
  expectedParser,
  actualParser,
  assert
) {
  if (typeof assert !== 'function') {
    assert = require('assert');
  }

  if (typeof expectedParser !== 'function') {
    throw new TypeError('Missing or invalid expected parser');
  }

  if (typeof actualParser !== 'function') {
    throw new TypeError('Missing or invalid actual parser');
  }

  testCases.forEach(function (testCase) {
    var _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      // enable decodeEntities for both parsers because
      // entities are decoded by client parser in jsdom
      assert.deepEqual(
        expectedParser(testCase.data, { decodeEntities: true }),
        actualParser(testCase.data, { decodeEntities: true })
      );
    });
  });
};
