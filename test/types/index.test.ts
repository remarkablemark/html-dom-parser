import parseDOM from 'html-dom-parser';

// $ExpectType DomElement[]
parseDOM('<div>text</div>');

// $ExpectType DomElement[]
parseDOM('<div>text</div>', { normalizeWhitespace: true });

// $ExpectType DomElement[]
parseDOM('<div>text</div>', { withDomLvl1: true });

// $ExpectType DomElement[]
parseDOM('<div>text</div>', { withStartIndices: true });

// $ExpectType DomElement[]
parseDOM('<div>text</div>', { withEndIndices: true });

// $ExpectType DomElement[]
parseDOM('');
