import parse from 'html-dom-parser';

// $ExpectType (Text | Comment | ProcessingInstruction | Element)[]
parse('<div>text</div>');

// $ExpectType (Text | Comment | ProcessingInstruction | Element)[]
parse('<div>text</div>', { normalizeWhitespace: true });

// $ExpectType (Text | Comment | ProcessingInstruction | Element)[]
parse('<div>text</div>', { withStartIndices: true });

// $ExpectType (Text | Comment | ProcessingInstruction | Element)[]
parse('<div>text</div>', { withEndIndices: true });

// $ExpectType (Text | Comment | ProcessingInstruction | Element)[]
parse('');
