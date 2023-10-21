import type { ChildNode } from 'domhandler';

import type { DOMNode } from '../types';

/**
 * Sets root parent to null.
 *
 * @param nodes - Nodes.
 * @returns - Nodes.
 */
export function unsetRootParent(nodes: ChildNode[]): DOMNode[] {
  let index = 0;
  const nodesLength = nodes.length;

  for (; index < nodesLength; index++) {
    const node = nodes[index];
    node.parent = null;
  }

  return nodes as DOMNode[];
}
