import type { HTMLDOMParserOptions } from '../types';
import domparser from './domparser';
import { formatDOM } from './utilities';

const DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param html - HTML markup.
 * @param options - Parser options.
 * @returns - DOM elements.
 */
export default function HTMLDOMParser(
  html: string,
  options?: HTMLDOMParserOptions,
) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!html) {
    return [];
  }

  // match directive
  const match = DIRECTIVE_REGEX.exec(html);
  const directive = match ? match[1] : undefined;

  return formatDOM(
    domparser(html, options?.trustedTypePolicy),
    null,
    directive,
  );
}
