import { get } from 'lodash';
import React, { useContext, useState } from 'react';

import CMSContext from 'portal/scenes/Paths/ContentfulContext';
import { CTAButton } from 'portal/scenes/Paths/PathMarketingPage/CTAButton';
import { Payment } from 'portal/scenes/Payments';
import { Modal } from 'portal/scenes/Modal';
import styles from './styles/Text.module.scss';
import type { ProjectEntityResponse } from 'services/projects';
const description = "Front-end engineers work closely with designers to make websites beautiful, functional, and fast. This Career Path will teach you not only the necessary languages and technologies, but how to think like a front-end engineer, too. By the end, you’ll have the portfolio and interview skills you need to start your new career."
const heading = "Front-End Engineer"

export type TextProps = {
  isPaidLanding: boolean;
  showTrialCTA: boolean;
  project: ProjectEntityResponse
  ctaCallback: () => void;
  isAnonymous: boolean;
  useContentfulCTA: boolean;
};

export const Text = ({
  project,
  ctaCallback,
  isPaidLanding,
  isAnonymous,
  showTrialCTA,
  useContentfulCTA,
}: TextProps) => {
  const { header, pricing } = project

  return (
    <div className={styles.text}>
      <h1 className={styles.title}>
        <span
          className={styles.titleContent}
          data-testid="path-marketing-header-text"
        >
          Project Pricing: {pricing? `${pricing?.currency}${pricing?.amount}` : `$500`}
        </span>
        {get(header, 'heading') || heading}
      </h1>
      <p className={styles.description} data-testid="path-text-description">
        {get(header, 'description',) || description}
      </p>
      {isAnonymous && (
        <p
          className={styles.goalFooterText}
          data-testid="path-page-header-pro-upsell"
        >
          To start this <span className={styles.goalFooter}>{ }</span>{' '}
          Path, sign up for Codefluent.
        </p>
      )}

      <CTAButton
        className={styles.cta}
        context="header"
        pathId={"2"}
        onClick={() => {
          ctaCallback()
         
        }}
        showTrialCTA={showTrialCTA}
        useContentfulCTA={useContentfulCTA}
        isPaidLanding={isPaidLanding}
        data-testid="path-header-text-cta"
      />

     


    </div>
  );
};
