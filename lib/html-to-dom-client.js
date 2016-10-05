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
    // from `<p>` or `<p style="">` get `p`
    var match = typeof html === 'string' ? html.match(/<(.+?)[>\s]/) : null;
    var tagName;
    var parentNode;
    var nodes;

    if (match && typeof match[1] === 'string') {
        tagName = match[1].trim().toLowerCase();
    }

    // `DOMParser` can parse full HTML
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
    if (tagName && window.DOMParser) {
        var parser = new window.DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // <head> and <body> are siblings
        if (tagName === 'head' || tagName === 'body') {
            nodes = doc.getElementsByTagName(tagName);

        // document's child nodes
        } else if (tagName === 'html') {
            nodes = doc.childNodes;

        // get the element's parent's child nodes
        // do this in case of adjacent elements
        } else {
            parentNode = doc.getElementsByTagName(tagName)[0].parentNode;
            nodes = parentNode.childNodes;
        }

    // otherwise, use `innerHTML`
    // but this will strip out tags like <html> and <body>
    } else {
        parentNode = document.createElement('div');
        parentNode.innerHTML = html;
        nodes = parentNode.childNodes;
    }

    return formatDOM(nodes);
}

/**
 * Export HTML to DOM parser (client).
 */
module.exports = parseDOM;
