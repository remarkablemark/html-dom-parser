const { unsetRootParent } = require('../../lib/server/utilities');

const isKarma =
  typeof window === 'object' && typeof window.__karma__ === 'object';

/**
 * Runs tests.
 *
 * @param {Function} assert         - Assert.
 * @param {Object}   testCases      - Test cases.
 * @param {Function} actualParser   - Actual parser.
 * @param {Function} expectedParser - Expected parser.
 */
module.exports = function runTests(
  assert,
  actualParser,
  expectedParser,
  testCases,
) {
  testCases.forEach(function (testCase) {
    const _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      let actualOutput = actualParser(testCase.data);
      let expectedOutput = unsetRootParent(expectedParser(testCase.data));

      // use `JSON.decycle` since `assert.deepEqual` fails
      // when instance types are different in the browser
      if (isKarma) {
        actualOutput = JSON.decycle(actualOutput);
        expectedOutput = JSON.decycle(expectedOutput);
      }

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
};
