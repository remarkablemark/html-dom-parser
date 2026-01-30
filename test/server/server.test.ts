import { assert } from 'chai';
import * as htmlparser from 'htmlparser2';
import jsdomify from 'jsdomify';

import serverParser from '../../src';
import cases from '../cases';
import { runTests, testCaseSensitiveTags, throwErrors } from '../helpers';

const parseDOM = (data: string, options: htmlparser.Options) =>
  htmlparser.parseDocument(data, options).children;

describe('server parser', () => {
  throwErrors(assert, serverParser);

  runTests(assert, serverParser, parseDOM, cases.html);
  runTests(assert, serverParser, parseDOM, cases.svg);

  // TODO: case-sensitive (SVG) tags are not preserved in server parser
  // testCaseSensitiveTags(assert, serverParser);
});

describe('client parser in jsdom', () => {
  jsdomify.create();

  const clientParser =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    require('../../src/client/html-to-dom').default as unknown;

  throwErrors(assert, clientParser);
  runTests(assert, clientParser, parseDOM, cases.html);
  runTests(assert, clientParser, parseDOM, cases.svg);
  testCaseSensitiveTags(assert, clientParser);

  after(() => {
    jsdomify.destroy();
  });
});
