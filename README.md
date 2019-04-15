# html-dom-parser

[![NPM](https://nodei.co/npm/html-dom-parser.png)](https://nodei.co/npm/html-dom-parser/)

[![NPM version](https://img.shields.io/npm/v/html-dom-parser.svg)](https://www.npmjs.com/package/html-dom-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-dom-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-dom-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-dom-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-dom-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-dom-parser.svg)](https://david-dm.org/remarkablemark/html-dom-parser)

An HTML to DOM parser that works on both the server and the browser:

```
HTMLDOMParser(string[, options])
```

The parser converts an HTML string to a JavaScript object that describes the DOM tree.

[repl.it](https://repl.it/@remarkablemark/html-dom-parser) | [JSFiddle](https://jsfiddle.net/remarkablemark/ff9yg1yz/)

## Installation

[NPM](https://www.npmjs.com/package/html-dom-parser):

```sh
$ npm install html-dom-parser --save
```

[Yarn](https://yarnpkg.com/package/html-dom-parser):

```sh
$ yarn add html-dom-parser
```

[unpkg](https://unpkg.com/html-dom-parser/) (CDN):

```html
<script src="https://unpkg.com/html-dom-parser@latest/dist/html-dom-parser.js"></script>
<script>
  window.HTMLDOMParser(/* string */);
</script>
```

## Usage

Import parser:

```js
// server
var parser = require('html-dom-parser');

// client
var parser = window.HTMLDOMParser;
```

Parse input:

```js
parser('<p>Hello, world!</p>');
```

Get output:

```js
[ { type: 'tag',
    name: 'p',
    attribs: {},
    children:
     [ { data: 'Hello, world!',
         type: 'text',
         next: null,
         prev: null,
         parent: [Circular] } ],
    next: null,
    prev: null,
    parent: null } ]
```

On the server-side (Node.js), the parser is a wrapper of `parseDOM` from [htmlparser2](https://github.com/fb55/htmlparser2).

On the client-side (browser), the parser uses the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) API to mimic the output schema of the server parser.

## Testing

```sh
$ npm test
$ npm run lint # npm run lint:fix
$ npm run dtslint
```

## License

[MIT](https://github.com/remarkablemark/html-dom-parser/blob/master/LICENSE)
