import type { FrameworkConfig, FrameworkModule } from '../../types';
import { frameworkCoreModuleEject, frameworkCoreModuleRun } from '../index';
import testsTemplate from './templates/Component.spec.tsx';
import storiesTemplate from './templates/Component.stories.tsx';
import componentTemplate from './templates/Component.tsx';

export const config: FrameworkConfig = {
    componentExtension: 'tsx',
    storiesExtension: 'stories.tsx',
    testsExtension: 'spec.tsx',
};

export const run: FrameworkModule['run'] = async ({ componentName, path }) => {
    await frameworkCoreModuleRun({
        componentName,
        path,
        componentFileName: 'Component.tsx',
        storiesFileName: 'Component.stories.tsx',
        testsFileName: 'Component.spec.tsx',
        componentTemplate,
        storiesTemplate,
        testsTemplate,
    });
};

export const eject: FrameworkModule['eject'] = async () => {
    const templates = await frameworkCoreModuleEject({
        componentFileName: 'Component.tsx',
        storiesFileName: 'Component.stories.tsx',
        testsFileName: 'Component.spec.tsx',
    });

    return templates;
};
