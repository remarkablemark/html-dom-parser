// @vitest-environment jsdom
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
      expect(escapeSpecialCharacters('Hello\rWorld')).to.match(
        /^Hello__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__World$/,
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
      const escaped = escapeSpecialCharacters('Hello\rDear\rWorld');
      const placeholders = escaped.match(
        /__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__/g,
      );

      expect(escaped).to.match(
        /^Hello__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__Dear__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__World$/,
      );
      expect(placeholders).to.have.length(2);
      expect(placeholders?.[0]).to.equal(placeholders?.[1]);
    });

    it('only escapes carriage returns', () => {
      // `\n` and `\right` should not be affected
      expect(escapeSpecialCharacters('Hello\rWorld\n\right')).to.match(
        /^Hello__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__World\n__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__ight$/,
      );
    });
  });

  describe('revertEscapedCharacters', () => {
    it('reverts escaped carriage return characters', () => {
      expect(
        revertEscapedCharacters(escapeSpecialCharacters('Hello\rWorld')),
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
        revertEscapedCharacters(escapeSpecialCharacters('Hello\rDear\rWorld')),
      ).to.equal('Hello\rDear\rWorld');
    });

    it('only reverts escaped carriage returns', () => {
      // `\n` and `\right` should not be affected
      expect(
        revertEscapedCharacters(
          escapeSpecialCharacters('Hello\rWorld\\n\\right'),
        ),
      ).to.equal('Hello\rWorld\\n\\right');
    });
  });
});
