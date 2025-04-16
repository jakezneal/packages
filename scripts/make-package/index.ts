import {
    cpSync,
    existsSync,
    readFileSync,
    rmdirSync,
    writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const packageName = process.argv[2];

const root = resolve(__dirname, '../../');

if (!packageName) {
    console.error('Please provide a package name');

    process.exit();
}

const packageDirectory = resolve(root, './packages', packageName);

if (existsSync(packageDirectory)) {
    console.error('Package already exists');

    process.exit();
}

try {
    cpSync(resolve(__dirname, './stubs'), packageDirectory, {
        recursive: true,
    });

    const packageJson = JSON.parse(
        readFileSync(resolve(packageDirectory, './package.json'), 'utf-8'),
    );

    packageJson.name = `@jakezneal/${packageName}`;

    writeFileSync(
        resolve(packageDirectory, 'package.json'),
        JSON.stringify(packageJson, null, 2),
        'utf-8',
    );

    const readme = readFileSync(
        resolve(packageDirectory, './README.md'),
        'utf-8',
    );

    const readmeContents = readme.replaceAll('{{PACKAGE_NAME}}', packageName);

    writeFileSync(
        resolve(packageDirectory, 'README.md'),
        readmeContents,
        'utf-8',
    );

    console.log(`✅ @jakezneal/${packageName} bootstrapped successfully`);
} catch (e) {
    rmdirSync(packageDirectory, {
        recursive: true,
    });

    throw e;
}
