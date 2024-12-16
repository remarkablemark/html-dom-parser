import type { TestCase } from '../cases';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Parser = any;

export function runTests(
  assert: Chai.AssertStatic,
  actualParser: Parser,
  expectedParser: Parser,
  testCases: TestCase[],
): void;

export function testCaseSensitiveTags(
  assert: Chai.AssertStatic,
  parser: Parser,
): void;

export function throwErrors(
  assert: Chai.AssertStatic,
  expectedParser: Parser,
): void;
