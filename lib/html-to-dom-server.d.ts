// TypeScript Version: 4.1

import { DomHandlerOptions, DomElement } from 'domhandler';

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v3.9.1/lib/index.js#L39-L43
 *
 * @param  html    - HTML markup.
 * @param  options - Parser options (https://github.com/fb55/domhandler/tree/v2.4.2#readme).
 * @return         - DOM elements.
 */
export default function HTMLDOMParser(
  html: string,
  options?: DomHandlerOptions
): DomElement[];
