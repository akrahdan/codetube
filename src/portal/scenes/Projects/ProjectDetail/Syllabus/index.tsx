import { ContentContainer } from '@codecademy/gamut';
import { get, isEmpty } from 'lodash';
import React, { useContext } from 'react';

import CMSContext from 'portal/scenes/Paths/ContentfulContext';
import { Track } from 'typings/track';

import { CTAButton } from '../CTAButton';
import { Tracks } from '../Tracks';
import { BackgroundArrow } from './icons/BackgroundArrow';
import styles from './styles.module.scss';

export type SyllabusProps = {
  isPaidLanding: boolean;
  showTrialCTA: boolean;
  pathId: string;
  tracks: Track[];
  ctaCallback: () => void;
  useContentfulCTA: boolean;
};

export const Syllabus: React.FC<SyllabusProps> = ({
  pathId,
  tracks,
  ctaCallback,
  isPaidLanding,
  showTrialCTA,
  useContentfulCTA,
}) => {
  const cms = useContext(CMSContext);

  if (isEmpty(tracks)) return null;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundIconContainer}>
        <BackgroundArrow fill={cms.side_shapes_color} />
      </div>
      <ContentContainer>
        <div className={styles.content}>
          <Tracks
            title={get(cms, 'syllabus.heading')}
            id={3}
            trackDetails={tracks}
          />
          {!useContentfulCTA && (
            <CTAButton
              context="syllabus"
              pathId={pathId}
              onClick={ctaCallback}
              showTrialCTA={showTrialCTA}
              useContentfulCTA={useContentfulCTA}
              data-testid="path-syllabus-text-cta"
              isPaidLanding={isPaidLanding}
            />
          )}
        </div>
      </ContentContainer>
    </div>
  );
};
