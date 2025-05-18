import type { TemplateData } from '../../../types';

export default (
    value: TemplateData,
) => `import * as ${value.component.name.pascal} from './${value.component.name.pascal}.stories';

import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

const { Default } = composeStories(${value.component.name.pascal});

describe('${value.component.name.pascal}', () => {
    let wrapper: ReturnType<typeof render>;

    beforeEach(() => {
        wrapper = render(<Default />);
    });
});
`;
