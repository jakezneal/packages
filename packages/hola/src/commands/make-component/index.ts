import { defineCommand } from 'citty';

import config from '../../config';

import { intro, log, note, outro } from '@clack/prompts';
import { confirm, promptScope, text } from '../../prompts';

import { writeConfig } from '../../utils';
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

        skipPrefix: {
            type: 'boolean',
            description:
                'Skip prefixing the component name with the prefix set in the config',
        },
    },

    async run({ args }) {
        let holaConfig = await config();

        let framework = frameworks[holaConfig.framework];

        if (!framework) {
            log.error('Framework not specified in config');

            await writeConfig({ initialise: false });

            holaConfig = await config();
            framework = frameworks[holaConfig.framework];
        }

        if (args.eject) {
            intro('make:component --eject');

            const templatesPath = await framework.eject({});

            outro(
                `Templates ejected at ${templatesPath.replace(process.cwd(), '.')}`,
            );

            return;
        }

        if (!holaConfig.prefix && args.skipPrefix) {
            log.error('Prefix is not defined in the config');

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

            const componentPrefix =
                !args.skipPrefix && holaConfig.prefix ? holaConfig.prefix : '';

            if (
                ((holaConfig.prefix && args.skipPrefix) ||
                    (!holaConfig.prefix && !args.skipPrefix)) &&
                uppercaseCount <= 1
            ) {
                log.error('Component names should be at least two words');

                await componentNameValidation({});
            } else {
                componentName = `${componentPrefix}${providedComponentName}`;
                componentPath = providedComponentPath = [
                    holaConfig.defaultPath && !args.overridePath
                        ? `${holaConfig.defaultPath}/`
                        : undefined,
                    componentName,
                ].join('');
            }
        };

        if (!path) {
            intro('make:component');

            await componentNameValidation({});
        }

        await componentNameValidation({ prompt: false });

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
