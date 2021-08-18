import React, { SVGProps } from 'react';

import { CodefluentLogo } from './CodefluentLogo';
import { CodefluentPremiumLogo } from './CodefluentPremiumLogo';
import { CodefluentProAltLogo } from './CodefluentProAltLogo';
import { CodefluentProgramLogo } from './CodefluentProgramLogo';
import { CodefluentProLockupLogo } from './CodefluentProLockupLogo';
import { CodefluentProLogo } from './CodefluentProLogo';
import { CodefluentProMonoLogo } from './CodefluentProMonoLogo';

const defaultProps: LogoProps = {
  height: 32,
  type: 'default',
};

const logos = {
  pro: CodefluentProLogo,
  proAlt: CodefluentProAltLogo,
  proLockup: CodefluentProLockupLogo,
  proMono: CodefluentProMonoLogo,
  program: CodefluentProgramLogo,
  premium: CodefluentPremiumLogo,
  default: CodefluentLogo,
};

export type LogoType =
  | 'default'
  | 'pro'
  | 'proAlt'
  | 'proLockup'
  | 'program'
  | 'proMono'
  | 'premium';

export type LogoProps = SVGProps<SVGSVGElement> & {
  height?: number;
  width?: number;
  type: LogoType;
};

export function Logo({ type, ...props }: LogoProps) {
  const LogoTag = logos[type] || CodefluentLogo;
  return <LogoTag {...props} />;
}

Logo.defaultProps = defaultProps;
