const { expect } = require('chai');
const utilities = require('../../lib/client/utilities');

describe('client utilities', function () {
  describe('formatDOM', function () {
    it('continues loop when nodeType is undefined', function () {
      expect(utilities.formatDOM([{ nodeType: undefined }])).to.deep.equal([]);
    });
  });
});
