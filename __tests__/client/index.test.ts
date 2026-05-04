// @vitest-environment jsdom
import htmlToDOM from '../../src/client/html-to-dom';
import htmlCases from '../cases/html';
import {
  isBrowser,
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

  it('uses policy before setting innerHTML', () => {
    const trustedTypePolicy = {
      createHTML: vi.fn((input: string) => input),
    };

    htmlToDOM('<div>test</div>', { trustedTypePolicy });

    expect(trustedTypePolicy.createHTML).toHaveBeenCalledOnce();
    expect(trustedTypePolicy.createHTML).toHaveBeenCalledWith(
      '<div>test</div>',
    );
  });

  if (isBrowser()) {
    describe('trustedTypePolicy', () => {
      it('uses policy before setting template innerHTML', () => {
        const trustedTypePolicy = {
          createHTML: vi.fn((input: string) => input),
        };

        htmlToDOM('<div>test</div>', { trustedTypePolicy });

        expect(trustedTypePolicy.createHTML).toHaveBeenCalledOnce();
        expect(trustedTypePolicy.createHTML).toHaveBeenCalledWith(
          '<div>test</div>',
        );
      });

      it('uses policy before setting document innerHTML', () => {
        const trustedTypePolicy = {
          createHTML: vi.fn((input: string) => input),
        };

        htmlToDOM('<body><div>test</div></body>', { trustedTypePolicy });

        expect(trustedTypePolicy.createHTML).toHaveBeenCalledOnce();
        expect(trustedTypePolicy.createHTML).toHaveBeenCalledWith(
          '<body><div>test</div></body>',
        );
      });
    });

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
  }
});
