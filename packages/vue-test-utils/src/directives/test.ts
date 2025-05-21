import { type DirectiveBinding } from 'vue';

export default {
    created(el: HTMLElement, context: DirectiveBinding<string>) {
        if (typeof process === 'undefined' || !process.env.VITEST) {
            return;
        }

        el.setAttribute('data-testid', context.arg ?? '');
    },
};
