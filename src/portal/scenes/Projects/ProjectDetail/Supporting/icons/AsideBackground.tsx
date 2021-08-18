import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

export type AsideBackgroundProps = {
  fill: string;
};

export const AsideBackground: React.FC<AsideBackgroundProps> = ({
  fill = deprecatedColors.blue[900],
}) => {
  return (
    <svg width="787" height="254">
      <g fill={fill} fillRule="evenodd">
        <path d="M0 0c25.578 15.883 21.474 40.602 47.052 56.484 25.578 15.883 35.609 2.134 61.187 18.019 25.578 15.882 15.547 29.631 41.127 45.514 25.578 15.882 35.609 2.149 61.203 18.033 25.58 15.882 15.531 29.615 41.111 45.497 25.594 15.883 35.625 2.15 61.203 18.033 25.596 15.883 15.55 29.617 41.127 45.5 5.773 3.593 10.78 5.681 15.327 6.92H370V0H0zM370 0h417v254H370z" />
      </g>
    </svg>
  );
};
