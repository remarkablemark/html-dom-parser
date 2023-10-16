import { Comment, Element, ProcessingInstruction, Text } from 'domhandler';
/**
 * Formats DOM attributes to a hash map.
 *
 * @param attributes - List of attributes.
 * @returns - Map of attribute name to value.
 */
export declare function formatAttributes(attributes: NamedNodeMap): Record<string, string>;
/**
 * Transforms DOM nodes to `domhandler` nodes.
 *
 * @param nodes - DOM nodes.
 * @param parent - Parent node.
 * @param directive - Directive.
 * @returns - Nodes.
 */
export declare function formatDOM(nodes: NodeList, parent?: Element | null, directive?: string): (Comment | Element | ProcessingInstruction | Text)[];
//# sourceMappingURL=utilities.d.ts.map