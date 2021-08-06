import React, { useState } from 'react';

import { DeferredRender } from 'components/DeferredRender';
import { CardPlaceholderAssetPath } from 'libs/contentAssetPaths';

import styles from './styles.module.scss';

export type ImageProps = {
  image: string;
  progressState?: 'inProgress' | 'completed';
};

export const Image: React.FC<ImageProps> = ({ image, progressState }) => {
  const [error, setError] = useState(false);

  const addDefaultImageSource = (event: React.SyntheticEvent) => {
    if (!error) {
      (event.target as HTMLImageElement).onerror = null;
      (event.target as HTMLImageElement).src = CardPlaceholderAssetPath(
        progressState
      );
      setError(true);
    }
  };

  return (
    <DeferredRender>
      <img
        className={styles.image}
        src={image}
        alt=""
        onError={addDefaultImageSource}
      />
    </DeferredRender>
  );
};
