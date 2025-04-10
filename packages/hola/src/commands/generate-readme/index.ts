import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const templateFile = readFileSync(`${__dirname}/README.md`, 'utf8');
const outputFile = `${__dirname}/../../../README.md`;

(() => {
    try {
        const output = execSync('NO_COLOR=1 pnpm play --help', {
            cwd: process.cwd(),
            encoding: 'utf-8',
        });

        const commandOutput = output.split('\n').slice(2, -2).join('\n');

        const readme = templateFile.replace('{{HOLA_OUTPUT}}', commandOutput);

        writeFileSync(outputFile, readme);
    } catch (e) {
        console.log(e);
    }
})();
