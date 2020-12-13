/**
 * Runs tests.
 *
 * @param {Function} assert         - Assert.
 * @param {Object}   testCases      - Test cases.
 * @param {Function} actualParser   - Actual parser.
 * @param {Function} expectedParser - Expected parser.
 */
function runTests(assert, actualParser, expectedParser, testCases) {
  // enable `decodeEntities` for both parsers
  // because entities are decoded in the browser
  var parserOptions = { decodeEntities: true };

  testCases.forEach(function (testCase) {
    var _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      var actualOutput = actualParser(testCase.data, parserOptions);
      var expectedOutput = expectedParser(testCase.data, parserOptions);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
}

module.exports = runTests;
