import React from 'react';

export type HalfCircleProps = {
  fill: string;
};

export const HalfCircle: React.FC<HalfCircleProps> = ({ fill }) => {
  return (
    <svg width="106" height="499">
      <circle
        cx="345.5"
        cy="345.5"
        r="345.5"
        transform="translate(-585 -96)"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};
