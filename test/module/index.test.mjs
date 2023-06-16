import { describe, it } from 'node:test';

import assert from 'assert';

import HTMLDOMParser from '../../index.mjs';
import HTMLDOMParserClient from '../../lib/client/html-to-dom.mjs';

describe('index', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof HTMLDOMParser, 'function');
  });

  it('parses HTML to DOM object', () => {
    assert.deepEqual(HTMLDOMParser('<br>'), [
      {
        attribs: {},
        children: [],
        endIndex: null,
        name: 'br',
        next: null,
        parent: null,
        prev: null,
        startIndex: null,
        type: 'tag'
      }
    ]);
  });
});

describe('index', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof HTMLDOMParserClient, 'function');
  });

  it('parses HTML to DOM object', () => {
    assert.deepEqual(HTMLDOMParser('<hr>'), [
      {
        attribs: {},
        children: [],
        endIndex: null,
        name: 'hr',
        next: null,
        parent: null,
        prev: null,
        startIndex: null,
        type: 'tag'
      }
    ]);
  });
});
