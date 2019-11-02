var values = [
  undefined,
  null,
  0,
  1,
  true,
  false,
  {},
  [],
  function() {},
  new Date()
];

/**
 * Calls parser with invalid arguments.
 *
 * @param {Function} parser   - The parser.
 * @param {Function} [assert] - The assertion module.
 */
function throwsError(parser, assert) {
  if (typeof assert !== 'function') {
    assert = require('assert');
  }

  values.forEach(function(value) {
    it('throws error for argument: ' + value, function() {
      assert.throws(function() {
        parser(value);
      }, TypeError);
    });
  });
}

module.exports = throwsError;
