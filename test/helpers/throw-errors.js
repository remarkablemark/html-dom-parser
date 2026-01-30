const values = [
  undefined,
  null,
  0,
  1,
  true,
  false,
  {},
  [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
  new Date(),
];

/**
 * Calls parser with invalid arguments.
 *
 * @param {{throws: () => void}} assert
 * @param {() => object} expectedParser
 */
module.exports = function throwErrors(assert, expectedParser) {
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
