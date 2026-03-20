import type { ChildNode } from 'domhandler';
import { type Options, parseDocument } from 'htmlparser2';

export const parseDOM = (data: string, options: Options): ChildNode[] =>
  parseDocument(data, options).children;
