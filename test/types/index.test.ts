import parse from 'html-dom-parser';

// $ExpectType (DataNode | Element)[]
parse('<div>text</div>');

// $ExpectType (DataNode | Element)[]
parse('<div>text</div>', { normalizeWhitespace: true });

// $ExpectType (DataNode | Element)[]
parse('<div>text</div>', { withStartIndices: true });

// $ExpectType (DataNode | Element)[]
parse('<div>text</div>', { withEndIndices: true });

// $ExpectType (DataNode | Element)[]
parse('');
