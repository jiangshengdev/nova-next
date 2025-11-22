import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig, configDefaults } from 'vitest/config';
import type { ConfigEnv } from 'vite';
import viteConfig from './vite.config';

const baseConfig = await viteConfig({
  command: 'serve',
  mode: 'test',
} satisfies ConfigEnv);

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      exclude: [...configDefaults.exclude, 'e2e/**'],
      setupFiles: ['tests/setup.ts'],
      globals: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
      },
      server: {
        deps: {
          inline: ['vite', '@vitejs/plugin-vue', '@vitejs/plugin-vue-jsx'],
        },
      },
    },
  })
);
