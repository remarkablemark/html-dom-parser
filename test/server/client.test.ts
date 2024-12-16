import { expect } from 'chai';

import { CARRIAGE_RETURN_PLACEHOLDER } from '../../src/client/constants';
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
      expect(escapeSpecialCharacters('Hello\rWorld')).to.equal(
        `Hello${CARRIAGE_RETURN_PLACEHOLDER}World`,
      );
    });

    it('does not modify strings without special characters', () => {
      const text = 'Hello World';
      expect(escapeSpecialCharacters(text)).to.equal(text);
    });

    it('handles empty strings', () => {
      const text = '';
      expect(escapeSpecialCharacters(text)).to.equal(text);
    });

    it('handles multiple carriage returns', () => {
      expect(escapeSpecialCharacters('Hello\rDear\rWorld')).to.equal(
        `Hello${CARRIAGE_RETURN_PLACEHOLDER}Dear${CARRIAGE_RETURN_PLACEHOLDER}World`,
      );
    });

    it('only escapes carriage returns', () => {
      // `\n` and `\right` should not be affected
      expect(escapeSpecialCharacters('Hello\rWorld\n\right')).to.equal(
        `Hello${CARRIAGE_RETURN_PLACEHOLDER}World\n${CARRIAGE_RETURN_PLACEHOLDER}ight`,
      );
    });
  });

  describe('revertEscapedCharacters', () => {
    it('reverts escaped carriage return characters', () => {
      expect(
        revertEscapedCharacters(`Hello${CARRIAGE_RETURN_PLACEHOLDER}World`),
      ).to.equal('Hello\rWorld');
    });

    it('does not modify strings without escaped characters', () => {
      const text = 'Hello World';
      expect(revertEscapedCharacters(text)).to.equal(text);
    });

    it('handles empty strings', () => {
      const text = '';
      expect(revertEscapedCharacters(text)).to.equal(text);
    });

    it('handles multiple escaped carriage returns', () => {
      expect(
        revertEscapedCharacters(
          `Hello${CARRIAGE_RETURN_PLACEHOLDER}Dear${CARRIAGE_RETURN_PLACEHOLDER}World`,
        ),
      ).to.equal('Hello\rDear\rWorld');
    });

    it('only reverts escaped carriage returns', () => {
      // `\n` and `\right` should not be affected
      expect(
        revertEscapedCharacters(
          `Hello${CARRIAGE_RETURN_PLACEHOLDER}World\\n\\right`,
        ),
      ).to.equal('Hello\rWorld\\n\\right');
    });
  });
});
