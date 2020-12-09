var assert = window.chai.assert;
var htmlCases = require('../cases/html');
var serverParser = require('../../dist/htmlparser2').parseDOM;
var clientParser = require('../../lib/html-to-dom-client');
var helpers = require('../helpers');

describe('client parser', function () {
  helpers.throwsError(clientParser, assert);
  helpers.runTests(htmlCases, clientParser, serverParser, assert);

  it.skip('performance', function () {
    var html = '<div>test</div>';
    var start = performance.now();
    var times = 1000;
    while (--times) {
      clientParser(html);
    }
    var end = performance.now();
    console.log('performance: ' + (end - start) + ' milliseconds'); // eslint-disable-line no-console
  });
});
