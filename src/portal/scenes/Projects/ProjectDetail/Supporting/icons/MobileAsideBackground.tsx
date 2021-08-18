import { deprecatedColors } from '@codecademy/gamut-styles';
import React from 'react';

export type MobileAsideBackgroundProps = {
  fill: string;
};

export const MobileAsideBackground: React.FC<MobileAsideBackgroundProps> = ({
  fill = deprecatedColors.blue[400],
}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 248">
      <path
        d="M360 0c-24.887 15.507-20.894 39.643-45.78 55.15-24.887 15.508-34.647 2.084-59.534 17.593-24.886 15.507-15.127 28.931-40.015 44.439-24.887 15.507-34.647 2.098-59.549 17.607-24.889 15.507-15.111 28.915-40 44.422-24.902 15.508-34.662 2.1-59.549 17.608-24.904 15.507-15.129 28.916-40.015 44.424C9.94 244.753 5.069 246.79.645 248H0V0h360z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};
