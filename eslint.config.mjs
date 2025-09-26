import tsPlugin from '@typescript-eslint/eslint-plugin';
import { parseForESLint } from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist', '**/*.min.js', 'node_modules'],
    },
    {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            parser: {
                parseForESLint,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            'max-len': ['warn', 110],
            'max-params': ['error', 4],
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
];
