import { getHTMLForInnerHTML } from '../../src/client/domparser';

describe('getHTMLForInnerHTML', () => {
  it('returns the html string as-is when no trusted type policy is provided', () => {
    const html = '<div>test</div>';
    const result = getHTMLForInnerHTML(html);

    expect(result).toBe(html);
  });

  it('returns the html string when trustedTypePolicy is undefined', () => {
    const html = '<p>Hello World</p>';
    const result = getHTMLForInnerHTML(html, undefined);

    expect(result).toBe(html);
  });

  it('calls trustedTypePolicy.createHTML with the html string when policy is provided', () => {
    const html = '<span>content</span>';
    const trustedTypePolicy = {
      createHTML: vi.fn((input: string) => input),
    };

    const result = getHTMLForInnerHTML(html, trustedTypePolicy);

    expect(trustedTypePolicy.createHTML).toHaveBeenCalledOnce();
    expect(trustedTypePolicy.createHTML).toHaveBeenCalledWith(html);
    expect(result).toBe(html);
  });

  it('returns the result of trustedTypePolicy.createHTML when policy is provided', () => {
    const html = '<div>test</div>';
    const trustedHtml = 'TRUSTED_HTML_VALUE';
    const trustedTypePolicy = {
      createHTML: vi.fn(() => trustedHtml),
    };

    const result = getHTMLForInnerHTML(html, trustedTypePolicy);

    expect(result).toBe(trustedHtml);
  });

  it('handles empty html string', () => {
    const html = '';
    const result = getHTMLForInnerHTML(html);

    expect(result).toBe('');
  });

  it('handles html string with special characters', () => {
    const html = '<div>Test & "quotes" \'apostrophe\'</div>';
    const result = getHTMLForInnerHTML(html);

    expect(result).toBe(html);
  });

  it('calls trustedTypePolicy with complex html', () => {
    const html = '<div><p>Nested <span>content</span></p></div>';
    const trustedTypePolicy = {
      createHTML: vi.fn((input: string) => input),
    };

    getHTMLForInnerHTML(html, trustedTypePolicy);

    expect(trustedTypePolicy.createHTML).toHaveBeenCalledWith(html);
  });
});
