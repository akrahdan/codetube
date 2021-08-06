import { TextDeprecated } from '@codecademy/gamut';
import React from 'react';

import { BottomTag, TagColor } from '../BottomTag/index';
import styles from './styles.module.scss';

export type FooterProps = {
  progressState?: 'completed' | 'inProgress';
  tag?: string;
  tagColor?: TagColor;
};

export const Footer: React.FC<FooterProps> = ({
  progressState,
  tag,
  tagColor,
}) => {
  if (!progressState && tag && tagColor) {
    return <BottomTag text={tag} color={tagColor} />;
  }
  return (
    <div>
      {progressState === 'completed' && (
        <TextDeprecated className={styles.completedTextFooter}>
          Completed
        </TextDeprecated>
      )}
      {progressState === 'inProgress' && (
        <p className={styles.progressText}>
          <span className={styles.serif}>Enrolled...</span>
          <span>Keep Going</span>
        </p>
      )}
    </div>
  );
};
