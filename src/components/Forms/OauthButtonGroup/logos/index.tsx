import React from 'react';

import { FacebookLogo } from './facebook';
import { GithubLogo } from './github';
import { GoogleLogo } from './google';
import { LinkedInLogo } from './linkedin';
import { TwitterLogo } from './twitter';

export const SocialLogo = ({
  org,
  size = 18,
}: {
  org: string;
  size?: number;
}) => {
  switch (org) {
    case 'Facebook':
      return <FacebookLogo width={size} height={size} />;
    case 'Github':
      return <GithubLogo width={size} height={size} />;
    case 'Google':
      return <GoogleLogo width={size} height={size} />;
    case 'Twitter':
      return <TwitterLogo width={size} height={size} />;
    case 'LinkedIn':
      return <LinkedInLogo width={size} height={size} />;
    default:
      return null;
  }
};
