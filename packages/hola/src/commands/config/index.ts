import { defineCommand } from 'citty';
import { promptScope } from '../../prompts.js';
import { log } from '@clack/prompts';
import config from '../../config';

export default defineCommand({
    meta: {
        name: 'config',
        description: 'Output the current Hola config',
    },

    async run() {
        const holaConfig = await config();

        await promptScope(async ({ intro, outro }) => {
            intro('Current Hola config:');

            if (!holaConfig) {
                log.error('No config file found');
            } else {
                log.info(JSON.stringify(holaConfig, null, 4));
            }

            outro('');
        });
    },
});
