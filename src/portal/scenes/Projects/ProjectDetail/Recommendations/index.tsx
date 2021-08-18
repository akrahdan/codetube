import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { contentServiceRequest } from 'libs/contentServiceRequest';
import CMSContext from 'portal/scenes/Paths/ContentfulContext';
// import { selectUserJWT } from '~/state/currentUser/selectors';
import { Path } from 'typings/path';
import { Paths } from './sample';
import RecommendationsPresenter from './Recommendations';
import type { ProjectEntityResponse } from 'services/projects';

export type RecommendationsProps = {
  pathId: string;
  related: ProjectEntityResponse[]
};

export const Recommendations: React.FC<RecommendationsProps> = ({ pathId, related }) => {
  const cms = useContext(CMSContext);
  const { other_path_ids: pathIds } = cms;

  const [paths, setPaths] = useState<Path[]>([]);
  

  return <RecommendationsPresenter projects ={related} pathId={pathId} paths={Paths} cms={cms} />;
};
