import { describe, it } from 'node:test';

import assert from 'assert';

import parse from '../../esm/client/html-to-dom.mjs';

describe('client', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof parse, 'function');
  });

  it('throws error on Node.js', () => {
    assert.throws(
      () => {
        parse('<br>');
      },
      {
        name: 'Error',
        message:
          'This browser does not support `document.implementation.createHTMLDocument`',
      },
    );
  });
});
