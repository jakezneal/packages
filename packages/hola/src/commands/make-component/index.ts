import { defineCommand } from 'citty';

import config from '../../config';

import { intro, log, note, outro } from '@clack/prompts';
import { confirm, promptScope, text } from '../../prompts';

import { ejectTemplates, generateTemplates } from './templates';
import testsTemplate from './templates/Component.spec.ts';
import storiesTemplate from './templates/Component.stories.ts';
import componentTemplate from './templates/Component.vue';
import { generateTemplateData } from './utils';

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

        if (args.eject) {
            intro('make:component --eject');

            const templates = await ejectTemplates();

            await templates.component();

            if (holaConfig?.features?.storybook) {
                await templates.stories();
            }

            if (holaConfig?.features?.tests) {
                await templates.tests();
            }

            outro(
                `Templates ejected at ${templates.templatesPath.replace(process.cwd(), '.')}`,
            );

            return;
        }

        const { path } = args;
        let componentPath = path;
        let componentName = '';

        const componentNameValidation = async () => {
            const providedComponentPath = await text({
                message: 'Component path:',
                placeholder: 'ui/AppAlert',
            });

            const [providedComponentName] = providedComponentPath
                .split('/')
                .slice(-1);

            const uppercaseCount = (
                providedComponentName.match(new RegExp('[A-Z]', 'g')) || []
            )?.length;

            if (uppercaseCount <= 1) {
                log.error('Component names should be at least two words');

                await componentNameValidation();
            } else {
                componentPath = providedComponentPath;
                componentName = providedComponentName;
            }
        };

        if (!path) {
            intro('make:component');

            await componentNameValidation();
        }

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

            const templateData = generateTemplateData({
                componentName,
                componentPath,
            });

            const templates = generateTemplates({
                componentFileName: 'Component.vue',
                componentName,
                outputPath: componentPath,
                templateData,
                componentTemplate,
                storiesTemplate,
                testsTemplate,
            });

            await templates.component();

            if (holaConfig?.features?.storybook) {
                await templates.stories();

                log.info(
                    `Story generated at ${componentPath}/${componentName}.stories.ts`,
                );
            }

            if (holaConfig?.features?.tests) {
                await templates.tests();

                log.info(
                    `Test generated at ${componentPath}/${componentName}.spec.ts`,
                );
            }

            outro(
                `Component generated at ${componentPath}/${componentName}.vue`,
            );
        });
    },
});
