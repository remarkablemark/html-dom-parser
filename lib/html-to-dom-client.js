'use strict';

/**
 * Module dependencies.
 */
var domparser = require('./domparser');
var utilities = require('./utilities');
var formatDOM = utilities.formatDOM;

/**
 * Constants.
 */
var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

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

    // directive found
    var match = html.match(DIRECTIVE_REGEX);
    var directive;
    if (match && match[1]) {
        directive = match[1];
    }

    return formatDOM(domparser(html), null, directive);
};
