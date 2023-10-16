import { describe, it } from 'node:test';

import assert from 'assert';

import parse from '../../esm/index.mjs';

describe('index', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof parse, 'function');
  });

  it('parses HTML to DOM nodes', () => {
    assert.deepEqual(parse('<br>'), [
      {
        attribs: {},
        children: [],
        endIndex: null,
        name: 'br',
        next: null,
        parent: null,
        prev: null,
        startIndex: null,
        type: 'tag',
      },
    ]);
  });
});
