import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...next,
  ...compat.config({
    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  }),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    // Playground export from the ANC + pink noise prototype
    ignores: ['anc-and-pink-noise-full-page/**'],
  },
];

export default eslintConfig;
