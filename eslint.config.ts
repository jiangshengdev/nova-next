import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'nova/files-to-lint',
    files: ['**/*.{ts,tsx,vue}'],
  },

  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/build/**',
    '**/temp/**',
    'gulpfile.ts',
    'docs/.vitepress/cache/**',
    'src/shims/vue.d.ts',
  ]),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'nova/typescript-rules',
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^(h)$' },
      ],
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },

  {
    name: 'nova/vue-view-overrides',
    files: [
      'src/views/**/*.{ts,tsx,vue}',
      'src/views/demos/**/*.{ts,tsx,vue}',
      'docs/.vitepress/components/**/*.{ts,tsx,vue}',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    ...pluginVitest.configs.recommended,
    name: 'nova/vitest',
    files: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'src/**/__tests__/**/*.{ts,tsx}',
      'tests/**/*.{ts,tsx}',
    ],
  },

  {
    name: 'nova/config-files',
    files: [
      '**/*.config.{js,ts,cjs,mjs}',
      'postcss.config.js',
      'docs/.vitepress/config.js',
      'gulpfile.ts',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    name: 'nova/playwright',
    files: ['e2e/**/*.{test,spec}.{ts,tsx}', 'playwright.config.ts'],
  },

  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting
);
