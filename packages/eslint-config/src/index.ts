import type { Linter } from 'eslint';
import basic from '@jakezneal/eslint-config-basic';
import vue from '@jakezneal/eslint-config-vue';

const config: Linter.Config[] = [basic, vue];

export default config;
