var constants = require('../../lib/client/constants');

/**
 * Tests case-sensitive tags (SVG) to make sure their case is preserved.
 *
 * @param {Function} parser - The parser.
 */
function testCaseSensitiveTags(assert, parser) {
  it('preserves case of case-sensitive SVG tags', function () {
    constants.CASE_SENSITIVE_TAG_NAMES.forEach(function (tag) {
      var parsed = parser('<' + tag + '></' + tag + '>');
      assert.equal(parsed[0].name, tag);
    });
  });
}

module.exports = testCaseSensitiveTags;
