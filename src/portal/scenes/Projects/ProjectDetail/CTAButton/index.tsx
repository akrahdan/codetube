import { ButtonDeprecated } from '@codecademy/gamut';
import React, { useContext } from 'react';

import { TrackLink } from 'components/TrackLink';
import CMSContext from 'portal/scenes/Paths/ContentfulContext';

import styles from './styles.module.scss';

export type CTAButtonProps = {
  'data-testid'?: string;
  className?: string;
  context: string;
  isPaidLanding: boolean;
  onClick: () => void;
  pathId: string;
  showTrialCTA: boolean;
  useContentfulCTA: boolean;
};

export const CTAButton: React.FC<CTAButtonProps> = ({
  isPaidLanding,
  pathId,
  onClick,
  showTrialCTA,
  useContentfulCTA,
  context,
  ...otherProps
}) => {
  const { cta_section, header, syllabus } = useContext(CMSContext);
  let cmsContext = cta_section;

  switch (context) {
    case 'header':
      cmsContext = header;
      break;
    case 'syllabus':
      cmsContext = syllabus;
      break;
  }

  const onClickWithContentful = () => {
    onClick();
    
   
  };

  const getText = () => {
    const ctaText = cmsContext?.call_to_action;
    if (useContentfulCTA && ctaText) {
      return ctaText;
    }
   
    return 'Get Started';
  };

  return (
    <TrackLink
      data={{
        context,
        page_name: 'marketingpathlandingpage',
        target: isPaidLanding ? 'paid_trial_landing_upgradetopro' : 'start',
        content_ids: { path_id: pathId },
      }}
     
      onClick={onClickWithContentful}
      {...otherProps}
    >
      <ButtonDeprecated
        className={styles.cta}
        theme="brand-red"
        size="large"
        round
      >
        {getText()}
      </ButtonDeprecated>
    </TrackLink>
  );
};
