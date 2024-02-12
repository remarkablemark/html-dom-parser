import { assert } from 'chai';
import * as htmlparser from 'htmlparser2';
// @ts-ignore
import jsdomifyModule from 'jsdomify';

import serverParser from '../../src';
// @ts-ignore
import cases from '../cases';
// @ts-ignore
import { runTests, testCaseSensitiveTags, throwErrors } from '../helpers';

const jsdomify = ('default' in jsdomifyModule ? jsdomifyModule.default : jsdomifyModule) as typeof jsdomifyModule;

describe('server parser', () => {
  throwErrors(assert, serverParser);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.html);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.svg);

  // TODO: case-sensitive (SVG) tags are not preserved in server parser
  // testCaseSensitiveTags(assert, serverParser);
});

describe('client parser in jsdom', async () => {
  jsdomify.create();
  const { default: clientParser } = await import('../../src/client/html-to-dom.js');

  throwErrors(assert, clientParser);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.html);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.svg);
  testCaseSensitiveTags(assert, clientParser);

  after(() => {
    jsdomify.destroy();
  });
});
