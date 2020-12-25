var assert = window.chai.assert;
var utilities = require('../../lib/client/utilities');

describe('client utilities', function () {
  describe('formatDOM', function () {
    it('continues loop when nodeType is undefined', function () {
      var actual = utilities.formatDOM([{ nodeType: undefined }]);
      var expected = [];
      assert.deepEqual(actual, expected);
    });
  });
});
