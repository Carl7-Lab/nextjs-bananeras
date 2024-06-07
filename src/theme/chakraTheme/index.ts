import { extendTheme } from '@chakra-ui/react';

import * as additions from '@/theme/chakraTheme/additions';
import * as components from '@/theme/chakraTheme/components';
import { globalStyles } from '@/theme/chakraTheme/styles';

const overrides = {
  ...globalStyles,
  components: {
    ...components,
    ...additions,
  },
};

export default extendTheme(overrides);
