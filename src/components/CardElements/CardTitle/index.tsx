import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type CardTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  testId?: string;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  as: Element = 'h3',
  children,
  className,
  testId,
}) => {
  return (
    <Element className={cx(styles.title, className)} data-testid={testId}>
      {children}
    </Element>
  );
};
