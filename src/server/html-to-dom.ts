import { DomHandler } from 'domhandler';
import type { ParserOptions } from 'htmlparser2';
import { Parser } from 'htmlparser2';

import { unsetRootParent } from './utilities';

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 *
 * @see https://github.com/fb55/htmlparser2/blob/v9.0.0/src/index.ts#L44-L46
 * @see https://github.com/fb55/domhandler/tree/v5.0.3#readme
 *
 * @param html - HTML markup.
 * @param options - Parser options.
 * @returns - DOM nodes.
 */
export default function HTMLDOMParser(html: string, options?: ParserOptions) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.');
  }

  if (!html) {
    return [];
  }

  const handler = new DomHandler(undefined, options);
  new Parser(handler, options).end(html);
  return unsetRootParent(handler.dom);
}
