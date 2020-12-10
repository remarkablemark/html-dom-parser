var values = [
  undefined,
  null,
  0,
  1,
  true,
  false,
  {},
  [],
  function () {},
  new Date()
];

/**
 * Calls parser with invalid arguments.
 *
 * @param {Function} assert         - Assert.
 * @param {Function} expectedParser - Expected parser.
 */
function throwErrors(assert, expectedParser) {
  values.forEach(function (value) {
    it('throws error for argument: ' + value, function () {
      assert.throws(function () {
        expectedParser(value);
      }, TypeError);
    });
  });
}

module.exports = throwErrors;
