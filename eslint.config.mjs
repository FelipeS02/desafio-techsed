import { FlatCompat } from '@eslint/eslintrc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^@next'],

            ['^@?\\w'], // External packages

            ['^@/components/ui', '^@/components', '^@/public'],

            ['^@/lib', '^@/hooks', '^@/models'],

            ['^@/'], // Other alias imports

            ['^.+\\.css$'], // Styles

            ['^\\.'], // Relative imports

            ['^\\u0000'], // Side effect imports
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
