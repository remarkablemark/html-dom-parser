import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      include: ['src/**'],
      thresholds: {
        100: true,
      },
    },
    exclude: ['__tests__/(esm|types)/**'],
  },
});
