import { CASE_SENSITIVE_TAG_NAMES } from '../../src/client/constants';

/**
 * Tests case-sensitive tags (SVG) to make sure their case is preserved.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function testCaseSensitiveTags(parser: (input: string) => any) {
  it('preserves case of case-sensitive SVG tags', () => {
    CASE_SENSITIVE_TAG_NAMES.forEach((tag) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(parser(`<${tag}></${tag}>`)[0].name).toBe(tag);
    });
  });
}
