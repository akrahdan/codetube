import { Anchor, FlexBox, Text } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { ProLogo } from '@codecademy/gamut-labs';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { capitalize } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { ContainerProgressBar, ContainerProgress } from 'portal/scenes/Dashboard/ProgressBar';

const StyledContainerProgressBar = styled(ContainerProgressBar)`
  padding-right: ${pxRem(24)};
  margin-left: 0;
  align-items: flex-start;

  ${theme.breakpoints.sm} {
    margin-left: auto;
    align-items: flex-end;
  }
`;

const StyledArrowChevronRightIcon = styled(ArrowChevronRightIcon)`
  color: ${theme.colors.text};
  path {
    stroke-width: 2;
  }
`;

export type EnrollmentCardProps = {
    id: string;
    title: string,
    containerProgress: ContainerProgress
    onEnrollmentClick?: (enrollmentSlug: string) => void;
  };

export const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
    id,
    title,
    containerProgress,
    onEnrollmentClick
}) => {
   
  const courseTypeDisplayText = "Projects"

  return (
    <Anchor
      href={"/"}
      id={id}
      variant="interface"
      aria-label={`${courseTypeDisplayText}`}
      onClick={() => onEnrollmentClick?.('')}
      display="block"
    >
      <FlexBox bg="white" justifyContent="space-between" p={16}>
        <FlexBox
          flexDirection={{ _: 'column', sm: 'row' }}
          alignItems={{ _: 'flex-start', sm: 'center' }}
          width={1}
        >
          <FlexBox flexDirection="column">
            <FlexBox alignItems="center">
              
              <Text fontFamily="accent" fontSize={14} pl={0}>
                {courseTypeDisplayText}
              </Text>
            </FlexBox>
            <Text as="h3" fontSize={16} pt={4} lineHeight="base">
              {title}
            </Text>
          </FlexBox>

          <StyledContainerProgressBar containerProgress={containerProgress} />
        </FlexBox>
        <FlexBox
          alignItems="center"
          alignSelf={{ _: 'flex-start', sm: 'inherit' }}
          mt={{ _: 16, sm: 'inherit' }}
        >
          <StyledArrowChevronRightIcon />
        </FlexBox>
      </FlexBox>
    </Anchor>
  );
}