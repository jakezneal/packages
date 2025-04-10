import { defineCommand } from 'citty';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'pathe';
import { confirm, promptScope, text } from '../../prompts';
import type { HolaConfig } from '../../types';

export default defineCommand({
    meta: {
        name: 'init',
        description: 'Initialise a new Hola config in the current directory',
    },

    async run() {
        const rootDir = process.cwd();
        const configPath = resolve(rootDir, './.hola.config.js');
        const packageJson = JSON.parse(
            readFileSync(resolve(rootDir, './package.json'), 'utf-8'),
        );

        const dependencies = {
            ...(packageJson.dependencies ?? {}),
            ...(packageJson.devDependencies ?? {}),
        };

        await promptScope(async ({ intro, outro }) => {
            intro('👋 Hola. Creating config...');

            const storybookDetected = Object.keys(dependencies).some((name) =>
                name.includes('storybook'),
            );

            const hasStorybook = await confirm({
                message: 'Does this project use storybook?',
                initialValue: storybookDetected,
            });

            const vitestDetected = Object.keys(dependencies).some((name) =>
                name.includes('vitest'),
            );

            const hasTests = await confirm({
                message: 'Does this project have unit tests?',
                initialValue: vitestDetected,
            });

            const defaultPath = await text({
                message: 'Define a default component path (optional)',
                placeholder: 'e.g. src/components',
                initialValue: undefined,
            });

            const config: HolaConfig = {
                features: {
                    storybook: hasStorybook,
                    tests: hasTests,
                },
                defaultPath,
            };

            writeFileSync(
                configPath,
                // @prettier-ignore
                `/**
 * @type {import('@jakezneal/hola').HolaConfig}
 */
const config = ${JSON.stringify(config, null, 4)
                    .replace(/"([^"]+)":/g, '$1:')
                    .replace(/"/g, "'")};

export default config;`,
                'utf-8',
            );

            outro(`Config initialised at ${configPath}`);
        });
    },
});
