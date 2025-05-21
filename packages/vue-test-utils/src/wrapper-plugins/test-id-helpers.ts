import { type VueWrapper } from '@vue/test-utils';
import { type ComponentOptions } from 'vue';

export const addTestIdHelpers = (wrapper: VueWrapper) => {
    const selector = (id: string) => `[data-testid="${id}"]`;

    const findByTestId = (id: string) => {
        return wrapper.find(selector(id));
    };

    const findAllByTestId = (id: string) => {
        return wrapper.findAll(selector(id));
    };

    const findComponentByTestId = (component: ComponentOptions, id: string) => {
        return wrapper
            .findAllComponents(component)
            ?.find((w) => w.attributes('data-testid') === id);
    };

    const findAllComponentsByTestId = (component: string, id: string) => {
        return wrapper
            .findAllComponents(component)
            ?.filter((w) => w.attributes('datat-testid') === id);
    };

    return {
        findByTestId,
        findAllByTestId,
        findComponentByTestId,
        findAllComponentsByTestId,
    };
};
