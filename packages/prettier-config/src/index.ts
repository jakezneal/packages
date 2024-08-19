import type { Options } from 'prettier';

const config: Options = {
    $schema: 'http://json.schemastore.org/prettierrc',
    trailingComma: 'all',
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    printWidth: 80,
    htmlWhitespaceSensitivity: 'ignore',
    vueIndentScriptAndStyle: true,
};

export default config;
