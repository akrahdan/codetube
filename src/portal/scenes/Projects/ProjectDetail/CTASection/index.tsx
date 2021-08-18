import { ContentContainer } from '@codecademy/gamut';
import { get } from 'lodash';
import React, { useContext } from 'react';

import CMSContext from 'portal/scenes/Paths/ContentfulContext';

import { CTAButton } from '../CTAButton';
import styles from './styles.module.scss';

export type CTASectionProps = {
  isPaidLanding?: boolean;
  showTrialCTA?: boolean;
  pathId: string;
  ctaCallback: () => void;
  useContentfulCTA?: boolean;
};

export const CTASection: React.FC<CTASectionProps> = ({
  pathId,
  ctaCallback,
  isPaidLanding,
  showTrialCTA,
  useContentfulCTA,
}) => {
  const { cta_section } = useContext(CMSContext);

  if (!cta_section) return null;

  return (
    <div className={styles.container}>
      <ContentContainer>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>{get(cta_section, 'heading') || "Join Hundreds of People to become a Pro"}</h1>
          <CTAButton
            context="cta_section"
            pathId={pathId || "3"}
            onClick={ctaCallback}
            showTrialCTA={showTrialCTA}
            useContentfulCTA={useContentfulCTA}
            isPaidLanding={isPaidLanding}
            data-testid="path-footer-text-cta"
          />
        </div>
      </ContentContainer>
    </div>
  );
};
