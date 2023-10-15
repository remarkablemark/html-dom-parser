type Nodes = (Comment | Element | ProcessingInstruction | Text)[];

/**
 * Sets root parent to null.
 *
 * @param nodes - Nodes.
 * @returns - Nodes.
 */
export function unsetRootParent(nodes: Nodes): Nodes;
