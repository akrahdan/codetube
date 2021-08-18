import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

export type BackgroundArrowProps = {
  fill?: string;
};

export const BackgroundArrow: React.FC<BackgroundArrowProps> = ({
  fill = deprecatedColors.green[100],
}) => {
  return (
    <svg width="146" height="212">
      <path
        d="M182.722.75l60.75 105.222-60.75 105.222h-121.5L.472 105.972 61.222.75z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};
