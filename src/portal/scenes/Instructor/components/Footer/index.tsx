import { AppBar, AppBarSection } from '@codecademy/gamut';
import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type FooterProps = {
  className?: string;
};

export const Footer: React.FC<FooterProps> = ({ children, className }) => {
  const classes = cx(styles.footer, className);

  return (
    <footer>
      <AppBar className={classes} wide>
        {children}
      </AppBar>
    </footer>
  );
};

export type FooterTabProps = {
  className?: string;
};
export const FooterTab: React.FC<FooterTabProps> = ({
  children,
  className,
}) => {
  const classes = cx({
    [styles.footer]: true,
    [`${className}`]: !!className,
  });

  return <div className={classes}>{children}</div>;
};

export { AppBarSection as FooterSection };
