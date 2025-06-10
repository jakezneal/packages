import { pascalCase } from 'scule';

type ComponentNameCaseVariants = {
    pascal: ReturnType<typeof pascalCase>;
    kebab: ReturnType<typeof pascalCase>;
    camel: ReturnType<typeof pascalCase>;
};

export type TemplateData = {
    component: {
        name: ComponentNameCaseVariants;
    };
    paths: {
        fromRoot: (path: string) => string;
    };
    storybookV9: boolean;
};

export type FileNames = {
    componentFileName?: string;
    storiesFileName?: string;
    testsFileName?: string;
};

export interface FrameworkCoreModuleConfig extends FileNames {
    componentName: string;
    path: string;
}

export interface FrameworkCoreModuleRunConfig
    extends FrameworkCoreModuleConfig {
    componentTemplate: (value: TemplateData) => string;
    storiesTemplate: (value: TemplateData) => string;
    testsTemplate: (value: TemplateData) => string;
}

export interface FrameworkModuleEjectConfig extends FileNames {}

export type FrameworkModule = {
    run: (config: FrameworkCoreModuleConfig) => Promise<void>;
    eject: (config: FrameworkModuleEjectConfig) => Promise<string>;
};

export type FrameworkCoreModule = {
    run: (config: FrameworkCoreModuleRunConfig) => Promise<void>;
    eject: (config: FrameworkModuleEjectConfig) => Promise<string>;
};

export type FrameworkConfig = {
    componentExtension: string;
    storiesExtension: string;
    testsExtension: string;
};
