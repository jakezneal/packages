import type { FrameworkConfig, FrameworkModule } from '../../types';
import { frameworkCoreModuleEject, frameworkCoreModuleRun } from '../index';
import testsTemplate from './templates/Component.spec.ts';
import storiesTemplate from './templates/Component.stories.ts';
import componentTemplate from './templates/Component.vue';

export const config: FrameworkConfig = {
    componentExtension: 'vue',
    storiesExtension: 'stories.ts',
    testsExtension: 'spec.ts',
};

export const run: FrameworkModule['run'] = async ({ componentName, path }) => {
    await frameworkCoreModuleRun({
        componentName,
        path,
        componentFileName: 'Component.vue',
        componentTemplate,
        storiesTemplate,
        testsTemplate,
    });
};

export const eject: FrameworkModule['eject'] = async () => {
    const templates = await frameworkCoreModuleEject({
        componentFileName: 'Component.vue',
    });

    return templates;
};
