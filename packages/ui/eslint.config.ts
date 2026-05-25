import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { baseConfig } from '@workspace/eslint-config/base';
import { reactConfig } from '@workspace/eslint-config/react';

export default defineConfig(baseConfig, reactConfig, {
  // Disabling many rules that shadcn components do not follow
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
});
