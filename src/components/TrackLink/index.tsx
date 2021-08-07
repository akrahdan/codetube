import cx from 'classnames';
import React, { useCallback } from 'react';
import Link, { To,  } from 'redux-first-router-link';



import { NonRouterTrackLink } from './NonRouterTrackLink';
import styles from './styles.module.scss';
import { BaseTrackLinkProps } from './types';

export interface TrackLinkProps extends BaseTrackLinkProps {
  to?: To;
  underline?: boolean;
}

export const TrackLink: React.FC<TrackLinkProps> = (props) => {
  const { data, underline, ...passThroughProps } = props;

  const className = cx(
    passThroughProps.className,
    !underline && styles.noUnderline
  );

 

  return passThroughProps.to ? (
    <Link
      {...passThroughProps}
      to={passThroughProps.to}
    
      className={className}
    />
  ) : (
    <NonRouterTrackLink
      {...passThroughProps}
      data={data}
      className={className}
      trackUserClickCallback={() => console.log()}
    />
  );
};
