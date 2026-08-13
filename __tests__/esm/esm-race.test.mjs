/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/require-await */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

const require = createRequire(import.meta.url);

/**
 * Tests that CJS require does not throw ERR_REQUIRE_ESM_RACE_CONDITION
 * when concurrent with ESM import for Node.js >=24.
 *
 * @see https://github.com/remarkablemark/html-dom-parser/issues/1551
 */
describe('CJS require concurrent with ESM import', () => {
  it('does not throw ERR_REQUIRE_ESM_RACE_CONDITION', async () => {
    const results = await Promise.allSettled([
      import('domhandler'),
      (async () => require('html-dom-parser'))(),
    ]);

    const failures = results.filter((result) => result.status === 'rejected');

    assert.strictEqual(
      failures.length,
      0,
      failures.map((failure) => failure.reason.message).join('\n'),
    );
  });
});
