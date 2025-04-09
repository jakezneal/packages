import { loadConfig } from 'c12';
import type { HolaConfig } from './types';

const config = async () => {
    const { config } = await loadConfig<HolaConfig>({
        name: 'hola',
        configFile: '.hola.config',
    });

    return config;
};

export const configExists = async () => {
    return (await config()) === null;
};

export const ensureConfigExists = async () => {
    if (!(await configExists())) {
        process.exit(1);
    }
};

export default config;
