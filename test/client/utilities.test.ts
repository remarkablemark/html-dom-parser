import { hasOpenTag } from '../../src/client/utilities';

describe('hasOpenTag', () => {
  it.each([
    ['<head>', 'head'],
    ['<body>', 'body'],
    ['<Head>', 'head'],
    ['<BODY>', 'body'],
    ['<head class="foo">', 'head'],
    ['<body id="bar">', 'body'],
    ['<head\tclass="foo">', 'head'],
    ['<head\nclass="foo">', 'head'],
    ['<head\rclass="foo">', 'head'],
    ['<head/>', 'head'],
    ['<html><head></head><body></body></html>', 'head'],
    ['<html><head></head><body></body></html>', 'body'],
  ])('returns true for %s with tag %s', (html, tagName) => {
    expect(hasOpenTag(html, tagName)).toBe(true);
  });

  it.each([
    ['', 'head'],
    ['<div></div>', 'head'],
    ['<div></div>', 'body'],
    ['<header>', 'head'],
    ['<heading>', 'head'],
    ['<bodyguard>', 'body'],
    ['<nobody>', 'body'],
    ['hello world', 'head'],
  ])('returns false for %s with tag %s', (html, tagName) => {
    expect(hasOpenTag(html, tagName)).toBe(false);
  });
});
