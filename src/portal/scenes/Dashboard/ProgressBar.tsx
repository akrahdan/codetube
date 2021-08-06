import { Box, FlexBox, ProgressBar } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { LoadingBox } from 'components/LoadingBox';



interface ContainerProgress {
    percent_complete: number
}
const PercentageBox = styled(Box)`
  margin-bottom: ${pxRem(2)};
`;

export const PercentageLoading = styled(LoadingBox)`
  width: ${pxRem(38)};
  height: 1.25rem;
  margin-bottom: ${pxRem(6)};
`;

export const ProgressBarLoading = styled(LoadingBox)`
  width: ${pxRem(96)};
  height: 0.5rem;
`;

export type ContainerProgressBarProps = {
  containerProgress?: ContainerProgress;
  className?: string;
};

export const ContainerProgressBar: React.FC<ContainerProgressBarProps> = ({
  containerProgress,
  className,
}) => {
  const renderProgressLoading = () => (
    <FlexBox
      alignItems="flex-end"
      flexDirection="column"
      data-testid="progress-loading"
    >
      <PercentageLoading />
      <ProgressBarLoading />
    </FlexBox>
  );

  const percentComplete = containerProgress?.percent_complete || 0;

  const renderProgress = () => (
    <>
      <PercentageBox
        as="span"
        fontSize={16}
        fontWeight="title"
        fontFamily="accent"
        textAlign="right"
        aria-hidden="true"
      >
        {`${containerProgress!.percent_complete}%`}
      </PercentageBox>
      <Box width={{ _: pxRem(96), sm: pxRem(72) }} height={pxRem(8)}>
        <ProgressBar
          percent={percentComplete}
          pattern="diagonalStripesDense"
          variant="yellow"
          size="medium"
        />
      </Box>
    </>
  );

  return (
    <FlexBox flexDirection="column" alignItems="flex-end" className={className}>
      {containerProgress ? renderProgress() : renderProgressLoading()}
    </FlexBox>
  );
};
