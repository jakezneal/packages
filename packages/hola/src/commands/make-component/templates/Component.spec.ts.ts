import type { TemplateData } from '../types';

export default (
    value: TemplateData,
) => `import * as ${value.component.name.pascal} from './${value.component.name.pascal}.stories';

import { describe, test, expect } from 'vitest';
import { byTestId } from 'testing-library-selector';
import { composeStories } from '@storybook/vue3';

const { ${value.component.name.camel} } = composeStories(${value.component.name.pascal});

describe('${value.component.name.pascal}', () => {});
`;
