// skip test cases where PhantomJS does not support `DOMParser.parseFromString`
var isPhantomJS =
  typeof navigator === 'object' && navigator.userAgent
    ? /PhantomJS/i.test(navigator.userAgent)
    : false;

module.exports = [
  // high-level tags
  {
    name: 'empty html',
    data: '<html></html>',
    skip: isPhantomJS
  },
  {
    name: 'html with attribute',
    data: '<html lang="en"></html>',
    skip: isPhantomJS
  },
  {
    name: 'html with empty head and body',
    data: '<html><head></head><body></body></html>',
    skip: isPhantomJS
  },
  {
    name: 'html with empty head',
    data: '<html><head></head></html>',
    skip: isPhantomJS
  },
  {
    name: 'html with empty body',
    data: '<html><body></body></html>',
    skip: isPhantomJS
  },

  {
    name: 'empty head',
    data: '<head></head>'
  },
  {
    name: 'head with title',
    data: '<head><title>Page</title></head>'
  },
  {
    name: 'empty head and body',
    data: '<head></head><body></body>'
  },
  {
    name: 'empty body',
    data: '<body></body>'
  },
  {
    name: 'capitalized body',
    data: '<BODY></BODY>'
  },
  {
    name: 'body with paragraph',
    data: '<body><p>text</p></body>'
  },

  // low-level tags
  {
    name: 'empty div',
    data: '<div></div>'
  },
  {
    name: 'empty paragraph',
    data: '<p></p>'
  },
  {
    name: 'paragraph with text',
    data: '<p>text</p>'
  },
  {
    name: 'meta with attribute',
    data: '<meta charset="utf-8">'
  },
  {
    name: 'textarea with value',
    data: '<textarea>value</textarea>'
  },
  {
    name: 'multiple spans',
    data: '<span>1</span><span>2</span>'
  },

  // void (self-closing) tags
  {
    name: 'void',
    data: '<br>'
  },
  {
    name: 'self-closing void',
    data: '<hr/>'
  },
  {
    name: 'input with attributes',
    data: '<input type="text" value="value">'
  },
  {
    name: 'image',
    data: '<img src="https://httpbin.org/image/png" alt="Image">'
  },
  {
    name: 'multiple void',
    data: '<link /><meta/><hr><input type="radio" checked />'
  },

  // tag attributes
  {
    name: 'h1 with id attribute',
    data: '<h1 id="heading"></h1>'
  },
  {
    name: 'h2 with class attribute',
    data: '<h2 class="heading"></h2>'
  },
  {
    name: 'em with style attribute',
    data: '<em style="color: white; z-index: 1; -webkit-appearance: none"></em>'
  },
  {
    name: 'data attribute',
    data: '<div data-attribute="value"></div>'
  },
  {
    name: 'event attribute',
    data: '<div onclick="alert();"></div>'
  },
  {
    name: 'span with multiple attributes',
    data:
      '<span id="button" class="big" style="border: 1px solid #000; -moz-appearance: button;" aria-label="Back" />'
  },
  {
    name: 'hr with multiple attributes',
    data:
      '<hr id="foo" class="bar baz" style="background: #fff; text-align: center;" data-foo="bar">'
  },

  // adjacent tags
  {
    name: 'sibling',
    data: '<li>brother</li><li>sister</li>'
  },

  // nested tags
  {
    name: 'nested definition list',
    data: '<dl><dt>foo</dt><dd>bar<span>baz</span></dd></dl>'
  },
  {
    name: 'nested unordered list',
    data: '<ul><li>foo<span>bar</span></li><li>baz</li></ul>'
  },

  // script tag
  {
    name: 'script',
    data: '<script>console.log(1 < 2);</script>'
  },

  // style tag
  {
    name: 'style',
    data: '<style>body > .foo { color: #f00; }</style>'
  },

  // special
  {
    name: 'directive',
    data: '<!doctype html>'
  },
  {
    name: 'directive with html',
    data: '<!DOCTYPE html><html></html>',
    skip: isPhantomJS
  },
  {
    name: 'comment',
    data: '<!-- comment -->'
  },
  {
    name: 'text',
    data: 'text'
  },
  {
    name: 'closing tag',
    data: '</div>'
  }
];
