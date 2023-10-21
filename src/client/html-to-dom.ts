import domparser from './domparser';
import { formatDOM } from './utilities';

const DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param html - HTML markup.
 * @returns - DOM elements.
 */
export default function HTMLDOMParser(html: string) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!html) {
    return [];
  }

  // match directive
  const match = html.match(DIRECTIVE_REGEX);
  const directive = match ? match[1] : undefined;

  return formatDOM(domparser(html), null, directive);
}
