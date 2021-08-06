import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

import texture from './texture';
import { IconProps } from './types';

const [width, height] = [121, 112];
const heightToWidthRatio = height / width;

export const SquareIcon: React.FC<IconProps> = ({
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
          id="b2"
          width="4"
          height="4"
          x="2"
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
      <g fill="none" fillRule="evenodd">
        <path
          fill="url(#b2)"
          transform="rotate(-10 47.596 65.534)"
          d="M8 16h90v90H8z"
        />
        <path
          fill={primary}
          d="M16 15.628L104.633 0l15.628 88.633-88.633 15.628z"
        />
      </g>
    </svg>
  );
};
