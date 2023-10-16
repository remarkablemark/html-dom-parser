import { describe, it } from 'node:test';

import assert from 'assert';

import parse from '../../esm/server/html-to-dom.mjs';

describe('server', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof parse, 'function');
  });

  it('parses HTML to DOM nodes', () => {
    assert.deepEqual(parse('<hr>'), [
      {
        attribs: {},
        children: [],
        endIndex: null,
        name: 'hr',
        next: null,
        parent: null,
        prev: null,
        startIndex: null,
        type: 'tag',
      },
    ]);
  });
});
