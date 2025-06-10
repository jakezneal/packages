import { readFileSync } from 'fs';
import { relative, resolve } from 'pathe';
import { camelCase, kebabCase, pascalCase } from 'scule';
import type { TemplateData } from './types';

export const generateTemplateData = ({
    componentName,
    componentPath,
}: {
    componentName: string;
    componentPath: string;
}): TemplateData => {
    let storybookV9 = false;
    const rootDir = process.cwd();
    const packageJson = JSON.parse(
        readFileSync(resolve(rootDir, './package.json'), 'utf-8'),
    );

    const dependencies = {
        ...(packageJson.dependencies ?? {}),
        ...(packageJson.devDependencies ?? {}),
    } as object;

    const storybookDetected = Object.keys(dependencies).some((name) =>
        name.includes('storybook'),
    );

    const [_, storybookVersion] = Object.entries(dependencies).find(
        ([name]) => name === 'storybook',
    ) as string[];

    if (storybookDetected) {
        storybookV9 = new RegExp('^[^\d]*(9)').test(storybookVersion);
    }

    return {
        component: {
            name: {
                pascal: pascalCase(componentName),
                kebab: kebabCase(componentName),
                camel: camelCase(componentName),
            },
        },

        paths: {
            fromRoot: (path) => {
                const root = process.cwd();
                const fullComponentPath = resolve(root, componentPath);
                const fullPath = resolve(root, path);

                return relative(fullComponentPath, fullPath);
            },
        },

        storybookV9,
    };
};
