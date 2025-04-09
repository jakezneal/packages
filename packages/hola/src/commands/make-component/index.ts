import { defineCommand, runMain } from 'citty';

import config from '../../config';

import { confirm, promptScope, text } from '../../prompts';
import { intro, log, note } from '@clack/prompts';
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

        let componentPath = path;

        if (!path) {
            intro('make:component');

            componentPath = await text({
                message: 'Component path:',
                placeholder: 'ui/Alert',
            });
        }

        const [componentName] = componentPath.split('/').slice(-1);

        log.info(`📚 Stories: ${holaConfig?.features?.storybook ? 'yes' : 'no'}`);

        await promptScope(async ({ outro, intro }) => {
            intro(`Generating component boilerplate for ${componentName}`);

            note(componentName, 'Component name:');
            note(componentPath, 'Component path:');

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
                const filePath = resolve(componentPath, name.replace('Component', componentName));
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
                            const fullComponentPath = resolve(root, componentPath);
                            const fullPath = resolve(root, fromPath);

                            return relative(fullComponentPath, fullPath);
                        },
                    },
                });

                if (!existsSync(componentPath)) {
                    mkdirSync(componentPath, {
                        recursive: true,
                    });
                }

                writeFileSync(filePath, compiled, 'utf-8');
            });

            if (holaConfig?.features?.storybook) {
                log.info(`Story generated at ${componentPath}/${componentName}.stories.ts`);
            }

            if (holaConfig?.features?.tests) {
                log.info(`Test generated at ${componentPath}/${componentName}.spec.ts`);
            }

            outro(`Component generated at ${componentPath}/${componentName}.vue`);
        });
    },
});
