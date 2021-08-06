import { HeadingTags } from '@codecademy/gamut';
import { UserClickData } from '@codecademy/tracking';
import { capitalize } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CurriculumCard } from 'components/CurriculumCard';
import type { ProjectEntityResponse } from 'services/projects';
import { PathCardAssetPath } from 'libs/contentAssetPaths';
// import { trackUserImpression } from '~/libs/eventTracking';
import { pathPagePath } from 'libs/urlHelpers';
// import { useSelectorWith } from '~/libs/useSelectorWith';
// import {
//   selectPathEnrollmentIds,
//   selectUserCompletedContainers,
// } from '~/state/currentUser/selectors';
// import { selectFeatureCategoryByIds } from '~/state/entities/categories/selectors';
import { Path } from 'typings/path';

export type PathCardProps = {
  path?: Pick<
    Path,
    | 'id'
    | 'slug'
    | 'title'
    | 'goal'
    | 'difficulty'
    | 'category_ids'
    | 'content_item_type_counts'
  >;
  project: ProjectEntityResponse;
  trackingData: UserClickData;
  useReduxRouter?: boolean;
  isFullSize?: boolean;
  dataTestId?: string;
  headingLevel?: HeadingTags;
  onClick?: () => void;
};

export const PathCard: React.FC<PathCardProps> = ({
  path,
  project,
  trackingData,
  useReduxRouter,
  isFullSize,
  dataTestId,
  headingLevel,
  onClick,
}) => {
  useEffect(() => {
    if (trackingData.page_name === 'article') {
      const { page_name, slug, target } = trackingData;
      // trackUserImpression({ page_name, slug: slug!, target });
    }
  }, [trackingData]);

  // const tag = useSelectorWith(selectFeatureCategoryByIds, path.category_ids);

  const pathHref = pathPagePath(project.slug);
  const linkProps = {
    href: pathHref,
    trackingData,
    onClick,
    ...(useReduxRouter && { routeTo: pathHref }),
  };
 
  // const userEnrolledPathIds = useSelector(selectPathEnrollmentIds);
  // const userCompletedContainerIds = useSelector(selectUserCompletedContainers);
  // const progressState = userCompletedContainerIds?.[path.id]
  //   ? 'completed'
  //   : userEnrolledPathIds?.includes(path.id)
  //   ? 'inProgress'
  //   : undefined;

  const progressState = undefined;

  const difficulty = project.difficulty === 'Intermediate' ? 1 : 0;
  const scope = 'lesson';
  const scopeCount = 28;

  return (
    <CurriculumCard
      image={project.thumbnail_url}
      text={`${capitalize(project.goal)} Path`}
      showProLogo
      title={project.title}
      tag={"React"}
      tagColor={'green'}
      difficulty={1}
      scope={scope}
      scopeCount={scopeCount}
      linkProps={linkProps}
      progressState={progressState}
      isFullSize={true}
      dataTestId={dataTestId || `path-card-${project.slug}`}
      headingLevel={headingLevel}
    />
  );
};
