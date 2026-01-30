const { unsetRootParent } = require('../../lib/server/utilities');

const isKarma =
  typeof window === 'object' && typeof window.__karma__ === 'object';

/**
 * Runs tests.
 *
 * @param {{deepEqual: () => void}} assert
 * @param {Record<string, string>[]} testCases
 * @param {() => object} actualParser
 * @param {() => object} expectedParser
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        actualOutput = JSON.decycle(actualOutput);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        expectedOutput = JSON.decycle(expectedOutput);
      }

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
};
