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
 */
export function throwErrors(expectedParser: (input: unknown) => void) {
  values.forEach((value) => {
    const type =
      value instanceof Object ? value.constructor.name : JSON.stringify(value);

    it(`throws error for argument: ${type}`, () => {
      expect(() => {
        expectedParser(value);
      }).toThrowError(TypeError);
    });
  });
}
