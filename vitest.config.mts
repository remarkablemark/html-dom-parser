import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      include: ['src/**'],
      thresholds: {
        branches: 90,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    include: ['**/__tests__/**/*.test.?(m)[jt]s'],
    exclude: ['**/__tests__/(esm|types)/**'],
    reporters:
      process.env.CI === 'true' ? ['default', 'github-actions'] : ['default'],
  },
});
