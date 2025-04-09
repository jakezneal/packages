import defaultConfig from '@jakezneal/prettier-config';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    ...defaultConfig,
    plugins: ['prettier-plugin-organize-imports'],
};

export default config;
