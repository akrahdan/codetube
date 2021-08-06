import {
    Container,
    SkipToContent,
    SkipToContentTarget,
  } from '@codecademy/gamut';
  import { breakpoints } from '@codecademy/gamut-styles';
  import { css } from '@emotion/react';
  import styled from '@emotion/styled';
  import React from 'react';
  
  import LEHeader from '../Header';
  import { TestHeader } from '../Header/test';
  export type PlatformShellProps = {
    customHeader?: JSX.Element;
    customFooter?: JSX.Element;
    skipToContentId?: string;
    scrollable?: boolean;
  };
  
  type MainProps = {
    scrollable?: boolean;
  };
  
  const Wrapper = styled(Container)`
    height: 100vh;
  
    @media screen and (max-width: ${breakpoints.xs}) {
      height: auto;
    }
  `;
  
  const Main = styled.main<MainProps>`
    overflow: hidden;
    flex-grow: 1;
    height: 100%;
  
    ${({ scrollable, theme }) =>
      scrollable &&
      css`
        overflow-y: auto;
        &:focus {
          outline: none;
        }
        &:focus-visible {
          outline: 0.3rem auto ${theme.colors.blue};
        }
      `}
  `;
  
  const defaultSkipToContentId = 'page-skip-to-content-target';
  
  export const Shell: React.FC<PlatformShellProps> = ({
    children,
    customHeader,
    customFooter,
    skipToContentId,
    scrollable,
  }) => {
    return (
      <Wrapper column>
        <SkipToContent contentId={skipToContentId || defaultSkipToContentId} />
        {customHeader || <TestHeader /> /* or default */}
        <Main tabIndex={scrollable ? 0 : undefined} scrollable={scrollable}>
          {!skipToContentId && (
            <SkipToContentTarget id={defaultSkipToContentId} />
          )}
          {children}
        </Main>
        {customFooter || null /* or default */}
      </Wrapper>
    );
  };
  