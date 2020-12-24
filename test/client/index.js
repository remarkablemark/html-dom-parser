var assert = window.chai.assert;
var htmlCases = require('../cases/html');
var serverParser = require('../../dist/htmlparser2').parseDOM;
var clientParser = require('../../lib/client/html-to-dom');
var helpers = require('../helpers');

describe('client parser', function () {
  helpers.throwErrors(assert, clientParser);
  helpers.runTests(assert, clientParser, serverParser, htmlCases);

  describe('performance', function () {
    it('executes 1000 times in less than 50ms', function () {
      var times = 1000;
      var start = performance.now();
      while (--times) {
        clientParser('<div>test</div>');
      }
      var end = performance.now();
      var elapsed = end - start;
      assert.isBelow(elapsed, 50);
    });
  });
});
