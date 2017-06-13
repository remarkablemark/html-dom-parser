'use strict';

/**
 * Constants.
 */
var HTML_TAG_NAME = 'html';
var BODY_TAG_NAME = 'body';
var HEAD_TAG_NAME = 'head';

/**
 * DOMParser.
 *
 * https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
 */
var parse;
if (typeof DOMParser === 'function') {
    var parser = new DOMParser();
    var MIME_TYPE = 'text/' + HTML_TAG_NAME;

    /**
     * Creates an HTML document using `DOMParser.parseFromString`.
     *
     * @param  {String} html - The HTML string.
     * @return {HTMLDocument}
     */
    parse = function parseFromString(html) {
        return parser.parseFromString(html, MIME_TYPE);
    };

/**
 * DOMImplementation.
 *
 * https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
 */
} else if (typeof document.implementation === 'object') {
    var doc = document.implementation.createHTMLDocument();

    /**
     * Use HTML document created by `document.implementation.createHTMLDocument`.
     *
     * @param  {String} html - The HTML string.
     * @return {HTMLDocument}
     */
    parse = function createHTMLDocument(html) {
        doc.documentElement.innerHTML = html;
        return doc;
    };

/**
 * Template.
 *
 * https://developer.mozilla.org/docs/Web/HTML/Element/template
 */
} else {
    var template = document.createElement('template');

    if (template.content) {
        parse = function parseTemplate(html) {
            template.innerHTML = html;
            return template.content.childNodes;
        };
    }
}

/**
 * Parses HTML string to DOM nodes.
 *
 * @param  {String} html      - The HTML string.
 * @param  {String} [tagName] - The tag name.
 * @return {NodeList|Array}
 */
module.exports = function domparser(html, tagName) {
    var output = parse(html);
    if (output instanceof NodeList) return output;

    if (output instanceof HTMLDocument) {
        // text
        if (!tagName) {
            return output.getElementsByTagName(BODY_TAG_NAME)[0].childNodes;
        }

        // high-level tags
        if ([HTML_TAG_NAME, HEAD_TAG_NAME, BODY_TAG_NAME].indexOf(tagName) !== -1) {
            return output.getElementsByTagName(tagName);
        }

        // low-level tags
        return output.getElementsByTagName(tagName)[0].parentNode.childNodes;
    }

    return [];
};
