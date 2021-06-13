// TypeScript Version: 4.3

type Nodes = Array<Comment | Element | ProcessingInstruction | Text>;

/**
 * Sets root parent to null.
 *
 * @param nodes
 * @return
 */
export function unsetRootParent(nodes: Nodes): Nodes;
