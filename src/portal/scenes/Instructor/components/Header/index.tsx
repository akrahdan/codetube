import { AppBar, AppBarSection } from 'components/overrides';
import { platformColors, pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled/macro';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { withErrorBoundary } from 'components/errors/withErrorBoundary';
import {
 HomeLogo, MenuTabs
} from './HeaderTabs/MenuTabs';
import { LEHeaderTab } from './HeaderTabs/utils';
export type HeaderProps = {
  adminTab?: ReactNode;
  IDEtabs?: ReactNode[];
  hideHelpMenu?: boolean;
  showTools?: boolean;
  statusDisplay?: ReactNode;
  walkthroughVideoUrl?: string;
  allowNavigation?: boolean;
  contentItemType?: string;
  kanbanExists?: boolean;
};

const Header = styled.header`
  position: relative;
  height: 4rem;
  z-index: 14;
  background-color: rgb(21, 20, 31);
`;



const LEHeader: React.FC<HeaderProps> = ({
  adminTab,
  IDEtabs,
  hideHelpMenu,
  showTools,
  statusDisplay,
  walkthroughVideoUrl,
  allowNavigation,
}) => {
 



  return (
    <Header>
      <AppBar wide>
        <AppBarSection key="header-app-bar-section-left" position="left">
          <HomeLogo />
         
        </AppBarSection>
        <AppBarSection key="header-app-bar-section-right" position="right">
         
         
          {/* { <IDETabs IDEtabs={IDEtabs} />} */}
          {/* <ProfileTab /> */}
          {/* { <AdTab />} */}
          {/* {hasGodMode && <AdminTab adminTab={adminTab} />} */}
        </AppBarSection>
      </AppBar>
    </Header>
  );
};

export default LEHeader;
