"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var htmlparser2_1 = require("htmlparser2");
var domhandler_1 = require("domhandler");
var utilities_1 = require("./utilities");
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
function HTMLDOMParser(html, options) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string.');
    }
    if (html === '') {
        return [];
    }
    var handler = new domhandler_1.DomHandler(undefined, options);
    new htmlparser2_1.Parser(handler, options).end(html);
    return (0, utilities_1.unsetRootParent)(handler.dom);
}
exports.default = HTMLDOMParser;
//# sourceMappingURL=html-to-dom.js.map