#!/usr/bin/env node

import { defineCommand, runMain } from 'citty';

const main = defineCommand({
    setup({ rawArgs }: any) {
        if (rawArgs.length) {
            return;
        }
    },

    subCommands: {
        init: () => import('./commands/init').then((r) => r.default),
        'make:component': () => import('./commands/make-component').then((r) => r.default),
    },
});

runMain(main);

// Export types
export type { HolaConfig } from './types';
// export type { TemplateData as MakeComponentTemplateData } from './commands/make-component';
