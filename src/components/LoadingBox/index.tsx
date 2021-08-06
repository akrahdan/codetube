import { Box, BoxProps } from '@codecademy/gamut';
import React from 'react';

export const LoadingBox: React.FC<BoxProps> = (props) => (
  <Box bg="gray-100" borderRadius="2px" {...props} />
);
