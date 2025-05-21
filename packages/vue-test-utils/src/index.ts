import { config as globalConfig } from '@vue/test-utils';
import merge from 'lodash.merge';
import { type Directive } from 'vue';
import { type Stubs } from './types';

export const setPlugins = (plugins = {}) => {
    merge(globalConfig.global.plugins, plugins);
};

export const setWrapperPlugins = (plugins: Record<string, any> = {}) => {
    Object.entries(plugins).forEach(([, value]) => {
        globalConfig.plugins.VueWrapper.install(value);
    });
};

export const setStubs = (stubs = {}) => {
    merge(globalConfig.global.stubs, stubs);
};

export const setMocks = (mocks = {}) => {
    merge(globalConfig.global.mocks, mocks);
};

export const mockDirectives = (directives: Record<string, Directive> = {}) => {
    Object.entries(directives).forEach(([name, value]) => {
        globalConfig.global.directives[name] = value;
    });
};

export const mockComponents = (components: Stubs = {}) => {
    Object.entries(components).forEach(([name, value]) => {
        globalConfig.global.stubs[name] = value;
    });
};
