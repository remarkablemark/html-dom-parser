# html-dom-parser

[![NPM](https://nodei.co/npm/html-dom-parser.png)](https://nodei.co/npm/html-dom-parser/)

[![NPM version](https://img.shields.io/npm/v/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)
[![NPM bundle size](https://img.shields.io/bundlephobia/minzip/html-dom-parser)](https://bundlephobia.com/package/html-dom-parser)
[![build](https://github.com/remarkablemark/html-dom-parser/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/html-dom-parser/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/html-dom-parser/branch/master/graph/badge.svg?token=6RRL0875TY)](https://codecov.io/gh/remarkablemark/html-dom-parser)
[![NPM downloads](https://img.shields.io/npm/dm/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)

HTML to DOM parser that works on both the server (Node.js) and the client (browser):

```
HTMLDOMParser(string[, options])
```

The parser converts an HTML string to a JavaScript object that describes the DOM tree.

For example:

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

[JSFiddle](https://jsfiddle.net/remarkablemark/ff9yg1yz/) | [Examples](https://github.com/remarkablemark/html-dom-parser/tree/master/examples)

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

Because the server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2), which implements [domhandler](https://github.com/fb55/domhandler), you can alter how the server parser parses your code with the options:

```ts
export interface ParserOptions {
  /**
   * Indicates whether special tags (`<script>`, `<style>`, and `<title>`) should get special treatment
   * and if "empty" tags (eg. `<br>`) can have children.  If `false`, the content of special tags
   * will be text only. For feeds and other XML content (documents that don't consist of HTML),
   * set this to `true`.
   *
   * @default false
   */
  xmlMode?: boolean;

  /**
   * Decode entities within the document.
   *
   * @default true
   */
  decodeEntities?: boolean;

  /**
   * If set to true, all tags will be lowercased.
   *
   * @default !xmlMode
   */
  lowerCaseTags?: boolean;

  /**
   * If set to `true`, all attribute names will be lowercased. This has noticeable impact on speed.
   *
   * @default !xmlMode
   */
  lowerCaseAttributeNames?: boolean;

  /**
   * If set to true, CDATA sections will be recognized as text even if the xmlMode option is not enabled.
   * NOTE: If xmlMode is set to `true` then CDATA sections will always be recognized as text.
   *
   * @default xmlMode
   */
  recognizeCDATA?: boolean;

  /**
   * If set to `true`, self-closing tags will trigger the onclosetag event even if xmlMode is not set to `true`.
   * NOTE: If xmlMode is set to `true` then self-closing tags will always be recognized.
   *
   * @default xmlMode
   */
  recognizeSelfClosing?: boolean;

  /**
   * Allows the default tokenizer to be overwritten.
   */
  Tokenizer?: typeof Tokenizer;
}
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
