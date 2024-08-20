// @ts-ignore
import * as pluginImport from 'eslint-plugin-i';
import type { Linter } from 'eslint';

const config: Linter.Config = {
    plugins: {
        import: pluginImport,
    },
    rules: {
        'arrow-parens': [1, 'always'],
        'arrow-spacing': [
            1,
            {
                before: true,
                after: true,
            },
        ],
        'comma-dangle': [1, 'always-multiline'],
        curly: [1],
        'dot-location': [1, 'property'],
        'dot-notation': [1],
        'eol-last': [1, 'always'],
        eqeqeq: [1],
        indent: [
            1,
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: false,
                offsetTernaryExpressions: false,
                ignoreComments: false,
            },
        ],
        'key-spacing': [1],
        'no-alert': [1],
        'no-cond-assign': [1],
        'no-console': [1],
        'no-debugger': [1],
        'no-duplicate-imports': [1],
        'no-else-return': [
            1,
            {
                allowElseIf: false,
            },
        ],
        'no-empty': [1],
        'no-empty-function': [1],
        'no-eval': [2],
        'no-floating-decimal': [1],
        'no-implicit-coercion': [
            1,
            {
                boolean: true,
                number: true,
                string: true,
                disallowTemplateShorthand: false,
            },
        ],
        'no-lonely-if': [1],
        'no-mixed-spaces-and-tabs': [1],
        'no-multiple-empty-lines': [
            1,
            {
                max: 1,
                maxEOF: 1,
                maxBOF: 1,
            },
        ],
        'no-restricted-imports': ['error', 'lodash'],
        'no-sparse-arrays': [1],
        'no-template-curly-in-string': [1],
        'no-unneeded-ternary': [1],
        'no-unused-vars': [1],
        'no-use-before-define': [1],
        'no-useless-return': [1],
        'no-var': [1],
        'operator-linebreak': [1, 'before'],
        'prefer-arrow-callback': [1],
        'prefer-const': [1],
        'prefer-template': [1],
        quotes: [1, 'single'],
        semi: [1, 'always'],
        'space-before-function-paren': [
            1,
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'template-curly-spacing': [1, 'always'],
        yoda: [
            1,
            'never',
            {
                exceptRange: true,
                onlyEquality: false,
            },
        ],
        'import/extensions': [
            1,
            'always',
            {
                ignorePackages: true,
            },
        ],
    },
};

export default config;
