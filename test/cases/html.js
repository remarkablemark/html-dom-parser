module.exports = [
  // html tags
  {
    name: 'empty html',
    data: '<html></html>'
  },
  {
    name: 'html with attribute',
    data: '<html lang="en"></html>'
  },
  {
    name: 'html with empty head and body',
    data: '<html><head></head><body></body></html>'
  },
  {
    name: 'html with empty head',
    data: '<html><head></head></html>'
  },
  {
    name: 'html with empty body',
    data: '<html><body></body></html>'
  },
  {
    name: 'unclosed html and head tags',
    data: '<html><head>'
  },
  {
    name: 'unclosed html and body tags',
    data: '<html><body>'
  },
  {
    name: 'unclosed html, head, and body tags',
    data: '<html><head><body>'
  },

  // head and body tags
  {
    name: 'unclosed head',
    data: '<head>'
  },
  {
    name: 'empty head',
    data: '<head></head>'
  },
  {
    name: 'head with title',
    data: '<head><title>Text</title></head>'
  },
  {
    name: 'empty head and body',
    data: '<head></head><body></body>'
  },
  {
    name: 'unclosed head and body',
    data: '<head><body>'
  },
  {
    name: 'unclosed title',
    data: '<title>'
  },
  {
    name: 'empty title',
    data: '<title></title>'
  },
  {
    name: 'title with text',
    data: '<title>text</title>'
  },
  {
    name: 'title with text as tags',
    data: '<title><b>text</b></title>'
  },
  {
    name: 'unclosed body',
    data: '<body>'
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
  {
    name: 'head and body with newline',
    data: '<head></head><body\n>text</body>'
  },
  {
    name: 'head and body with whitespace and newlines',
    data: '<head><title>hello</title></head><body \n\n >text</body>'
  },
  {
    name: 'body with whitespace and newline',
    data: '<body \n >text</body>'
  },

  // common tags
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
    data: '<span id="button" class="big" style="border: 1px solid #000; -moz-appearance: button;" aria-label="Back" />'
  },
  {
    name: 'hr with multiple attributes',
    data: '<hr id="foo" class="bar baz" style="background: #fff; text-align: center;" data-foo="bar">'
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
    name: 'empty script',
    data: '<script></script>'
  },
  {
    name: 'script',
    data: '<script>console.log(1 < 2);</script>'
  },
  {
    name: 'script with json',
    data: '<script type="application/json">{"foo":"bar"}</script>'
  },

  // noscript tag
  {
    name: 'empty noscript',
    data: '<noscript></noscript>'
  },
  {
    name: 'noscript with text',
    data: '<noscript>JS is not enabled</noscript>'
  },
  {
    name: 'noscript with p',
    data: '<noscript><p>JS is disabled</p></noscript>',
    get skip() {
      // client parser renders noscript incorrectly in jsdom
      // template renders noscript children as text instead of nodes
      var isJSDOM = typeof window === 'object' && window.name === 'nodejs';
      return isJSDOM;
    }
  },

  // style tag
  {
    name: 'empty style',
    data: '<style></style>'
  },
  {
    name: 'style',
    data: '<style>body > .foo { color: #f00; }</style>'
  },

  // html5 tags
  {
    name: 'audio',
    data: '<audio controls="controls" preload="none" width="640">'
  },

  // html entities
  {
    name: 'non-breaking space',
    data: '&nbsp;'
  },
  {
    name: 'en dash',
    data: '&ndash;'
  },
  {
    name: 'em dash',
    data: '&mdash;'
  },

  // directive
  {
    name: 'directive',
    data: '<!doctype html>'
  },
  {
    name: 'directive with html',
    data: '<!DOCTYPE html><html></html>'
  },

  // comment
  {
    name: 'comment',
    data: '<!-- comment -->'
  },
  {
    name: 'conditional comment',
    data: '<!--[if lt IE 9]>Below IE 9<![endif]-->'
  },

  // text
  {
    name: 'empty string',
    data: ''
  },
  {
    name: 'text',
    data: 'text'
  },
  {
    name: 'space',
    data: ' '
  },

  // custom tag
  {
    name: 'custom tag',
    data: '<custom>'
  },
  {
    name: 'custom tags',
    data: '<foo><bar>'
  },

  // invalid
  {
    name: 'self-closing div',
    data: '<div/>'
  },
  {
    name: 'self-closing div and p',
    data: '<div/><p/>'
  },

  // misc
  {
    name: 'unclosed tag',
    data: '<div>'
  },
  {
    name: 'unclosed tags',
    data: '<p><span>'
  },
  {
    name: 'closing tag',
    data: '</div>'
  }
];
