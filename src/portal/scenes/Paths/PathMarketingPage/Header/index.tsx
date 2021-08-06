import { ContentContainer } from '@codecademy/gamut';
import React, { useContext } from 'react';
import type { ProjectEntityResponse} from 'services/projects'
import CMSContext from 'portal/scenes/Paths/ContentfulContext';
// import { Path } from '~/typings/entities/path';

import { Card } from './Card';
import { Hero } from './Hero';
import styles from './styles/index.module.scss';
import { Text } from './Text';
import { Wave } from './Wave';
import { WaveTall } from './WaveTall';



export type HeaderProps = {
  isPaidLanding?: boolean;
  project: ProjectEntityResponse,
  showTrialCTA?: boolean;
//   path: Path;
  ctaCallback: () => void;
  isAnonymous?: boolean;
  useContentfulCTA?: boolean;
};

export const Header = ({
//   path,
  ctaCallback,
  project,
  isPaidLanding,
  isAnonymous,
  showTrialCTA,
  useContentfulCTA,
}: HeaderProps) => {

 const { header_primary_color = "rgb(16, 22, 47)",
 header_secondary_color = '#66C4FF',}  = project

  return (
    <div
      className={styles.header}
      style={{ background: header_primary_color }}
      data-testid="path-marketing-header"
    >
      <Hero id={project.id} className={styles.hero} />
      <Wave className={styles.wave} fill={header_secondary_color} />
      <WaveTall className={styles.waveTall} fill={header_secondary_color} />
      <ContentContainer className={styles.content}>
        <Text
          project = {project}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          isAnonymous={isAnonymous}
          showTrialCTA={showTrialCTA}
          useContentfulCTA={useContentfulCTA}
        />
        {<Card project={project} completionTime={project.completion_time} />}
      </ContentContainer>
      
    </div>
  );
};
