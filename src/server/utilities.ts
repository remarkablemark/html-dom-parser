import type {
  ChildNode,
  Comment,
  Element,
  ProcessingInstruction,
  Text,
} from 'domhandler';

type Node = Element | Text | Comment | ProcessingInstruction;

/**
 * Sets root parent to null.
 *
 * @param nodes - Nodes.
 * @returns - Nodes.
 */
export function unsetRootParent(nodes: ChildNode[]): Node[] {
  let index = 0;
  const nodesLength = nodes.length;

  for (; index < nodesLength; index++) {
    const node = nodes[index];
    node.parent = null;
  }

  return nodes as Node[];
}
