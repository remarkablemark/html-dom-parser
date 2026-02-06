import { unsetRootParent } from '../../src/server/utilities';
import type { TestCase } from '../cases';
import { decycle } from './decycle';

export function runTests(
  actualParser: (input: string) => object[],
  expectedParser: (input: string) => object[],
  testCases: TestCase[],
) {
  testCases.forEach(function (testCase) {
    const _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      let actualOutput = actualParser(testCase.data);
      let expectedOutput = unsetRootParent(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        expectedParser(testCase.data) as any,
      );

      // use `JSON.decycle` since `assert.deepEqual` fails
      // when instance types are different in the browser
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        actualOutput = decycle(actualOutput);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expectedOutput = decycle(expectedOutput);
      }

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
}
