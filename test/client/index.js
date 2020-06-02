var assert = window.chai.assert;
var htmlCases = require('../cases/html');
var htmlparser = require('../../dist/htmlparser2');
var parser = require('../../lib/html-to-dom-client');
var helpers = require('../helpers');

describe('client parser', function () {
  helpers.throwsError(parser, assert);
  helpers.runTests(htmlCases, parser, htmlparser.parseDOM, assert);

  it.skip('performance', function () {
    var html = '<div>test</div>';
    var start = performance.now();
    var times = 1000;
    while (--times) {
      parser(html);
    }
    var end = performance.now();
    console.log('performance: ' + (end - start) + ' milliseconds'); // eslint-disable-line no-console
  });
});
