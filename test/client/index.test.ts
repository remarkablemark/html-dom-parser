// @vitest-environment jsdom
import htmlToDOM from '../../src/client/html-to-dom';
import htmlCases from '../cases/html';
import {
  parseDOM,
  runTests,
  testCaseSensitiveTags,
  throwErrors,
} from '../helpers';

describe('client parser', () => {
  // @ts-expect-error argument of type is not assignable
  throwErrors(htmlToDOM);
  // @ts-expect-error argument of type is not assignable
  runTests(htmlToDOM, parseDOM, htmlCases);
  testCaseSensitiveTags(htmlToDOM);

  describe('performance', () => {
    it('executes 1000 times in less than 50ms', () => {
      let times = 1000;
      const start = performance.now();
      while (--times) {
        htmlToDOM('<div>test</div>');
      }
      const end = performance.now();
      const elapsed = end - start;
      expect(elapsed).below(50);
    });
  });
});
