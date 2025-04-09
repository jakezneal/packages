import { log } from '@clack/prompts';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'pathe';
import { fileURLToPath } from 'url';
import type { TemplateData } from './types';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const ejectPath = async () =>
    resolve(process.cwd(), '.hola/commands/make-component/templates');

const defaultTemplatePath = async (path: string = '') =>
    resolve(__dirname, 'templates', path);

const ejectedTemplatePath = async (path: string = '') =>
    resolve(await ejectPath(), path);

export const getTemplatePath = async (path: string) => {
    const ejectedPath = await ejectedTemplatePath(`${path}.ts`);

    if (existsSync(ejectedPath)) {
        return ejectedPath;
    }

    return false;
};

export const generateTemplate = async ({
    fileName,
    path,
    stubFile,
    templateData,
    template,
}: {
    fileName: string;
    path: string;
    stubFile: string;
    templateData: TemplateData;
    template: (value: TemplateData) => string;
}) => {
    const customTemplate = await getTemplatePath(stubFile);

    let compiled: string = template(templateData);

    if (customTemplate) {
        compiled = (await import(customTemplate)).default(templateData);
    }

    const filePath = resolve(path, fileName);

    if (!existsSync(path)) {
        mkdirSync(path, {
            recursive: true,
        });
    }

    writeFileSync(filePath, compiled, 'utf-8');
};

export const ejectStub = async (path: string) => {
    if (!existsSync(await ejectedTemplatePath())) {
        mkdirSync(await ejectedTemplatePath(), {
            recursive: true,
        });
    }

    const stubContent = readFileSync(
        await defaultTemplatePath(`${path}.ts`),
        'utf-8',
    );

    writeFileSync(
        await ejectedTemplatePath(`${path}.ts`),
        [
            stubContent
                .replaceAll('TemplateData', 'MakeComponentTemplateData')
                .replace("'../types'", "'@jakezneal/hola'"),
        ].join('\n'),
        'utf-8',
    );

    log.success(`Ejected ${path}.ts`);
};

export const generateTemplates = ({
    componentName,
    componentFileName = 'Component.vue',
    storiesFileName = 'Component.stories.ts',
    outputPath,
    templateData,
    componentTemplate,
    storiesTemplate,
    testsTemplate,
}: {
    componentName: string;
    componentFileName?: string;
    storiesFileName?: string;
    outputPath: string;
    templateData: TemplateData;
    componentTemplate: (value: TemplateData) => string;
    testsTemplate: (value: TemplateData) => string;
    storiesTemplate: (value: TemplateData) => string;
}) => {
    return {
        component: () =>
            generateTemplate({
                fileName: componentFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                template: componentTemplate,
                stubFile: componentFileName,
            }),
        stories: () =>
            generateTemplate({
                fileName: storiesFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                template: storiesTemplate,
                stubFile: storiesFileName,
            }),
        tests: () =>
            generateTemplate({
                fileName: 'Component.spec.ts'.replace(
                    'Component',
                    componentName,
                ),
                path: outputPath,
                templateData,
                template: testsTemplate,
                stubFile: 'Component.spec.ts',
            }),
    };
};

export const ejectTemplates = async ({
    componentFileName = 'Component.vue',
    storiesFileName = 'Component.stories.ts',
    testsFileName = 'Component.spec.ts',
}: {
    componentFileName?: string;
    storiesFileName?: string;
    testsFileName?: string;
} = {}) => {
    return {
        component: () => ejectStub(componentFileName),
        stories: () => ejectStub(storiesFileName),
        tests: () => ejectStub(testsFileName),
        templatesPath: await ejectPath(),
    };
};
