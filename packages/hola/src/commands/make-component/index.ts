import { defineCommand, runMain } from 'citty';

import config from '../../config';

import { confirm, promptScope } from '../../prompts';
import { intro, log, note, outro } from '@clack/prompts';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { camelCase, kebabCase, pascalCase } from 'scule';
import { relative, resolve } from 'pathe';

import componentTemplate from './templates/Component.vue';
import storiesTemplate from './templates/Component.stories.ts';
import testsTemplate from './templates/Component.spec.ts';

export default defineCommand({
    meta: {
        name: 'make:component',
        description: 'Generate a component from boilerplate',
    },

    args: {
        path: {
            type: 'positional',
            description: 'Component path i.e. ./components/MyComponent',
            required: false,
        },
    },

    async run({ args }) {
        const holaConfig = await config();
        const { path } = args;

        if (!path) {
            intro('make:component');

            log.error('Component path is required');

            outro('');

            return;
        }

        const [componentName] = path.split('/').slice(-1);

        log.info(`📚 Stories: ${holaConfig?.features?.storybook ? 'yes' : 'no'}`);

        await promptScope(async ({ outro, intro }) => {
            intro(`Generating component boilerplate for ${componentName}`);

            note(componentName, 'Component name:');
            note(path, 'Component path:');
        });

        const confirmed = await confirm({
            message: 'Is the above correct?',
        });

        if (!confirmed) {
            outro('Aborted');

            return;
        }

        const files = [
            {
                name: 'Component.vue',
                file: componentTemplate,
            },
        ];

        if (holaConfig?.features?.storybook) {
            files.push({
                name: 'Component.stories.ts',
                file: storiesTemplate,
            });
        }

        if (holaConfig?.features?.tests) {
            files.push({
                name: 'Component.spec.ts',
                file: testsTemplate,
            });
        }

        files.forEach(async ({ name, file }) => {
            const filePath = resolve(path, name.replace('Component', componentName));
            const compiled = file({
                component: {
                    name: {
                        pascal: pascalCase(componentName),
                        kebab: kebabCase(componentName),
                        camel: camelCase(componentName),
                    },
                },

                paths: {
                    fromRoot: (fromPath: string) => {
                        const root = process.cwd();
                        const fullComponentPath = resolve(root, path);
                        const fullPath = resolve(root, fromPath);

                        return relative(fullComponentPath, fullPath);
                    },
                },
            });

            if (!existsSync(path)) {
                mkdirSync(path, {
                    recursive: true,
                });
            }

            writeFileSync(filePath, compiled, 'utf-8');
        });

        outro(`Component generated at ${path}/${componentName}`);
    },
});
