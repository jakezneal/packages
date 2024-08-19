import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    declaration: true,
    rollup: {
        inlineDependencies: true,
        emitCJS: true,
        output: {
            preserveModules: true,
        },
    },
    entries: [
        {
            builder: 'rollup',
            input: './src/index.ts',
            outDir: './dist',
        },
    ],
});
