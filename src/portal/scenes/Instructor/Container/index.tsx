import { Box } from '@codecademy/gamut';
import React, { ComponentProps } from 'react';

import styles from './styles.module.scss';

export type PlatformContainerProps = ComponentProps<typeof Box>;

export const PlatformContainer: React.FC<PlatformContainerProps> = ({
  children,
  ...props
}) => (
  <Box {...props} className={styles.platform}>
    {children}
  </Box>
);
