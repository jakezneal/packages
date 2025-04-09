#!/usr/bin/env node

import { defineCommand, runMain } from 'citty';
import { readFileSync } from 'fs';
import { join } from 'pathe';
import type { PackageJson } from 'type-fest';

const pkgFile = join(process.cwd(), 'package.json');
const pkg: PackageJson = JSON.parse(readFileSync(pkgFile, 'utf-8'));

const { name, version } = pkg;

const main = defineCommand({
    meta: {
        name,
        version,
        description: '👋 Hola',
    },

    setup({ rawArgs }: any) {
        if (rawArgs.length) {
            return;
        }
    },

    subCommands: {
        init: () => import('./commands/init').then((r) => r.default),
        'make:component': () =>
            import('./commands/make-component').then((r) => r.default),
    },
});

runMain(main);

// Export types
export type { TemplateData as MakeComponentTemplateData } from './commands/make-component/types';
export type { HolaConfig } from './types';
