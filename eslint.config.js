import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,svg}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            semi: 'error',
            'prefer-const': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
