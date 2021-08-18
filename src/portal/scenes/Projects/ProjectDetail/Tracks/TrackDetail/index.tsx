import React from 'react';

import styles from './styles.module.scss';

export type TrackDetailProps = {
  id: number;
  title: string;
  description?: string;
};

export const TrackDetail: React.FC<TrackDetailProps> = ({
  id,
  title,
  description,
}) => {
  return (
    <div
      className={styles.trackDetailContainer}
      data-testid={`path-marketing-syllabus-track-${id}`}
    >
      <div className={styles.trackDetailNumber}>{id}</div>
      <div className={styles.trackDetailText}>
        <h3 className={styles.trackDetailTitle}>{title}</h3>
        <p className={styles.trackDetailDescription}>{description}</p>
      </div>
    </div>
  );
};
