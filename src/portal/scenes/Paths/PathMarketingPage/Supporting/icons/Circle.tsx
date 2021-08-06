import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

import texture from './texture';
import { IconProps } from './types';

const [width, height] = [122, 114];
const heightToWidthRatio = height / width;

export const CircleIcon: React.FC<IconProps> = ({
  primary = deprecatedColors.blue[400],
  size = width,
}) => {
  return (
    <svg
      width={size}
      height={size * heightToWidthRatio}
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
    >
      <defs>
        <pattern
          id="b1"
          width="4"
          height="4"
          x="-6"
          y="2"
          patternUnits="userSpaceOnUse"
        >
          <image
            width="4"
            height="4"
            href={`data:image/png;base64,${texture}`}
          />
        </pattern>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle fill="url(#b1)" cx="53" cy="61" r="53" />
        <circle fill={primary} cx="69" cy="53" r="53" />
      </g>
    </svg>
  );
};
