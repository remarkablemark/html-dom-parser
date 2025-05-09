# html-dom-parser

[![NPM](https://nodei.co/npm/html-dom-parser.png)](https://nodei.co/npm/html-dom-parser/)

[![NPM version](https://badgen.net/npm/v/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)
[![Bundlephobia minified + gzip](https://badgen.net/bundlephobia/minzip/html-dom-parser)](https://bundlephobia.com/package/html-dom-parser)
[![build](https://github.com/remarkablemark/html-dom-parser/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/html-dom-parser/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/html-dom-parser/branch/master/graph/badge.svg?token=6RRL0875TY)](https://codecov.io/gh/remarkablemark/html-dom-parser)
[![NPM downloads](https://badgen.net/npm/dm/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)

HTML to DOM parser that works on both the server (Node.js) and the client (browser):

```
HTMLDOMParser(string[, options])
```

The parser converts an HTML string to a JavaScript object that describes the DOM tree.

#### Example

```js
import parse from 'html-dom-parser';

parse('<p>Hello, World!</p>');
```

<details>
<summary>Output</summary>
<p>

```js
[
  Element {
    type: 'tag',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    children: [
      Text {
        type: 'text',
        parent: [Circular],
        prev: null,
        next: null,
        startIndex: null,
        endIndex: null,
        data: 'Hello, World!'
      }
    ],
    name: 'p',
    attribs: {}
  }
]
```

</p>
</details>

[Replit](https://replit.com/@remarkablemark/html-dom-parser) | [JSFiddle](https://jsfiddle.net/remarkablemark/ff9yg1yz/) | [Examples](https://github.com/remarkablemark/html-dom-parser/tree/master/examples)

## Install

[NPM](https://www.npmjs.com/package/html-dom-parser):

```sh
npm install html-dom-parser --save
```

[Yarn](https://yarnpkg.com/package/html-dom-parser):

```sh
yarn add html-dom-parser
```

[CDN](https://unpkg.com/html-dom-parser/):

```html
<script src="https://unpkg.com/html-dom-parser@latest/dist/html-dom-parser.min.js"></script>
<script>
  window.HTMLDOMParser(/* string */);
</script>
```

## Usage

Import with ES Modules:

```js
import parse from 'html-dom-parser';
```

Require with CommonJS:

```js
const parse = require('html-dom-parser').default;
```

Parse empty string:

```js
parse('');
```

Output:

<!-- prettier-ignore -->
```js
[]
```

Parse string:

```js
parse('Hello, World!');
```

<details>
<summary>Output</summary>
<p>

```js
[
  Text {
    type: 'text',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    data: 'Hello, World!'
  }
]
```

</p>
</details>

Parse element with attributes:

```js
parse('<p class="foo" style="color: #bada55">Hello, <em>world</em>!</p>');
```

<details>
<summary>Output</summary>
<p>

```js
[
  Element {
    type: 'tag',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    children: [ [Text], [Element], [Text] ],
    name: 'p',
    attribs: { class: 'foo', style: 'color: #bada55' }
  }
]
```

</p>
</details>

The server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2) `parseDOM` but with the root parent node excluded. The next section shows the available options you can use with the server parse.

The client parser mimics the server parser by using the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) API to parse the HTML string.

## Options (server only)

Because the server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2), which implements [domhandler](https://github.com/fb55/domhandler), you can alter how the server parser parses your code with the following options:

```js
/**
 * These are the default options being used if you omit the optional options object.
 * htmlparser2 will use the same options object for its domhandler so the options
 * should be combined into a single object like so:
 */
const options = {
  /**
   * Options for the domhandler class.
   * https://github.com/fb55/domhandler/blob/master/src/index.ts#L16
   */
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false,
  /**
   * Options for the htmlparser2 class.
   * https://github.com/fb55/htmlparser2/blob/master/src/Parser.ts#L104
   */
  xmlMode: false, // Will overwrite what is used for the domhandler, otherwise inherited.
  decodeEntities: true,
  lowerCaseTags: true, // !xmlMode by default
  lowerCaseAttributeNames: true, // !xmlMode by default
  recognizeCDATA: false, // xmlMode by default
  recognizeSelfClosing: false, // xmlMode by default
  Tokenizer: Tokenizer,
};
```

If you're parsing SVG, you can set `lowerCaseTags` to `true` without having to enable `xmlMode`. This will return all tag names in camelCase and not the HTML standard of lowercase.

> [!NOTE]
> If you're parsing code client-side (in-browser), you cannot control the parsing options. Client-side parsing automatically handles returning some HTML tags in camelCase, such as specific SVG elements, but returns all other tags lowercased according to the HTML standard.

## Migration

### v5

Migrated to TypeScript. CommonJS imports require the `.default` key:

```js
const parse = require('html-dom-parser').default;
```

### v4

Upgraded [htmlparser2](https://github.com/fb55/htmlparser2) to v9.

### v3

Upgraded [domhandler](https://github.com/fb55/domhandler) to v5. [Parser options](https://github.com/fb55/htmlparser2/wiki/Parser-options) like `normalizeWhitespace` have been removed.

### v2

Removed Internet Explorer (IE11) support.

### v1

Upgraded `domhandler` to v4 and `htmlparser2` to v6.

## Release

Release and publish are automated by [Release Please](https://github.com/googleapis/release-please).

## Special Thanks

- [Contributors](https://github.com/remarkablemark/html-dom-parser/graphs/contributors)
- [htmlparser2](https://github.com/fb55/htmlparser2)
- [domhandler](https://github.com/fb55/domhandler)

## License

[MIT](https://github.com/remarkablemark/html-dom-parser/blob/master/LICENSE)
