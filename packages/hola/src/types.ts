export type HolaConfigFeatures = {
    tests?: boolean;
    storybook?: boolean;
};

export type FrameworkOption = 'react' | 'vue';

export type HolaConfig = {
    features?: HolaConfigFeatures;
    defaultPath?: string;
    prefix?: string;
    framework: FrameworkOption;
};
