'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');
var formatDOM = utilities.formatDOM;

/**
 * Parse HTML string to DOM nodes.
 * This uses the browser DOM API.
 *
 * @param  {String} html - The HTML.
 * @return {Object}      - The DOM nodes.
 */
function parseDOM(html) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string.');
    }

    // try to match the tags
    var match = html.match(/<[^\/](.+?)>/g);
    var nodes;

    if (match && match.length) {
        var tagMatch = match[0];

        // directive matched
        if (/<![^-]/.test(tagMatch)) {
            var directive = (
                // remove angle brackets
                tagMatch
                    .substring(1, tagMatch.length - 1)
                    .trim()
            );

            // tag name can no longer be first match item
            tagMatch = match[1];

            // remove directive from html
            html = html.substring(html.indexOf('>') + 1);
        }

        // first tag name matched
        if (tagMatch) {
            var tagName = (
                // keep only tag name
                tagMatch
                    .substring(1, tagMatch.indexOf(' '))
                    .trim()
                    .toLowerCase()
            )
        }
    }

    // create html document to parse top-level nodes
    if (['html', 'head', 'body'].indexOf(tagName) > -1) {
        var doc;

        // `new DOMParser().parseFromString()`
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
        if (window.DOMParser) {
            doc = new window.DOMParser().parseFromString(html, 'text/html');

        // `DOMImplementation.createHTMLDocument()`
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument
        } else if (document.implementation.createHTMLDocument) {
            doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = html;
            doc.removeChild(doc.childNodes[0]); // remove doctype
        }

        // html
        if (tagName === 'html') {
            nodes = doc.childNodes;
        // head and body
        } else {
            nodes = (
                // do this so attributes are kept
                // but there may be an extra head/body node
                doc.getElementsByTagName(tagName)[0]
                    .parentNode
                    .childNodes
            );
        }

    // `innerHTML` approach
    } else {
        var container = document.createElement('body');
        container.innerHTML = html;
        nodes = container.childNodes;
    }

    return formatDOM(nodes, null, directive);
}

/**
 * Export HTML to DOM parser (client).
 */
module.exports = parseDOM;
