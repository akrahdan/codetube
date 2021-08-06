import React from 'react';

import { Footer, FooterSection } from '../Footer';
// import { LENavigation } from '~/platform/components/LENavigation/LENavigation';

import styles from './styles.module.scss';

export type SimpleFooterProps = {
  onClickNext?: () => void;
  buttonText?: string;
  nextDisabled?: boolean;
  customNavigation?: JSX.Element | React.ReactNode;
  customProgressIndicator?: JSX.Element;
};

export const SimpleFooter: React.FC<SimpleFooterProps> = ({
  onClickNext,
  buttonText,
  nextDisabled,
  customNavigation,
  customProgressIndicator,
}) => {
  // const defaultNavigation = (
  //   <LENavigation
  //     next={onClickNext!}
  //     nextDisabled={nextDisabled}
  //     nextButtonText={buttonText}
  //   />
  // );

  return (
    <Footer className={styles.footer}>
      <FooterSection position="left" />
      <FooterSection position="center">{customProgressIndicator}</FooterSection>
      <FooterSection position="right">
       
      </FooterSection>
    </Footer>
  );
};

SimpleFooter.defaultProps = {
  buttonText: 'Next',
};
