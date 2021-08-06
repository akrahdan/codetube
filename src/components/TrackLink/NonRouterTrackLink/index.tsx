import cx from 'classnames';
import { isEmpty } from 'lodash';
import React, { FC, HTMLAttributes, useCallback } from 'react';

import { BaseTrackLinkProps } from 'components/TrackLink/types';
import styles from './styles.module.scss';

interface NonRouterTrackLinkProps extends BaseTrackLinkProps {
  trackUserClickCallback: () => void;
}

export const NonRouterTrackLink: FC<NonRouterTrackLinkProps> = ({
  data,
  children,
  asButton,
  onClick,
  trackUserClickCallback,
  ...passThroughProps
}) => {
  const { href, target } = passThroughProps;

  const nonSPAOnClick = useCallback(
    (e: React.MouseEvent) => {
      // if (disableTracking || isEmpty(data)) return;

      e.preventDefault();

      trackUserClickCallback();

      // onClick?.(e);

      // uses href prop because
      // we ONLY want to do this if it is an anchor link
      if (href) {
        const newTab = e.metaKey || e.ctrlKey || target === '_blank';
        if (newTab) {
          window.open(href);
        } else {
          window.location.href = href;
        }
      }
    },
    [data, href, target, trackUserClickCallback, onClick]
  );

  if (href) {
    return (
      <a {...passThroughProps} href={href} onClick={nonSPAOnClick}>
        {children}
      </a>
    );
  }

  // For accessibility, we prefer to use a button on our trackable components without an href
  // This was added after TrackLink so not everything can safely be converted from span to button
  // When adding or reworking components that use TrackLink, please use either asButton, href, or to(Redux First Router Link)
  if (asButton) {
    return (
      <button
        {...passThroughProps}
        type="button"
        className={cx(styles.asButton, passThroughProps.className)}
        onClick={nonSPAOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <span
      {...(passThroughProps as HTMLAttributes<HTMLSpanElement>)}
      onClick={nonSPAOnClick}
    >
      {children}
    </span>
  );
};
