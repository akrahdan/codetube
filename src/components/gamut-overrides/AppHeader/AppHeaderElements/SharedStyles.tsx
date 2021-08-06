import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const textButtonStyles = css`
  background-color: transparent;
  border: none;
  color: ${colors.navy};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: normal;
  line-height: 1.5;
  min-width: 0;
  width: 100%;
  padding: 0;
  text-align: left;
  white-space: nowrap;
`;

export const focusStyles = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 0.3rem auto ${colors.navy};
  }
`;

export const hoverStyles = css`
  &:hover {
    color: ${colors.navy};
    text-decoration: none;
    cursor: pointer;
  }
`;


export const focusBtnStyles = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 0.3rem auto ${colors['red-400']}
  }
`;

export const hoverBtnStyles = css`
  &:hover {
    color: ${colors.white};
    text-decoration: none;
    cursor: pointer;
    background: ${colors['red-400']}
  }
`;
