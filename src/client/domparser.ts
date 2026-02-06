import { escapeSpecialCharacters, hasOpenTag } from './utilities';

// constants
const HTML = 'html';
const HEAD = 'head';
const BODY = 'body';
const FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>

// falls back to `parseFromString` if `createHTMLDocument` cannot be used
/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore start */
let parseFromDocument = (html: string, tagName?: string): Document => {
  throw new Error(
    'This browser does not support `document.implementation.createHTMLDocument`',
  );
};

let parseFromString = (html: string, tagName?: string): Document => {
  throw new Error(
    'This browser does not support `DOMParser.prototype.parseFromString`',
  );
};
/* istanbul ignore stop */
/* eslint-enable @typescript-eslint/no-unused-vars */

const DOMParser = typeof window === 'object' && window.DOMParser;

/**
 * DOMParser (performance: slow).
 *
 * @see https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
 */
if (typeof DOMParser === 'function') {
  const domParser = new DOMParser();
  const mimeType = 'text/html';

  /**
   * Creates an HTML document using `DOMParser.parseFromString`.
   *
   * @param html - The HTML string.
   * @param tagName - The element to render the HTML (with 'body' as fallback).
   * @returns - Document.
   */
  parseFromString = (html: string, tagName?: string): Document => {
    /* istanbul ignore start */
    if (tagName) {
      html = `<${tagName}>${html}</${tagName}>`;
    }
    /* istanbul ignore stop */

    return domParser.parseFromString(html, mimeType);
  };

  parseFromDocument = parseFromString;
}

/**
 * DOMImplementation (performance: fair).
 *
 * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (typeof document === 'object' && document.implementation) {
  const htmlDocument = document.implementation.createHTMLDocument();

  /**
   * Use HTML document created by `document.implementation.createHTMLDocument`.
   *
   * @param html - The HTML string.
   * @param tagName - The element to render the HTML (with 'body' as fallback).
   * @returns - Document
   */
  parseFromDocument = function (html: string, tagName?: string): Document {
    /* istanbul ignore start */
    if (tagName) {
      const element = htmlDocument.documentElement.querySelector(tagName);

      if (element) {
        element.innerHTML = html;
      }

      return htmlDocument;
    }
    /* istanbul ignore stop */

    htmlDocument.documentElement.innerHTML = html;
    return htmlDocument;
  };
}

/**
 * Template (performance: fast).
 *
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
 */
const template =
  typeof document === 'object' && document.createElement('template');

let parseFromTemplate: (html: string) => NodeList;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (template && template.content) {
  /**
   * Uses a template element (content fragment) to parse HTML.
   *
   * @param html - HTML string.
   * @returns - Nodes.
   */
  parseFromTemplate = (html: string): NodeList => {
    template.innerHTML = html;
    return template.content.childNodes;
  };
}

const createNodeList = /* istanbul ignore next */ () =>
  document.createDocumentFragment().childNodes;

/**
 * Parses HTML string to DOM nodes.
 *
 * @param html - HTML markup.
 * @returns - DOM nodes.
 */
export default function domparser(html: string): NodeList {
  // Escape special characters before parsing
  html = escapeSpecialCharacters(html);

  const match = FIRST_TAG_REGEX.exec(html);
  const firstTagName = match?.[1]?.toLowerCase();

  switch (firstTagName) {
    case HTML: {
      const doc = parseFromString(html);

      // the created document may come with filler head/body elements,
      // so make sure to remove them if they don't actually exist
      if (!hasOpenTag(html, HEAD)) {
        const element = doc.querySelector(HEAD);
        /* istanbul ignore next */
        element?.parentNode?.removeChild(element);
      }

      if (!hasOpenTag(html, BODY)) {
        const element = doc.querySelector(BODY);
        /* istanbul ignore next */
        element?.parentNode?.removeChild(element);
      }

      return doc.querySelectorAll(HTML);
    }

    case HEAD:
    case BODY: {
      const elements = parseFromDocument(html).querySelectorAll(firstTagName);

      // if there's a sibling element, then return both elements
      if (hasOpenTag(html, BODY) && hasOpenTag(html, HEAD)) {
        /* istanbul ignore next */
        return elements[0].parentNode?.childNodes ?? createNodeList();
      }

      return elements;
    }

    // low-level tag or text
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (parseFromTemplate) {
        return parseFromTemplate(html);
      }

      /* istanbul ignore start */
      const element = parseFromDocument(html, BODY).querySelector(BODY);

      return element?.childNodes ?? createNodeList();
      /* istanbul ignore stop */
    }
  }
}
