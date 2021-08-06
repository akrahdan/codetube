import React from 'react';

import { pathMarketingPageHeroPath } from 'libs/contentAssetPaths';

export type HeroProps = {
  className: string;
  id: string;
};

export const Hero = ({ className, id }: HeroProps) => (
  <img src={pathMarketingPageHeroPath(id)} className={className} alt="" />
);
