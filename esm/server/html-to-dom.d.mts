import type { ParserOptions } from 'htmlparser2';
import type { DOMNode } from '../types.js';

export default function HTMLDOMParser(
  html: string,
  options?: ParserOptions,
): DOMNode[];
