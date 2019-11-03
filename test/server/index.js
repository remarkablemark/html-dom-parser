const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');

let parser;
let ParserSpy;
let parserEndSpy;
let DomHandlerSpy;

const html = '<html>';
const dom = [
  {
    type: 'tag',
    name: 'html',
    attribs: {},
    children: [],
    next: null,
    prev: null,
    parent: null
  }
];

function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}

describe('server parser', () => {
  // before
  parserEndSpy = sinon.spy();
  ParserSpy = sinon.spy(function() {
    this.end = parserEndSpy;
  });
  DomHandlerSpy = sinon.spy(function() {
    this.dom = dom;
  });

  // tests
  mock('htmlparser2/lib/Parser', ParserSpy);
  mock('domhandler', DomHandlerSpy);
  parser = require('../..');

  it('calls `domhandler` and `htmlparser2/lib/Parser`', () => {
    parser(html);
    expect(DomHandlerSpy.called).to.equal(true);
    expect(ParserSpy.called).to.equal(true);
    expect(parserEndSpy.called).to.equal(true);
  });

  it.skip('uses the cached instance of `domhandler` if options is undefined', () => {
    expect(DomHandlerSpy.callCount).to.equal(1);
    expect(ParserSpy.callCount).to.equal(1);
    parser(html);
    expect(DomHandlerSpy.callCount).to.equal(1);
    expect(ParserSpy.callCount).to.equal(2);
  });

  it('passes options to `domhandler` and arguments to `htmlparser2/lib/Parser`', () => {
    const options = { decodeEntities: true };
    parser(html, options);
    expect(DomHandlerSpy.calledWith(options)).to.equal(true);
    expect(ParserSpy.calledWith(DomHandlerSpy, options));
  });

  it('passes html to `htmlparser2/lib/Parser` end', () => {
    parser(html);
    expect(parserEndSpy.calledWith(html)).to.equal(true);
  });

  it('returns `domhandler` dom', () => {
    expect(parser(html)).to.equal(DomHandlerSpy.lastCall.returnValue.dom);
  });

  // after
  mock.stopAll();
  clearRequireCache();
});
