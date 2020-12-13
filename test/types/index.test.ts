import parse from 'html-dom-parser';

// $ExpectType (Comment | Element | ProcessingInstruction | Text)[]
parse('<div>text</div>');

// $ExpectType (Comment | Element | ProcessingInstruction | Text)[]
parse('<div>text</div>', { normalizeWhitespace: true });

// $ExpectType (Comment | Element | ProcessingInstruction | Text)[]
parse('<div>text</div>', { withStartIndices: true });

// $ExpectType (Comment | Element | ProcessingInstruction | Text)[]
parse('<div>text</div>', { withEndIndices: true });

// $ExpectType (Comment | Element | ProcessingInstruction | Text)[]
parse('');
