import { colors } from '@codecademy/gamut-styles';
import React from 'react';

import { LogoProCutout } from '../LogoProCutout';
import { LogoProCutoutTransparent } from '../LogoProCutoutTransparent';
import { LogoCourse} from '../LogoCourse';

type BaseProps = {
  ariaLabel?: string;
  backgroundColor?: keyof typeof colors;
  width?: number;
};

export type ProLogoProps =
  | (BaseProps & { variant: 'transparent' })
  | (BaseProps & { variant: 'cutout'; cutoutColor?: keyof typeof colors })
  | (BaseProps & { variant: 'course'; cutoutColor?: keyof typeof colors });

export const ProLogo: React.FC<ProLogoProps> = (props) => {
  if (props.variant === 'cutout') {
    const {
      variant,
      backgroundColor = 'navy',
      cutoutColor = 'white',
      ...forwardedProps
    } = props;
    return (
      <LogoProCutout
        backgroundColor={colors[backgroundColor]}
        cutoutColor={colors[cutoutColor]}
        {...forwardedProps}
      />
    );
  }

  if (props.variant === 'course') {
    const {
      variant,
      backgroundColor = 'navy',
      cutoutColor = 'white',
      ...fProps
    } = props;
    return (
      <LogoCourse
        backgroundColor={colors[backgroundColor]}
        cutoutColor={colors[cutoutColor]}
        {...fProps}
      />
    );
  }

  const { variant, backgroundColor = 'white', ...forwardedProps } = props;
  return (
    <LogoProCutoutTransparent
      backgroundColor={colors[backgroundColor]}
      {...forwardedProps}
    />
  );
};
