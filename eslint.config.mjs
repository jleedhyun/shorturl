import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'readable-tailwind': eslintPluginReadableTailwind,
    },
    rules: {
      ...eslintPluginReadableTailwind.configs.warning.rules,
    },
  },
];

export default eslintConfig;
