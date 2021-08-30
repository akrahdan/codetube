import React from 'react';

import * as sharedRouteActions from './sharedRouteActions';
import { RootState, store } from 'store';
import { useAppSelector } from 'store/hooks';

export type MetaScene = {
  portalData: unknown;
};

export type RouteMeta = {
  scene: React.ComponentType<MetaScene & any>;

  /**
   * The page_name to use for visit tracking events
   * Specify undefined if the scene will handle visit tracking
   */
  pageName: string | undefined;
};

export const getRouteMetaForLocation = (
  routesMeta: Record<string, RouteMeta>,
  locationType: string,
  statusCode?: number
) => {
  const locType = store?.getState()?.location?.type
  const route = (() => {
    switch (statusCode) {
      case 404:
        return routesMeta[`${sharedRouteActions.error404}`];

      case 500:
        return routesMeta[`${sharedRouteActions.error500}`];
    }

    const scene = routesMeta[locationType];
    if(!scene) {
     
      return routesMeta[locType]
    }
    return scene
  })();

  if (!route) {
    throw new Error(`Could not find equivalent route for '${locationType}'.`);
  }

  return route;
};
