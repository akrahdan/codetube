import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type CardTagProps = {
  className?: string;
};

export const CardTag: React.FC<CardTagProps> = ({ children, className }) => {
  return <li className={cx(styles.tag, className)}>{children}</li>;
};
