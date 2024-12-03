import { expect } from 'chai';

import { formatDOM } from '../../src/client/utilities';
import { revertEscapedCharacters } from '../../src/client/utilities';
import { escapeSpecialCharacters } from '../../src/client/utilities';

describe('client utilities', () => {
  describe('formatDOM', () => {
    it('continues loop when nodeType is undefined', () => {
      expect(
        formatDOM([{ nodeType: undefined }] as unknown as NodeList),
      ).to.deep.equal([]);
    });
  });

  describe('escapeSpecialCharacters', () => {
    it('escapes carriage return characters', () => {
      const input = 'Hello\rWorld';
      const expected = 'Hello\\rWorld';
      expect(escapeSpecialCharacters(input)).to.equal(expected);
    });

    it('does not modify strings without special characters', () => {
      const input = 'Hello World';
      expect(escapeSpecialCharacters(input)).to.equal(input);
    });

    it('handles empty strings', () => {
      expect(escapeSpecialCharacters('')).to.equal('');
    });

    it('handles multiple carriage returns', () => {
      const input = 'Hello\rDear\rWorld';
      const expected = 'Hello\\rDear\\rWorld';
      expect(escapeSpecialCharacters(input)).to.equal(expected);
    });

    it('only escapes carriage returns', () => {
      const input = 'Hello\rWorld\n'; // \n should not be affected
      const expected = 'Hello\\rWorld\n';
      expect(escapeSpecialCharacters(input)).to.equal(expected);
    });
  });

  describe('revertEscapedCharacters', () => {
    it('reverts escaped carriage return characters', () => {
      const input = 'Hello\\rWorld';
      const expected = 'Hello\rWorld';
      expect(revertEscapedCharacters(input)).to.equal(expected);
    });

    it('does not modify strings without escaped characters', () => {
      const input = 'Hello World';
      expect(revertEscapedCharacters(input)).to.equal(input);
    });

    it('handles empty strings', () => {
      expect(revertEscapedCharacters('')).to.equal('');
    });

    it('handles multiple escaped carriage returns', () => {
      const input = 'Hello\\rDear\\rWorld';
      const expected = 'Hello\rDear\rWorld';
      expect(revertEscapedCharacters(input)).to.equal(expected);
    });

    it('only reverts escaped carriage returns', () => {
      const input = 'Hello\\rWorld\\n'; // \n should not be affected
      const expected = 'Hello\rWorld\\n';
      expect(revertEscapedCharacters(input)).to.equal(expected);
    });
  });
});
