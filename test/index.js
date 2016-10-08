'use strict';

/**
 * Module dependencies.
 */
var assert = require('chai').assert;
var mocks = require('./mocks/');
var htmlparser = require('htmlparser2');

/**
 * Tests for parser.
 */
describe('html-dom-parser', function() {

    describe('server parser', function() {
        var parser = require('../');

        it('is equivalent to `htmlparser2.parseDOM()`', function() {
            // html
            Object.keys(mocks.html).forEach(function(type) {
                var html = mocks.html[type];
                assert.deepEqual(parser(html), htmlparser.parseDOM(html));
            });

            // svg
            Object.keys(mocks.svg).forEach(function(type) {
                var svg = mocks.svg[type];
                assert.deepEqual(parser(svg), htmlparser.parseDOM(svg));
            });
        });
    });

});
