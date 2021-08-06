import { FlexBox } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { LoadingBox } from 'components/LoadingBox';
import {
  PercentageLoading,
  ProgressBarLoading,
} from 'portal/scenes/Dashboard/ProgressBar';

const TitleLoading = styled(LoadingBox)`
  width: 8rem;
  height: 1rem;
`;

export const EnrollmentLoadingCard: React.FC = () => {
  return (
    <FlexBox
      data-testid="enrollment-loading-card"
      justifyContent="space-between"
      bg="background"
      p={16}
      height={pxRem(80)}
    >
      <FlexBox flexDirection="column" py={4}>
        <TitleLoading />
      </FlexBox>
      <FlexBox alignItems="flex-end" flexDirection="column" mr={32} mt={8}>
        <PercentageLoading />
        <ProgressBarLoading />
      </FlexBox>
    </FlexBox>
  );
};
