import { relative, resolve } from 'pathe';
import { camelCase, kebabCase, pascalCase } from 'scule';
import type { TemplateData } from './types';

export const generateTemplateData = ({
    componentName,
    componentPath,
}: {
    componentName: string;
    componentPath: string;
}): TemplateData => ({
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
});
