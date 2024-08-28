import { Comment, Element, ProcessingInstruction, Text } from 'domhandler';

import type { DOMNode } from '../types';
import { CASE_SENSITIVE_TAG_NAMES_MAP } from './constants';

/**
 * Gets case-sensitive tag name.
 *
 * @param tagName - Tag name in lowercase.
 * @returns - Case-sensitive tag name.
 */
function getCaseSensitiveTagName(tagName: string): string | undefined {
  return CASE_SENSITIVE_TAG_NAMES_MAP[tagName];
}

/**
 * Formats DOM attributes to a hash map.
 *
 * @param attributes - List of attributes.
 * @returns - Map of attribute name to value.
 */
export function formatAttributes(attributes: NamedNodeMap) {
  const map: Record<string, string> = {};
  let index = 0;
  const attributesLength = attributes.length;

  // `NamedNodeMap` is array-like
  for (; index < attributesLength; index++) {
    const attribute = attributes[index];
    map[attribute.name] = attribute.value;
  }

  return map;
}

/**
 * Corrects the tag name if it is case-sensitive (SVG).
 * Otherwise, returns the lowercase tag name (HTML).
 *
 * @param tagName - Lowercase tag name.
 * @returns - Formatted tag name.
 */
function formatTagName(tagName: string): string {
  tagName = tagName.toLowerCase();
  const caseSensitiveTagName = getCaseSensitiveTagName(tagName);

  if (caseSensitiveTagName) {
    return caseSensitiveTagName;
  }

  return tagName;
}

/**
 * Transforms DOM nodes to `domhandler` nodes.
 *
 * @param nodes - DOM nodes.
 * @param parent - Parent node.
 * @param directive - Directive.
 * @returns - Nodes.
 */
export function formatDOM(
  nodes: NodeList,
  parent: DOMNode | null = null,
  directive?: string,
): DOMNode[] {
  const domNodes = [];
  let current;
  let index = 0;
  const nodesLength = nodes.length;

  for (; index < nodesLength; index++) {
    const node = nodes[index];

    // set the node data given the type
    switch (node.nodeType) {
      case 1: {
        const tagName = formatTagName(node.nodeName);

        // script, style, or tag
        current = new Element(
          tagName,
          formatAttributes((node as HTMLElement).attributes),
        );

        current.children = formatDOM(
          // template children are on content
          tagName === 'template'
            ? (node as HTMLTemplateElement).content.childNodes
            : node.childNodes,
          current,
        );

        break;
      }

      case 3:
        current = new Text(node.nodeValue!);
        break;

      case 8:
        current = new Comment(node.nodeValue!);
        break;

      default:
        continue;
    }

    // set previous node next
    const prev = domNodes[index - 1] || null;
    if (prev) {
      prev.next = current;
    }

    // set properties for current node
    current.parent = parent as Element;
    current.prev = prev;
    current.next = null;

    domNodes.push(current);
  }

  if (directive) {
    current = new ProcessingInstruction(
      directive.substring(0, directive.indexOf(' ')).toLowerCase(),
      directive,
    );

    current.next = domNodes[0] || null;
    current.parent = parent as Element;
    domNodes.unshift(current);

    if (domNodes[1]) {
      domNodes[1].prev = domNodes[0];
    }
  }

  return domNodes;
}
