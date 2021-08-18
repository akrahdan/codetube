import { Column, ContentContainer, LayoutGrid } from '@codecademy/gamut';
import React from 'react';

import { PathCard } from 'components/PathCard';
import { TrackLink } from 'components/TrackLink';
import { choosePathPagePath } from 'libs/urlHelpers';
import {
  ContentfulPathLandingPageEntity,
  TitleDescription,
} from 'portal/scenes/Paths/ContentfulContext';
import { Path } from 'typings/path';

import styles from './styles.module.scss';
import { ProjectEntityResponse } from 'services/projects';

export type RecommendationsProps = {
  pathId: string;
  projects: ProjectEntityResponse[],
  paths: Path[];
  cms: Partial<ContentfulPathLandingPageEntity>;
};

export default function Recommendations(props: RecommendationsProps) {
  const {  projects } = props;

  return (
    <ContentContainer>
      <LayoutGrid
        className={styles.container}
        columnGap={{ _: 16, sm: 32 }}
        rowGap={48}
      >
        <Column>
          <h2 className={styles.heading}>{'Upcoming Projects'}</h2>
        </Column>
        {projects.map((project, index) => {
        
          return (
            <Column
              size={{ _: 12, sm: 6, md: 4, lg: 3 }}
              key={project.id}
              offset={{ md: (index + 1) % 2 === 0 ? 0 : 3 }}
            >
              <TrackLink
                target = "/"
                asButton
                to = {'/'}
                href={choosePathPagePath(project.goal)}
                className={styles.recommendationTypeLink}
                data={{
                  page_name: 'marketingpathlandingpage',
                  context: project.goal,
                  target: 'view_more_paths',
                  content_ids: { path_id: project.id },
                }}
              >
                {project.title}
              </TrackLink>
              <PathCard
                project={project}
                trackingData={{
                  page_name: 'marketingpathlandingpage',
                  context: project.id,
                  target: 'recommendation_card',
                  content_ids: { path_id: project.id },
                }}
                isFullSize
              />
            </Column>
          );
        })}
      </LayoutGrid>
    </ContentContainer>
  );
}
