import basic from '@jakezneal/eslint-config-basic';
import vue from '@jakezneal/eslint-config-vue';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [basic, vue];

export default config;
