const values = [
  undefined,
  null,
  0,
  1,
  true,
  false,
  {},
  [],
  () => {},
  new Date(),
];

/**
 * Calls parser with invalid arguments.
 *
 * @param {Function} assert         - Assert.
 * @param {Function} expectedParser - Expected parser.
 */
export function throwErrors(assert, expectedParser) {
  values.forEach((value) => {
    const type =
      value instanceof Object ? value.constructor.name : JSON.stringify(value);

    it(`throws error for argument: ${type}`, () => {
      assert.throws(function () {
        expectedParser(value);
      }, TypeError);
    });
  });
};
