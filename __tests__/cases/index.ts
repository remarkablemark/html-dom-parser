import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { minify } from 'html-minifier';

import htmlCases from './html';

export interface TestCase {
  name: string;
  data: string;
  skip?: boolean;
  only?: boolean;
}

export const html: TestCase[] = [
  ...htmlCases,
  {
    name: 'complex html',
    data: minify(read('./complex.html'), {
      collapseWhitespace: true,
    }),
  },
];

export const svg: TestCase[] = [
  {
    name: 'complex svg',
    data: read('./complex.svg'),
  },
];

function read(filepath: string) {
  return readFileSync(resolve(__dirname, filepath), 'utf8');
}
