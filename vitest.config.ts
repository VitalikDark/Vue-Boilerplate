import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
      },
      cache: false,
      coverage: { provider: 'istanbul' },
      environment: 'jsdom',
      testTimeout: 300000,
      typecheck: { tsconfig: 'tsconfig.vitest.json' },
    },
  }),
);
