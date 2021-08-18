import { ButtonDeprecated, ContentContainer } from '@codecademy/gamut';
import { get } from 'lodash';
import React, { useContext, useState } from 'react';

import { TrackLink } from 'components/TrackLink';
import CMSContext from 'portal/scenes/Paths/ContentfulContext';

import PhoneComputerImage from './images/phone-computer.png';
import styles from './styles.module.scss';

export type ProUpsellProps = {
  pathId: string;
};

export default function ProUpsell(props: ProUpsellProps) {
  const {
    upsell,
    upsell_button_less,
    upsell_button_more,
    upsell_items = [],
  } = useContext(CMSContext);
  const [expanded, setExpanded] = useState(false);

  const hasNoContent = () =>
    !upsell &&
    !upsell_button_less &&
    !upsell_button_more &&
    upsell_items.length === 0;

  if (hasNoContent()) return null;

  return (
    <div>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.container}>
          <div>
            <h1>{get(upsell, 'title')}</h1>
            <p>{get(upsell, 'description')}</p>
            <TrackLink
             href={'/'}
             target={'/'}
             asButton
             to={'/'}
              data={{
                page_name: 'marketingpathlandingpage',
                target: expanded ? 'show_less_pro' : 'learn_more_pro',
                content_ids: { path_id: props.pathId },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <ButtonDeprecated
                className={styles.button}
                outline
                theme="brand-purple"
              >
                {expanded ? upsell_button_less : upsell_button_more}
              </ButtonDeprecated>
            </TrackLink>
          </div>
          <img
            src={PhoneComputerImage}
            alt="Codecademy Pro on desktop and mobile devices"
          />
          {expanded &&
            upsell_items.map(({ title, description }) => (
              <div className={styles.items} key={title}>
                <p>{title}</p>
                <p>{description}</p>
              </div>
            ))}
        </div>
      </ContentContainer>
    </div>
  );
}
