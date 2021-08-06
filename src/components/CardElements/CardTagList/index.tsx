import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type CardTagListProps = {
  className?: string;
  as?: 'ul' | 'ol';
};

export const CardTagList: React.FC<CardTagListProps> = ({
  as: Element = 'ul',
  className,
  children,
}) => {
  return (
    <Element className={cx(styles.tagList, className)}>{children}</Element>
  );
};
