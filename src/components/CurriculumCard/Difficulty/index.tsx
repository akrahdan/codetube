import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type DifficultyProps = {
  difficulty: 0 | 1;
};

export const Difficulty: React.FC<DifficultyProps> = ({ difficulty }) => {
  const text = difficulty === 0 ? 'Beginner friendly' : 'Intermediate';
  return (
    <p className={styles.difficulty}>
      <span className={cx(difficulty >= 0 && styles.filled)} />
      <span className={cx(difficulty >= 1 && styles.filled)} />
      {text}
    </p>
  );
};
