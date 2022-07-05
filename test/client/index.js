var htmlCases = require('../cases/html');
var serverParser = require('../../dist/htmlparser2').parseDOM;
var clientParser = require('../../dist/html-dom-parser');
var helpers = require('../helpers');

var assert = window.assert;

describe('client parser', function () {
  helpers.throwErrors(assert, clientParser);
  helpers.runTests(assert, clientParser, serverParser, htmlCases);
  helpers.testCaseSensitiveTags(assert, clientParser);

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
