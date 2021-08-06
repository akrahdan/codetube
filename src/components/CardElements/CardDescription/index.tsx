import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type CardDescriptionProps = {
  as?: 'p' | 'span' | 'div';
  className?: string;
  testId?: string;
  truncateLine?: 1 | 2 | 3 | 4;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
  testId,
  as: Element = 'p',
  truncateLine,
}) => {
  return (
    <Element
      className={cx(styles.description, className, {
        [styles[`truncateLine_${truncateLine}`]]: truncateLine,
      })}
      data-testid={testId}
    >
      {children}
    </Element>
  );
};
