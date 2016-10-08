'use strict';

/**
 * Module dependencies.
 */
var assert = require('chai').assert;
var mocks = require('./mocks/');
var htmlparser = require('htmlparser2');

/**
 * Helper that creates and runs tests based on mock data.
 *
 * @param {Function} parser  - The parser.
 * @param {Object}   mockObj - The mock object.
 */
function runTests(parser, mockObj) {
    Object.keys(mockObj).forEach(function(type) {
        it(type, function() {
            var data = mockObj[type];
            assert.deepEqual(parser(data), htmlparser.parseDOM(data));
        })
    });
}

/**
 * Tests for parser.
 */
describe('html-dom-parser', function() {

    // server
    describe('server parser', function() {
        var parser = require('../');

        // should be equivalent to `htmlparser2.parseDOM()`
        runTests(parser, mocks.html);
        runTests(parser, mocks.svg);
    });

});
