import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { baseConfig } from '@workspace/eslint-config/base';

export default defineConfig([
  baseConfig,
  {
    languageOptions: { globals: globals.node },
  },
  {
    ignores: ['eslint.config.ts', 'node_modules', 'dist'],
  },
  {
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/consistent-type-imports': ['error'],
    },
  },
  {
    files: ['**/*.model.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/server.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
]);
