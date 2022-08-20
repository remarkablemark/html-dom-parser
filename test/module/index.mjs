import assert from 'assert';
import HTMLDOMParser from '../../index.mjs';
import HTMLDOMParserClient from '../../lib/client/html-to-dom.mjs';

assert.strictEqual(typeof HTMLDOMParser, 'function');
assert.strictEqual(typeof HTMLDOMParserClient, 'function');
