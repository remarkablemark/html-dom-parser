const { expect } = require('chai');
const { formatDOM } = require('../../src/client/utilities');

describe('client utilities', () => {
  describe('formatDOM', () => {
    it('continues loop when nodeType is undefined', () => {
      expect(formatDOM([{ nodeType: undefined }])).to.deep.equal([]);
    });
  });
});
