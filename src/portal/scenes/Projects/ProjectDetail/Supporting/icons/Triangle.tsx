import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

import texture from './texture';
import { IconProps } from './types';

const [width, height] = [120, 104];
const heightToWidthRatio = height / width;

export const TriangleIcon: React.FC<IconProps> = ({
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
          id="b3"
          width="4"
          height="4"
          x="1"
          y="10"
          patternUnits="userSpaceOnUse"
        >
          <image
            width="4"
            height="4"
            href={`data:image/png;base64,${texture}`}
          />
        </pattern>
      </defs>
      <g fillRule="evenodd">
        <path
          fill="url(#b3)"
          transform="rotate(9 111.533 44.633)"
          d="M60.533 16L113 104H7z"
        />
        <path fill={primary} d="M81.64.374L119.695 95.5 15 78.917z" />
      </g>
    </svg>
  );
};
