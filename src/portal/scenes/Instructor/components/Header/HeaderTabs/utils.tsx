import { HeaderTab } from '@codecademy/gamut-labs';
import { breakpoints, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';



export const trackClick = (target: string) => () => {
 console.log()
};

export type LEHeaderTabProps = {
  hideOnMobile?: boolean;
};

export const LEHeaderTab = styled(HeaderTab)<LEHeaderTabProps>`
  margin: 0 ${spacing[12]};
  @media only screen and (max-width: ${breakpoints.sm}) {
    display: ${(props) => (props.hideOnMobile ? 'none' : 'block')};
  }
`;

export const wrapWithHeaderTabs = (
  nodeOrNodeArray: ReactNode,
  hideOnMobile?: boolean,
  className?: string
) => {
  return (
    <>
      {React.Children.map(nodeOrNodeArray, (node) => (
        <LEHeaderTab className={className} hideOnMobile={hideOnMobile}>
          {node}
        </LEHeaderTab>
      ))}
    </>
  );
};

export const withHeaderTab = (node: ReactNode, hideOnMobile?: boolean) => (
  props
) => {
  return <LEHeaderTab hideOnMobile={hideOnMobile}>{node}</LEHeaderTab>;
};
