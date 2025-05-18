import type { TemplateData } from '../../../types';

export default (
    value: TemplateData,
) => `import { Box, type BoxProps } from '@mui/material';

export interface ${value.component.name.pascal}Props extends BoxProps {}

export const ${value.component.name.pascal} = ({}: ${value.component.name.pascal}Props) => {
    return (
        <Box>
            ${value.component.name.pascal}
        </Box>
    );
};
`;
