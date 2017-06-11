'use strict';

/**
 * DOMParser.
 *
 * https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
 */
var parse;
if (typeof DOMParser === 'function') {
    var parser = new DOMParser();

    /**
     * Shorthand for `new DOMParser().parseFromString`.
     *
     * @param  {String} html - The HTML string.
     * @return {HTMLDocument}
     */
    parse = function parseFromString(html) {
        return parser.parseFromString(html, 'text/html');
    };

/**
 * DOMImplementation.
 *
 * https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
 */
} else if (typeof document.implementation === 'object') {
    var doc = document.implementation.createHTMLDocument();

    /**
     * Use document created by `document.implementation.createHTMLDocument`.
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
 * Helper that uses the available parser supported by the browser.
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
            return output.getElementsByTagName('body')[0].childNodes;
        }

        // high-level tags
        if (['html', 'head', 'body'].indexOf(tagName) !== -1) {
            return output.getElementsByTagName(tagName);
        }

        // low-level tags
        return output.getElementsByTagName(tagName)[0].parentNode.childNodes;
    }

    return [];
};
