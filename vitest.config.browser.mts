import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import vitestConfig from './vitest.config.mjs';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    optimizeDeps: {
      include: [
        'domhandler',
        'htmlparser2',
        'domelementtype',
        'domutils',
        'entities',
      ],
    },
    test: {
      globals: true,
      coverage: {
        enabled: false,
      },
      env: {
        VITEST_BROWSER_IFRAME_TIMEOUT: '120000',
      },
      fileParallelism: false,
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
