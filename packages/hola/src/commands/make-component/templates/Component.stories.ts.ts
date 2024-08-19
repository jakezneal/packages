import type { TemplateData } from '../types';

export default (value: TemplateData) => `/**
 * Stories for ${value.component.name.pascal}.
 *
 * @see https://storybook.js.org/docs/vue/essentials/controls
 */

import ${value.component.name.pascal}, { type ${value.component.name.pascal}Props } from './${value.component.name.pascal}.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
    /**
     * Set the component on the default export for props to be
     * automatically converted to args/controls.
     */
    component: ${value.component.name.pascal},
    /**
     * Provide custom control types for your props.
     *
     * @see https://storybook.js.org/docs/vue/essentials/controls#annotation
     */
    argTypes: {},
    /**
     * Set any default props data on your component.
     *
     * @see https://storybook.js.org/docs/8.0/vue/writing-stories/args
     */
    args: {},
    /**
     * Set any default parameters on your stories.
     *
     * @see https://storybook.js.org/docs/8.0/vue/writing-stories/parameters
     */
    parameters: {
        container: true,
        layout: 'centered',
    },
    /**
     * Return your rendered component.
     *
     * @see https://storybook.js.org/docs/8.0/vue/api/csf
     */
    render: (args) => ({
        name: '${value.component.name.kebab}-story',

        props: args,

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
