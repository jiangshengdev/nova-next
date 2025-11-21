module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { varsIgnorePattern: '^(h|vueJsxCompat)$' },
        ],
        '@typescript-eslint/no-unsafe-function-type': 'warn',
        '@typescript-eslint/no-unused-expressions': 'warn',
      },
    },
    {
      files: ['src/views/**/*.tsx', 'src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
