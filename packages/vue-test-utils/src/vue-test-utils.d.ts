import { DOMWrapper } from '@vue/test-utils';
import type { ComponentOptions } from 'vue';

declare module '@vue/test-utils' {
    interface VueWrapper {
        findByTestId(testId: string): DOMWrapper<any>;
        findAllByTestId(testId: string): DOMWrapper<any>[];
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
