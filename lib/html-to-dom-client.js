'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');
var formatDOM = utilities.formatDOM;
var domparser = require('./domparser');

/**
 * Parses HTML and reformats DOM nodes output.
 *
 * @param  {String} html - The HTML string.
 * @return {Array}       - The formatted DOM nodes.
 */
module.exports = function parseDOM(html) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string.');
    }
    if (!html) return [];

    // regex to match directive and first tag
    var directiveMatch = html.match(/<(![a-zA-Z\s]+)>/); // e.g., <!doctype html>
    var firstTagMatch = html.match(/<([a-zA-Z]+[0-9]?)/); // e.g., <h1>
    var directive;
    var tagName;

    // directive matched
    if (directiveMatch && directiveMatch[1]) {
        directive = directiveMatch[1];
    }

    // first tag name matched
    if (firstTagMatch && firstTagMatch[1]) {
        tagName = firstTagMatch[1];
    }

    return formatDOM(domparser(html, tagName), null, directive);
};
