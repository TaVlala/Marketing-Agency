import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Auto-generated Payload migration files — suppress unused-vars
    files: ['src/migrations/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // layout.tsx loads fonts via CSS @import, not next/font — suppress false positive
    files: ['src/app/layout.tsx'],
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
