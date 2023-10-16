import { expect } from 'chai';
import { Element } from 'domhandler';

import parse from '../../src';

describe('server parser', () => {
  it('exports default function', () => {
    expect(parse).to.be.instanceOf(Function);
  });

  it('parses HTML to DOM nodes', () => {
    const nodes = parse('<br>');
    expect(nodes).to.have.length(1);
    const node = nodes[0] as Element;
    expect(node).to.be.instanceOf(Element);
    expect(node.name).to.equal('br');
    expect(node.type).to.equal('tag');
    expect(node.attribs).to.deep.equal({});
    expect(node.children).to.deep.equal([]);
    expect(node.startIndex).to.deep.equal(null);
    expect(node.endIndex).to.deep.equal(null);
    expect(node.next).to.deep.equal(null);
    expect(node.parent).to.deep.equal(null);
    expect(node.prev).to.deep.equal(null);
  });
});
