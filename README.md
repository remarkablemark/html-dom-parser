# html-dom-parser

[![NPM](https://nodei.co/npm/html-dom-parser.png)](https://nodei.co/npm/html-dom-parser/)

[![NPM version](https://img.shields.io/npm/v/html-dom-parser.svg)](https://www.npmjs.com/package/html-dom-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-dom-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-dom-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-dom-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-dom-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-dom-parser.svg)](https://david-dm.org/remarkablemark/html-dom-parser)

HTML to DOM parser that works on both the server (Node.js) and the client (browser):

```
HTMLDOMParser(string[, options])
```

It converts an HTML string to a JavaScript object that describes the DOM tree.

#### Example:

```js
var parse = require('html-dom-parser');
parse('<div>text</div>');
```

Output:

```js
[
  {
    type: 'tag',
    name: 'div',
    attribs: {},
    children: [
      { data: 'text', type: 'text', next: null, prev: null, parent: [Circular] }
    ],
    next: null,
    prev: null,
    parent: null
  }
];
```

[Repl.it](https://repl.it/@remarkablemark/html-dom-parser) | [JSFiddle](https://jsfiddle.net/remarkablemark/ff9yg1yz/)

## Installation

[NPM](https://www.npmjs.com/package/html-dom-parser):

```sh
$ npm install html-dom-parser --save
```

[Yarn](https://yarnpkg.com/package/html-dom-parser):

```sh
$ yarn add html-dom-parser
```

[CDN](https://unpkg.com/html-dom-parser/):

```html
<script src="https://unpkg.com/html-dom-parser@latest/dist/html-dom-parser.js"></script>
<script>
  window.HTMLDOMParser(/* string */);
</script>
```

## Usage

Import the module:

```js
// CommonJS
var parse = require('html-dom-parser');

// ES Modules
import parse from 'html-dom-parser';
```

Parse markup:

```js
parse('<p class="primary" style="color: skyblue;">Hello world</p>');
```

Output:

```js
[
  {
    type: 'tag',
    name: 'p',
    attribs: { class: 'primary', style: 'color: skyblue;' },
    children: [
      {
        data: 'Hello world',
        type: 'text',
        next: null,
        prev: null,
        parent: [Circular]
      }
    ],
    next: null,
    prev: null,
    parent: null
  }
];
```

The **server parser** is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2)'s `parseDOM`.

The **client parser** mimics the server parser using the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) API.

## Testing

Run tests:

```sh
$ npm test
$ npm run dtslint
```

Run tests with coverage:

```sh
$ npm run test:coverage
```

Lint files:

```sh
$ npm run lint
$ npm run dtslint
```

Fix lint errors:

```sh
$ npm run lint:fix
```

## Release

Only collaborators with credentials can release and publish:

```sh
$ npm run release
$ git push --follow-tags && npm publish
```

## Special Thanks

- [Contributors](https://github.com/remarkablemark/html-dom-parser/graphs/contributors)
- [htmlparser2](https://github.com/fb55/htmlparser2)

## License

[MIT](https://github.com/remarkablemark/html-dom-parser/blob/master/LICENSE)
