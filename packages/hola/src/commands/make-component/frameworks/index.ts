import config from '../../../config';
import { ejectTemplates, generateTemplates } from '../templates';
import type { FrameworkCoreModule } from '../types';
import { generateTemplateData } from '../utils';

export const frameworkCoreModuleRun: FrameworkCoreModule['run'] = async ({
    componentName,
    path,
    componentFileName,
    storiesFileName,
    testsFileName,
    componentTemplate,
    storiesTemplate,
    testsTemplate,
}) => {
    const holaConfig = await config();

    const templateData = generateTemplateData({
        componentName,
        componentPath: path,
    });

    const templates = generateTemplates({
        componentFileName,
        storiesFileName,
        testsFileName,
        componentName,
        outputPath: path,
        templateData,
        componentTemplate,
        storiesTemplate,
        testsTemplate,
    });

    await templates.component();

    if (holaConfig.features?.storybook) {
        await templates.stories();
    }

    if (holaConfig.features?.tests) {
        await templates.tests();
    }
};

export const frameworkCoreModuleEject: FrameworkCoreModule['eject'] = async ({
    componentFileName,
    storiesFileName,
    testsFileName,
}) => {
    const holaConfig = await config();

    const templates = await ejectTemplates({
        componentFileName,
        storiesFileName,
        testsFileName,
    });

    await templates.component();

    if (holaConfig.features?.storybook) {
        await templates.stories();
    }

    if (holaConfig.features?.tests) {
        await templates.tests();
    }

    return templates.templatesPath;
};
