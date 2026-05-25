import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { baseConfig } from '@workspace/eslint-config/base';
import { reactConfig } from '@workspace/eslint-config/react';

export default defineConfig(baseConfig, reactConfig, {
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
});
