import { TextDeprecated } from '@codecademy/gamut';
import { ProLogo } from '@codecademy/gamut-labs/';
import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type HeaderProps = {
  invertColors?: boolean;
  showProLogo?: boolean;
  text: string;
};

export const Header: React.FC<HeaderProps> = ({
  invertColors,
  showProLogo,
  text,
}) => {
  return (
    <div className={styles.header}>
      <TextDeprecated
        className={cx(styles.text, { [styles.invertedText]: invertColors })}
        as="span"
        fontSize="sm"
      >
        {showProLogo && (
          <div className={styles.logo}>
            <ProLogo
              backgroundColor={invertColors ? 'white' : 'navy'}
              cutoutColor={invertColors ? 'navy' : 'white'}
              data-testid="pro-logo"
              variant="cutout"
            />
          </div>
        )}{' '}
        {text}
      </TextDeprecated>
    </div>
  );
};
