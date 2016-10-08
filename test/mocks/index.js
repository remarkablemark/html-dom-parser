'use strict';

// html
var html = {
    directive: '<!DOCTYPE html>',
    single: '<p>foo</p>',
    nested: '<ul><li>foo<span>bar</span></li><li>baz</li></ul>',
    attributes: '<hr id="foo" class="bar baz" style="background: #fff; text-align: center;" data-foo="bar" />',
    textarea: '<textarea>foo</textarea>',
    script: '<script>console.log(1 < 2);</script>',
    style: '<style>body > .foo { color: #f00; }</style>',
    img: '<img src="http://stat.ic/img.jpg" alt="Image"/>',
    void: '<link/><meta/><img/><br/><hr/><input/>',
    comment: '<!-- comment -->'
};

html.multiple = html.single + html.single;

/**
 * Export mocks.
 */
module.exports = {
    html: html
};
