import React from 'react';

export type MetaScene = {
  portalData: unknown;
};

export type RouteMeta = {
  scene: React.ComponentType<MetaScene & any>;


  pageName: string | undefined;
};

export const getRouteComponent = (
  routesMeta: Record<string, RouteMeta>,
  locationType: string,
 
) => {
  const route = (() => {

    return routesMeta[locationType];
  })();

  if (!route) {
    throw new Error(`Could not find equivalent route for '${locationType}'.`);
  }

  return route;
};
