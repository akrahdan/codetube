import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type TagColor = 'blue' | 'green' | 'pink';
export type BottomTagProps = {
  text: string;
  color: TagColor;
};

export const BottomTag: React.FC<BottomTagProps> = ({ text, color }) => {
  return <div className={cx(styles.bottomTag, styles[color])}>{text}</div>;
};
