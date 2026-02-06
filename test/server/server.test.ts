import parse from '../../src';
import { html, svg } from '../cases';
import { parseDOM, runTests, throwErrors } from '../helpers';

describe('server parser', () => {
  // @ts-expect-error argument of type is not assignable
  throwErrors(parse);
  // @ts-expect-error argument of type is not assignable
  runTests(parse, parseDOM, html);
  // @ts-expect-error argument of type is not assignable
  runTests(parse, parseDOM, svg);

  // TODO: case-sensitive (SVG) tags are not preserved in server parser
  // helpers.testCaseSensitiveTags(assert, parse);
});
