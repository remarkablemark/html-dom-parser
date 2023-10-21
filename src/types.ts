import type { Comment, Element, ProcessingInstruction, Text } from 'domhandler';

export { Comment, Element, ProcessingInstruction, Text };

export type DOMNode = Comment | Element | ProcessingInstruction | Text;
