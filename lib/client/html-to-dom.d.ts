import { DataNode, Element } from 'domhandler';

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param html - HTML markup.
 * @returns - DOM elements.
 */
export default function HTMLDOMParser(html: string): Array<DataNode | Element>;
