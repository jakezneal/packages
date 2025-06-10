import type { TemplateData } from '../../../types';

export default (
    value: TemplateData,
) => `import * as ${value.component.name.pascal} from './${value.component.name.pascal}.stories';

import { composeStories } from '@storybook/vue3';
import { mount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';

const { Default } = composeStories(${value.component.name.pascal});

describe('${value.component.name.pascal}', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(Default);
    });
});
`;
