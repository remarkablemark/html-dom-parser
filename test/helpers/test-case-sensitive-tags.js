const constants = require('../../lib/client/constants');

/**
 * Tests case-sensitive tags (SVG) to make sure their case is preserved.
 *
 * @param {{equal: () => void}} assert
 * @param {() => object[]} parser
 */
module.exports = function testCaseSensitiveTags(assert, parser) {
  it('preserves case of case-sensitive SVG tags', () => {
    constants.CASE_SENSITIVE_TAG_NAMES.forEach((tag) => {
      const parsed = parser(`<${tag}></${tag}>`);
      assert.equal(parsed[0].name, tag);
    });
  });
};
