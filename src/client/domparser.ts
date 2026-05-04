import { escapeSpecialCharacters, hasOpenTag } from './utilities';
import type { TrustedTypePolicy } from '../types';

// constants
const HTML = 'html';
const HEAD = 'head';
const BODY = 'body';
const FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>

function getHTMLForInnerHTML(
  html: string,
  trustedTypePolicy?: TrustedTypePolicy,
) {
  return trustedTypePolicy ? trustedTypePolicy.createHTML(html) : html;
}

// falls back to `parseFromString` if `createHTMLDocument` cannot be used
/* eslint-disable @typescript-eslint/no-unused-vars */
/* v8 ignore start */
let parseFromDocument = (
  html: string,
  tagName?: string,
  trustedTypePolicy?: TrustedTypePolicy,
): Document => {
  throw new Error(
    'This browser does not support `document.implementation.createHTMLDocument`',
  );
};

let parseFromString = (
  html: string,
  tagName?: string,
  trustedTypePolicy?: TrustedTypePolicy,
): Document => {
  void trustedTypePolicy;
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
  parseFromString = (
    html: string,
    tagName?: string,
    trustedTypePolicy?: TrustedTypePolicy,
  ): Document => {
    void trustedTypePolicy;
    if (tagName) {
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
  parseFromDocument = function (
    html: string,
    tagName?: string,
    trustedTypePolicy?: TrustedTypePolicy,
  ): Document {
    if (tagName) {
      const element = htmlDocument.documentElement.querySelector(tagName);

      if (element) {
        element.innerHTML = getHTMLForInnerHTML(
          html,
          trustedTypePolicy,
        ) as string;
      }

      return htmlDocument;
    }

    htmlDocument.documentElement.innerHTML = getHTMLForInnerHTML(
      html,
      trustedTypePolicy,
    ) as string;
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

let parseFromTemplate: (
  html: string,
  trustedTypePolicy?: TrustedTypePolicy,
) => NodeList;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (template && template.content) {
  /**
   * Uses a template element (content fragment) to parse HTML.
   *
   * @param html - HTML string.
   * @returns - Nodes.
   */
  parseFromTemplate = (
    html: string,
    trustedTypePolicy?: TrustedTypePolicy,
  ): NodeList => {
    template.innerHTML = getHTMLForInnerHTML(
      html,
      trustedTypePolicy,
    ) as string;
    return template.content.childNodes;
  };
}

const createNodeList = () => document.createDocumentFragment().childNodes;
/* v8 ignore stop */

/**
 * Parses HTML string to DOM nodes.
 *
 * @param html - HTML markup.
 * @param trustedTypePolicy - Trusted Types policy.
 * @returns - DOM nodes.
 */
export default function domparser(
  html: string,
  trustedTypePolicy?: TrustedTypePolicy,
): NodeList {
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
        element?.parentNode?.removeChild(element);
      }

      if (!hasOpenTag(html, BODY)) {
        const element = doc.querySelector(BODY);
        element?.parentNode?.removeChild(element);
      }

      return doc.querySelectorAll(HTML);
    }

    case HEAD:
    case BODY: {
      const elements = parseFromDocument(
        html,
        undefined,
        trustedTypePolicy,
      ).querySelectorAll(firstTagName);

      // if there's a sibling element, then return both elements
      /* v8 ignore next */
      if (hasOpenTag(html, BODY) && hasOpenTag(html, HEAD)) {
        return elements[0].parentNode?.childNodes ?? createNodeList();
      }

      return elements;
    }

    // low-level tag or text
    /* v8 ignore start */
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (parseFromTemplate) {
        return parseFromTemplate(html, trustedTypePolicy);
      }

      const element = parseFromDocument(
        html,
        BODY,
        trustedTypePolicy,
      ).querySelector(BODY);

      return element?.childNodes ?? createNodeList();
    }
    /* v8 ignore stop */
  }
}
