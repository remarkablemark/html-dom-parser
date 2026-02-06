import { type Options, parseDocument } from 'htmlparser2';

export const parseDOM = (data: string, options: Options) =>
  parseDocument(data, options).children;
