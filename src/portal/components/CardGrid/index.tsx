import cx from 'classnames';
import React, { ReactHTML } from 'react';

import styles from './styles.module.scss';

export type CardGridProps = {
  as?: keyof ReactHTML;
  columns?: number;
};

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  as: Element = 'div',
  columns,
}) => {
  return (
    <Element
      className={cx(styles.cardGrid, {
        [styles.fourCol]: columns === 4,
        [styles.threeCol]: columns === 3,
      })}
    >
      {children}
    </Element>
  );
};
