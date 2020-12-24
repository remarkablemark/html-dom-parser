var Parser = require('htmlparser2/lib/Parser').Parser;
var DomHandler = require('domhandler').DomHandler;

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v4.1.0/src/index.ts#L18-L22
 *
 * @param  {string}            html      - HTML markup.
 * @param  {DomHandlerOptions} [options] - Parser options (https://github.com/fb55/domhandler/tree/v3.3.0#readme).
 * @return {Array<Comment|Element|ProcessingInstruction|Text>} - DOM nodes.
 */
function HTMLDOMParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.');
  }

  if (!html) {
    return [];
  }

  var handler = new DomHandler(undefined, options);
  new Parser(handler, options).end(html);
  return handler.dom;
}

module.exports = HTMLDOMParser;
