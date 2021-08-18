import React from 'react';

export type WaveProps = {
  className: string;
  fill: string;
};

export const Wave = ({ className, fill }: WaveProps) => (
  <svg className={className} viewBox="0 0 621 422" width="50%">
    <path
      d="M0 277V0h621c-27.86 17.32-23.39 44.278-51.249 61.6-27.859 17.32-38.784 2.326-66.644 19.649-27.859 17.32-16.934 32.314-44.795 49.635-27.86 17.321-38.785 2.344-66.662 19.666-27.86 17.321-16.916 32.297-44.777 49.618-27.877 17.32-38.803 2.345-66.662 19.666-27.879 17.32-16.936 32.298-44.795 49.619-6.287 3.92-11.741 6.196-16.694 7.547H218c-27.86 17.32-23.39 44.278-51.249 61.6-27.859 17.32-38.784 2.326-66.644 19.649-27.859 17.32-16.934 32.314-44.795 49.635-27.86 17.321-38.785 2.344-66.662 19.666-27.86 17.321-16.916 32.297-44.777 49.618-27.877 17.32-38.803 2.345-66.662 19.666-27.879 17.32-16.936 32.298-44.795 49.619-6.287 3.92-11.741 6.196-16.694 7.547H-185V277H0z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);