const htmlCases = require('../cases/html');
const serverParser = require('../../dist/htmlparser2').parseDOM;
const clientParser = require('../../dist/html-dom-parser');
const helpers = require('../helpers');

const assert = window.assert;

describe('client parser', () => {
  helpers.throwErrors(assert, clientParser);
  helpers.runTests(assert, clientParser, serverParser, htmlCases);
  helpers.testCaseSensitiveTags(assert, clientParser);

  describe('performance', () => {
    it('executes 1000 times in less than 50ms', () => {
      let times = 1000;
      const start = performance.now();
      while (--times) {
        clientParser('<div>test</div>');
      }
      const end = performance.now();
      const elapsed = end - start;
      assert.isBelow(elapsed, 50);
    });
  });
});
