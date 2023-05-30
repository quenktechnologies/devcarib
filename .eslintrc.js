module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        project: [
            'apps/board/src/tsconfig.json',
            'apps/board/frontend/src/tsconfig.json',
            'apps/converse/src/tsconfig.json',
            'apps/converse/frontend/src/tsconfig.json',
            'apps/mia/src/tsconfig.json',
            'apps/mia/frontend/src/tsconfig.json',
            'apps/mia/frontend/src/tsconfig.json',
            'packages/devcarib-common/src/tsconfig.json',
            'packages/devcarib-views/src/tsconfig.json',
            'packages/devcarib-server/src/tsconfig.json',
            'packages/devcarib-widgets/src/tsconfig.json',
            'packages/devcarib-frontend/src/tsconfig.json',
        ]
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    ignorePatterns: ['.eslintrc.js', 'register.js'],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-unused-vars': 'off',
        'require-yield': 'off',
        'prefer-const': 'off'
    }
};
