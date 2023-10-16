import type { ChildNode, Comment, Element, ProcessingInstruction, Text } from 'domhandler';
type Node = Element | Text | Comment | ProcessingInstruction;
/**
 * Sets root parent to null.
 *
 * @param nodes - Nodes.
 * @returns - Nodes.
 */
export declare function unsetRootParent(nodes: ChildNode[]): Node[];
export {};
//# sourceMappingURL=utilities.d.ts.map