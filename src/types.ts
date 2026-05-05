import type { DomHandlerOptions } from 'domhandler';
import type { Comment, Element, ProcessingInstruction, Text } from 'domhandler';
import type { ParserOptions } from 'htmlparser2';

export type { Comment, Element, ProcessingInstruction, Text };

export type DOMNode = Comment | Element | ProcessingInstruction | Text;

export interface TrustedTypePolicyLike {
  createHTML(input: string): { toString(): string };
}

export type HTMLDOMParserOptions = ParserOptions &
  DomHandlerOptions & {
    trustedTypePolicy?: TrustedTypePolicyLike;
  };
