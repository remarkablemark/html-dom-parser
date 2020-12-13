// TypeScript Version: 4.1

import { DataNode, DomHandlerOptions, Element } from 'domhandler';

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v4.0.0/src/index.ts#L18-L22
 *
 * @param  html    - HTML markup.
 * @param  options - Parser options (https://github.com/fb55/domhandler/tree/v3.0.0#readme).
 * @return         - DOM elements.
 */
export default function HTMLDOMParser(
  html: string,
  options?: DomHandlerOptions
): Array<DataNode | Element>;
