import { assert } from 'chai';
import * as htmlparser from 'htmlparser2';
// @ts-ignore
import jsdomify from 'jsdomify';

import serverParser from '../../src';
import cases from '../cases';
import { runTests, testCaseSensitiveTags, throwErrors } from '../helpers';

describe('server parser', () => {
  throwErrors(assert, serverParser);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.html);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.svg);

  // TODO: case-sensitive (SVG) tags are not preserved in server parser
  // testCaseSensitiveTags(assert, serverParser);
});

describe('client parser in jsdom', () => {
  jsdomify.create();
  const clientParser = require('../../src/client/html-to-dom').default;

  throwErrors(assert, clientParser);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.html);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.svg);
  testCaseSensitiveTags(assert, clientParser);

  after(() => {
    jsdomify.destroy();
  });
});
