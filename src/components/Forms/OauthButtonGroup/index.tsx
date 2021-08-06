import { StrokeButton } from '@codecademy/gamut';
import styled from '@emotion/styled';
import cx from 'classnames';
import React from 'react';

import { addParamsAsHash } from 'libs/url';
import {
  facebookAuthenticationUrl,
  githubAuthenticationUrl,
  googleAuthenticationUrl,
  linkedinAuthenticationUrl,
  twitterAuthenticationUrl,
} from 'libs/urlHelpers';
// import loginStrings from '~/localized/login.json';

import { SocialLogo } from './logos';
import styles from './styles/index.module.scss';

const orgConfigs = {
  linkedin: {
    org: 'LinkedIn',
    url: linkedinAuthenticationUrl(),
    signInOnly: false,
  },
  google: {
    org: 'Google',
    url: googleAuthenticationUrl(),
    signInOnly: false,
  },
  facebook: {
    org: 'Facebook',
    url: facebookAuthenticationUrl(),
    signInOnly: false,
  },
  github: {
    org: 'Github',
    url: githubAuthenticationUrl(),
    signInOnly: false,
  },
  twitter: {
    org: 'Twitter',
    url: twitterAuthenticationUrl(),
    signInOnly: true,
  },
};

type Org = keyof typeof orgConfigs;

const defaultOrder: Org[] = [
  'linkedin',
  'google',
  'facebook',
  'github',
  'twitter',
];

const OauthButton = styled(StrokeButton)`
  border-width: 1px;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  width: 65px;
  height: 53px;
  background-color: white;
`;

export type OauthButtonGroupProps = {
  signUp?: boolean;
  urlParams?: {};
  order?: Org[];
  titlePrefix?: string;
  classNames?: {
    heading?: string;
    buttons?: string;
    button?: string;
    buttonTitle?: string;
    buttonContainer?: string;
  };
};

export const OauthButtonGroup: React.FC<OauthButtonGroupProps> = ({
  classNames = {},
  order,
  signUp,
  titlePrefix,
  urlParams,
}) => {
  return (
    <div data-testid="oauth-group">
      <h2 className={cx(styles.heading, classNames.heading)}>
        {/* {signUp ? loginStrings.oauthRegister : loginStrings.oauthLogin} */}
      </h2>
      <div className={cx(styles.btnContainer, classNames.buttons)}>
        {(order || defaultOrder).map((org) => {
          const orgConfig = orgConfigs[org];
          if (orgConfig.signInOnly && signUp) return null;
          return (
            <div
              key={orgConfig.url}
              className={cx(
                styles.btnContainerItem,
                classNames.buttonContainer
              )}
            >
              <OauthButton
                variant="secondary"
                href={addParamsAsHash(orgConfig.url, urlParams || {})}
              >
                <SocialLogo org={orgConfig.org} />
                {titlePrefix && (
                  <span className={cx(classNames.buttonTitle)}>
                    {`${titlePrefix} ${orgConfig.org}`}
                  </span>
                )}
              </OauthButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};
