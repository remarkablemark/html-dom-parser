// constants
const HTML = 'html';
const HEAD = 'head';
const BODY = 'body';
const FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>

// match-all-characters in case of newlines (DOTALL)
const HEAD_TAG_REGEX = /<head[^]*>/i;
const BODY_TAG_REGEX = /<body[^]*>/i;

// falls back to `parseFromString` if `createHTMLDocument` cannot be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let parseFromDocument = (html: string, tagName?: string): Document => {
  /* istanbul ignore next */
  throw new Error(
    'This browser does not support `document.implementation.createHTMLDocument`',
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let parseFromString = (html: string, tagName?: string): Document => {
  /* istanbul ignore next */
  throw new Error(
    'This browser does not support `DOMParser.prototype.parseFromString`',
  );
};

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
    if (tagName) {
      /* istanbul ignore next */
      html = `<${tagName}>${html}</${tagName}>`;
    }

    return domParser.parseFromString(html, mimeType);
  };

  parseFromDocument = parseFromString;
}

/**
 * DOMImplementation (performance: fair).
 *
 * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
 */
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
    if (tagName) {
      const element = htmlDocument.documentElement.querySelector(tagName);

      if (element) {
        element.innerHTML = html;
      }

      return htmlDocument;
    }

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

/**
 * Parses HTML string to DOM nodes.
 *
 * @param html - HTML markup.
 * @returns - DOM nodes.
 */
export default function domparser(html: string): NodeList {
  const match = html.match(FIRST_TAG_REGEX);
  const firstTagName = match && match[1] ? match[1].toLowerCase() : '';

  switch (firstTagName) {
    case HTML: {
      const doc = parseFromString(html);

      // the created document may come with filler head/body elements,
      // so make sure to remove them if they don't actually exist
      if (!HEAD_TAG_REGEX.test(html)) {
        const element = doc.querySelector(HEAD);
        element?.parentNode?.removeChild(element);
      }

      if (!BODY_TAG_REGEX.test(html)) {
        const element = doc.querySelector(BODY);
        element?.parentNode?.removeChild(element);
      }

      return doc.querySelectorAll(HTML);
    }

    case HEAD:
    case BODY: {
      const elements = parseFromDocument(html).querySelectorAll(firstTagName);

      // if there's a sibling element, then return both elements
      if (BODY_TAG_REGEX.test(html) && HEAD_TAG_REGEX.test(html)) {
        return elements[0].parentNode!.childNodes;
      }

      return elements;
    }

    // low-level tag or text
    default: {
      if (parseFromTemplate) {
        return parseFromTemplate(html);
      }
      const element = parseFromDocument(html, BODY).querySelector(BODY);
      return element!.childNodes;
    }
  }
}
