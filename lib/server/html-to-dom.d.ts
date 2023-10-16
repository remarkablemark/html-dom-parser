import type { DomHandlerOptions } from 'domhandler';
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
export default function HTMLDOMParser(html: string, options?: DomHandlerOptions): (import("domhandler").Element | import("domhandler").Text | import("domhandler").Comment | import("domhandler").ProcessingInstruction)[];
//# sourceMappingURL=html-to-dom.d.ts.map