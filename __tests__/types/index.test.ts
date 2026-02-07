import parse from '../../lib';

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
parse('<div>text</div>');

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
parse('<div>text</div>', { xmlMode: true });

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
parse('<div>text</div>', { decodeEntities: false });

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
parse('<div>text</div>', { lowerCaseTags: true });

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
parse('');
