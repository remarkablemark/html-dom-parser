var Parser = require('htmlparser2/lib/Parser');
var DomHandler = require('domhandler');

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v3.9.1/lib/index.js#L39-L43
 *
 * @param  {String} html      - HTML string.
 * @param  {Object} [options] - Parser options.
 * @return {DomElement[]}     - DOM nodes.
 */
function HTMLDOMParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.');
  }

  if (!html) {
    return [];
  }

  var handler = new DomHandler(options);
  new Parser(handler, options).end(html);
  return handler.dom;
}

module.exports = HTMLDOMParser;
