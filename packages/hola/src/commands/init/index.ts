import { defineCommand } from 'citty';
import { writeConfig } from '../../utils';

export default defineCommand({
    meta: {
        name: 'init',
        description: 'Initialise a new Hola config in the current directory',
    },

    async run() {
        await writeConfig({});
    },
});
