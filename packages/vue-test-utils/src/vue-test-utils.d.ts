import { DOMWrapper } from '@vue/test-utils';
import type { ComponentOptions } from 'vue';

declare module '@vue/test-utils' {
    interface VueWrapper {
        findByTestId<T extends Node>(testId: string): DOMWrapper<T>;
        findAllByTestId<T extends Element>(testId: string): DOMWrapper<T>[];
        findComponentByTestId(
            component: ComponentOptions,
            testId: string,
        ): VueWrapper<any, any>;
        findAllComponentsByTestId(
            component: ComponentOptions,
            testId: string,
        ): VueWrapper<any, any>;
    }
}
