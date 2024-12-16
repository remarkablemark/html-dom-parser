export interface TestCase {
  name: string;
  data: string;
}

declare const TestCases: {
  html: TestCase[];
  svg: TestCase[];
};

export default TestCases;
