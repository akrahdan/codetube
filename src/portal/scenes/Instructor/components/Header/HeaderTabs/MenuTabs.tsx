import { Anchor } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import React from 'react';

import {
  trackClick,
  wrapWithHeaderTabs,
} from './utils';



type MenuTabsProps = {
  allowNavigation?: boolean;
};

type HomeLogoProps = {
  small?: boolean;
};

export const HomeLogo: React.FC<HomeLogoProps> = ({ small = false }) => {
  return wrapWithHeaderTabs(
    <a
      href="/"
      onClick={trackClick('topnav_logo')}
      aria-label="Codefluent Home"
      key="home_logo"
    >
      <FaviconIcon color="white" size={small ? 24 : 40} aria-hidden />
    </a>
  );
};

export const MenuTabs: React.FC<MenuTabsProps> = ({ allowNavigation }) => {
  return wrapWithHeaderTabs([
    <Anchor
      variant="interface"
      href="/learn"
      key="user_home"
      data-testid="user-home"
    >
      Home
    </Anchor>,
    // <LESyllabusBrowser allowNavigation={allowNavigation} />,
  ]);
};
