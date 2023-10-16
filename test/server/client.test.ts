import { expect } from 'chai';
import { formatDOM } from '../../src/client/utilities';

describe('client utilities', () => {
  describe('formatDOM', () => {
    it('continues loop when nodeType is undefined', () => {
      expect(
        formatDOM([{ nodeType: undefined }] as unknown as NodeList),
      ).to.deep.equal([]);
    });
  });
});
