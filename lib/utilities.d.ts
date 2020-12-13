// TypeScript Version: 4.1

import { Comment, Element, ProcessingInstruction, Text } from 'domhandler';

/**
 * Formats DOM attributes to a hash map.
 *
 * @param  attributes - List of attributes.
 * @return            - Map of attribute name to value.
 */
export function formatAttributes(
  attributes: NamedNodeMap
): { [name: string]: string };

/**
 * Formats the browser DOM nodes to mimic the output of `htmlparser2.parseDOM()`.
 *
 * @param  nodes      - DOM nodes.
 * @param  parentNode - Formatted parent node.
 * @param  directive  - Directive.
 * @return            - DOM elements.
 */
export function formatDOM(
  nodes: NodeList,
  parentNode?: Element,
  directive?: string
): Array<Comment | Element | ProcessingInstruction | Text>;

/**
 * Detects if browser is Internet Explorer.
 *
 * @param  version - IE version to detect.
 * @return         - Whether IE or the version is detected.
 */
export function isIE(version?: number): boolean;
