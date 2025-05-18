import { defineCommand } from 'citty';

import config from '../../config';

import { intro, log, note, outro } from '@clack/prompts';
import { confirm, promptScope, text } from '../../prompts';

import * as react from './frameworks/react';
import * as vue from './frameworks/vue';

const frameworks = {
    vue,
    react,
} as const;

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

        eject: {
            type: 'boolean',
            description: 'Eject the templates',
        },

        overridePath: {
            type: 'boolean',
            description:
                'Override the default path set in the config. Useful for creating a one-off component in a different location',
        },

        prefix: {
            type: 'boolean',
            description:
                'Prefix the component name with the prefix set in the config',
        },
    },

    async run({ args }) {
        const holaConfig = await config();

        const framework = frameworks[holaConfig.framework];

        if (!framework) {
            log.error('Framework not specified in config');

            return;
        }

        if (args.eject) {
            intro('make:component --eject');

            const templatesPath = await framework.eject({});

            outro(
                `Templates ejected at ${templatesPath.replace(process.cwd(), '.')}`,
            );

            return;
        }

        const { path } = args;
        let componentPath = path;
        let componentName = '';

        const componentNameValidation = async ({ prompt = true }) => {
            let providedComponentPath = componentPath;

            if (prompt) {
                providedComponentPath = await text({
                    message: 'Component path:',
                    placeholder: 'ui/AppAlert',
                });
            }

            const [providedComponentName] = providedComponentPath
                .split('/')
                .slice(-1);

            const uppercaseCount = (
                providedComponentName.match(new RegExp('[A-Z]', 'g')) || []
            )?.length;

            if (uppercaseCount <= 1) {
                log.error('Component names should be at least two words');

                await componentNameValidation({});
            } else {
                componentPath = providedComponentPath;
                componentName = providedComponentName;
            }
        };

        if (!path) {
            intro('make:component');

            await componentNameValidation({});
        }

        await componentNameValidation({ prompt: false });

        componentPath = [
            holaConfig.defaultPath && !args.overridePath
                ? `${holaConfig.defaultPath}/`
                : undefined,
            componentPath.replace(componentName, ''),
            args.prefix && holaConfig.prefix ? holaConfig.prefix : undefined,
            componentName,
        ].join('');

        if (args.prefix && holaConfig.prefix) {
            componentName = `${holaConfig.prefix}${componentName}`;
        }

        log.info(
            `📚 Stories: ${holaConfig?.features?.storybook ? 'yes' : 'no'}`,
        );

        log.info(`🧪 Tests: ${holaConfig?.features?.tests ? 'yes' : 'no'}`);

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

            await framework.run({
                componentName,
                path: componentPath,
            });

            if (holaConfig?.features?.storybook) {
                log.info(
                    `Story generated at ${componentPath}/${componentName}.${framework.config.storiesExtension}`,
                );
            }

            if (holaConfig?.features?.tests) {
                log.info(
                    `Test generated at ${componentPath}/${componentName}.${framework.config.testsExtension}`,
                );
            }

            outro(
                `Component generated at ${componentPath}/${componentName}.${framework.config.componentExtension}`,
            );
        });
    },
});
