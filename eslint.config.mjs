import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    pathGroups: [
      { pattern: '@/**', group: 'internal' },
      { pattern: '@config/**', group: 'internal' },
      { pattern: '@controllers/**', group: 'internal' },
      { pattern: '@services/**', group: 'internal' },
      { pattern: '@routes/**', group: 'internal' },
      { pattern: '@middlewares/**', group: 'internal' },
      { pattern: '@errors/**', group: 'internal' },
      { pattern: '@utils/**', group: 'internal' },
      { pattern: '@constants/**', group: 'internal' },
      { pattern: '@types/**', group: 'internal' }
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // General
      'no-console': 'off',
      'no-unused-vars': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Imports

      // 🔴 Enforce imports first (NO code before/inside imports)
      'import/first': 'error',

      // 🔴 No duplicate imports
      'import/no-duplicates': 'error',

      // 🔴 Enforce order + grouping
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
