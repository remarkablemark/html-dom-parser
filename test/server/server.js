const { assert } = require('chai');
const htmlparser = require('htmlparser2');
const cases = require('../cases');
const { runTests, testCaseSensitiveTags, throwErrors } = require('../helpers');

describe('server parser', () => {
  // before
  const serverParser = require('../../src').default;

  // tests
  throwErrors(assert, serverParser);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.html);
  runTests(assert, serverParser, htmlparser.parseDOM, cases.svg);
  // TODO: case-sensitive (SVG) tags are not preserved in server parser
  // testCaseSensitiveTags(assert, serverParser);
});

describe('client parser in jsdom', () => {
  // before
  const jsdomify = require('jsdomify').default;
  jsdomify.create();
  const clientParser = require('../../src/client/html-to-dom').default;

  // tests
  throwErrors(assert, clientParser);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.html);
  runTests(assert, clientParser, htmlparser.parseDOM, cases.svg);
  testCaseSensitiveTags(assert, clientParser);

  // after
  jsdomify.destroy();
});
