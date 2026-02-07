import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import vitestConfig from './vitest.config.mjs';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      globals: true,
      coverage: {
        enabled: false,
      },
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [
          { browser: 'chromium' },
          { browser: 'firefox' },
          { browser: 'webkit' },
        ],
      },
      exclude: ['__tests__/server/server.test.ts'],
    },
  }),
);
