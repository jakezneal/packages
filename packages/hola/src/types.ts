export type HolaConfigFeatures = {
    tests?: boolean;
    storybook?: boolean;
};

export type HolaConfig = {
    features?: HolaConfigFeatures;
    defaultPath?: string;
    prefix?: string;
};
