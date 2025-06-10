import type { TemplateData } from '../../../types';

export default (value: TemplateData) => `/**
 * Stories for ${value.component.name.pascal}.
 *
 * @see https://storybook.js.org/docs/react/essentials/controls
 */

import type { Meta, StoryObj } from ${value.storybookV9 ? '@storybook/react-vite' : '@storybook/react'};
import { ${value.component.name.pascal}, type ${value.component.name.pascal}Props } from './${value.component.name.pascal}';

const meta = {
    /**
     * Set the component on the default export for props to be
     * automatically converted to args/controls.
     */
    component: ${value.component.name.pascal},
    /**
     * Provide custom control types for your props.
     *
     * @see https://storybook.js.org/docs/essentials/controls?renderer=react#annotation
     */
    argTypes: {},
    /**
     * Set any default props data on your component.
     *
     * @see https://storybook.js.org/docs/writing-stories/args?renderer=react
     */
    args: {},
    /**
     * Set any default parameters on your stories.
     *
     * @see https://storybook.js.org/docs/writing-stories/parameters?renderer=react
     */
    parameters: {
        container: true,
        layout: 'centered',
    },
    /**
     * Return your rendered component.
     *
     * @see https://storybook.js.org/docs/api/csf?renderer=react
     */
    render: (args) => {
        return <${value.component.name.pascal} {...args} />
    },
} satisfies Meta<${value.component.name.pascal}Props>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: '${value.component.name.pascal}',
};
    
export default meta;
`;
