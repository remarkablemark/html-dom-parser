var unsetRootParent = require('../../lib/server/utilities').unsetRootParent;

var isKarma =
  typeof window === 'object' && typeof window.__karma__ === 'object';

/**
 * Runs tests.
 *
 * @param {Function} assert         - Assert.
 * @param {Object}   testCases      - Test cases.
 * @param {Function} actualParser   - Actual parser.
 * @param {Function} expectedParser - Expected parser.
 */
function runTests(assert, actualParser, expectedParser, testCases) {
  testCases.forEach(function (testCase) {
    var _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      var actualOutput = actualParser(testCase.data);
      var expectedOutput = unsetRootParent(expectedParser(testCase.data));

      // use `JSON.decycle` since `assert.deepEqual` fails
      // when instance types are different in the browser
      if (isKarma) {
        actualOutput = JSON.decycle(actualOutput);
        expectedOutput = JSON.decycle(expectedOutput);
      }

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
}

module.exports = runTests;
