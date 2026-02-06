import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      'dist/**',
      'esm/**',
      'lib/**',
      'scripts/**',
      'coverage/**',
      'test/esm/**',
      'test/types/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**'],
      thresholds: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    },
    reporters:
      process.env.CI === 'true' ? ['default', 'github-actions'] : ['default'],
  },
});
