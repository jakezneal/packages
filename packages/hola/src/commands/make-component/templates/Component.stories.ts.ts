import type { TemplateData } from '../types';

export default (value: TemplateData) => `/**
 * Stories for ${value.component.name.pascal}.
 *
 * @see https://storybook.js.org/docs/vue/essentials/controls
 */

import type { Meta, StoryObj } from '@storybook/vue3';
import { argsKeys, generateArgTypes } from '${value.paths.fromRoot('.storybook/helpers')}';
import ${value.component.name.pascal}, { type ${value.component.name.pascal}Props } from './${value.component.name.pascal}.vue';

const meta = {
    /**
     * Set the component on the default export for props to be
     * automatically converted to args/controls.
     */
    component: ${value.component.name.pascal},
    /**
     * Provide custom control types for your props.
     *
     * @see https://storybook.js.org/docs/essentials/controls?renderer=vue#annotation
     */
    argTypes: generateArgTypes(${value.component.name.pascal}),
    /**
     * Set any default props data on your component.
     *
     * @see https://storybook.js.org/docs/writing-stories/args?renderer=vue
     */
    args: {},
    /**
     * Set any default parameters on your stories.
     *
     * @see https://storybook.js.org/docs/writing-stories/parameters?renderer=vue
     */
    parameters: {
        container: true,
        layout: 'centered',
    },
    /**
     * Return your rendered component.
     *
     * @see https://storybook.js.org/docs/api/csf?renderer=vue
     */
    render: (args: ${value.component.name.pascal}Props, { argTypes }) => ({
        name: '${value.component.name.kebab}-story',

        props: argsKeys({ ...args, ...argTypes }),

        components: { ${value.component.name.pascal} },

        setup() {
            return {
                args,
            };
        },

        template: \`
            <${value.component.name.kebab}
                v-bind="args"
            />
        \`,
    }),
} satisfies Meta<${value.component.name.pascal}Props>;

type Story = StoryObj<typeof meta>;

export const ${value.component.name.camel}: Story = {
    name: '${value.component.name.pascal}',
};
    
export default meta;
`;
