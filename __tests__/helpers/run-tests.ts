import { decycle } from 'decycle';

import { unsetRootParent } from '../../src/server/utilities';
import type { TestCase } from '../cases';

export function runTests(
  actualParser: (input: string) => object[],
  expectedParser: (input: string) => object[],
  testCases: TestCase[],
) {
  testCases.forEach(function (testCase) {
    const _it = testCase.only ? it.only : testCase.skip ? it.skip : it;

    _it('parses ' + testCase.name, function () {
      let actualOutput: unknown = actualParser(testCase.data);
      let expectedOutput: unknown = unsetRootParent(
        expectedParser(testCase.data) as Parameters<typeof unsetRootParent>[0],
      );

      // use `JSON.decycle` since `assert.deepEqual` fails
      // when instance types are different in the browser
      if (typeof window !== 'undefined') {
        actualOutput = decycle(actualOutput);

        expectedOutput = decycle(expectedOutput);
      }

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
}
