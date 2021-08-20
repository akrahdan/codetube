import { ContentContainer } from '@codecademy/gamut';
import { contentWidths } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import { get } from 'lodash';
import React, { useContext } from 'react';

import CMSContext from 'portal/scenes/Paths/ContentfulContext';

import { ICONS } from '../helpers';
import { AsideBackground } from './icons/AsideBackground';
import { MobileAsideBackground } from './icons/MobileAsideBackground';
import styles from './styles.module.scss';
import type { ProjectEntityResponse } from 'services/projects';



const AsideRunOff = styled.div`
  height: 15.875rem;
  position: absolute;
  top: 0;
  right: 0;
  left: calc(50% + (${contentWidths.md} / 2) - 1rem);
`;

export type SupportProps = {
  project: ProjectEntityResponse
}

export const Supporting = ({ project }: SupportProps) => {
  const {
    
    outcome_headline,
    
    shapes_fill_color = '#66C4FF',
  } = useContext(CMSContext);

  const {
  outcomes } = project
  const header_primary_color  = project.header_primary_color || "rgb(16, 22, 47)"
  const header_secondary_color = project.header_secondary_color || '#66C4FF'
  // if (outcomes.length === 0 && !outcome_headline) return null;

  const renderedAsideContent = (
    <>
      <h2 className={styles.asideTitle}>{get(outcome_headline, 'title')|| "What will you be able to do?"}</h2>
      <p>{get(outcome_headline, 'description')|| "Here a few things you'll be able to do with this skill"}</p>
    </>
  );

  const renderedSupportingPoints = outcomes.map(({ title, description }, i) => {
    const IconComponent = ICONS[i];

    return IconComponent ? (
      <div className={styles.supportingPointContainer} key={title}>
        <IconComponent primary={shapes_fill_color} />
        <h3 className={styles.supportingPointTitle}>{title}</h3>
        <p className={styles.supportingPointDescription}>{description}</p>
      </div>
    ) : null;
  });

  return (
    <>
      <div className={styles.container}>
        <AsideRunOff style={{ backgroundColor: header_primary_color }} />
        <ContentContainer>
          <div className={styles.contentContainer}>
            <div className={cx(styles.asideContainer, styles.showOnDesktop)}>
              <AsideBackground fill={header_primary_color} />
              <div className={styles.asideContent}>{renderedAsideContent}</div>
            </div>
            <div className={styles.showOnMobile}>
              <div
                className={styles.mobileHeader}
                style={{ backgroundColor: header_secondary_color }}
              >
                <span className={styles.mobileWrapper}>
                  {renderedAsideContent}
                </span>
              </div>
              <MobileAsideBackground fill={header_secondary_color} />
            </div>
            <div className={styles.slopeContainer}>
              {renderedSupportingPoints}
            </div>
          </div>
        </ContentContainer>
      </div>
    </>
  );
}
