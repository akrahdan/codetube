import { Box, CardShell } from '@codecademy/gamut';
import { ProLogo } from '@codecademy/gamut-labs';
import { UserClickData } from '@codecademy/tracking';
import cx from 'classnames';
import React from 'react';

import {
  CardDescription,
  CardTag,
  CardTagList,
  CardTitle,
} from 'components/CardElements';
import { LOADING_COLORS, LoadingScreen } from 'components/LoadingScreen';
import { TrackLink } from 'components/TrackLink';
import { ProjectContentItem } from 'typings/entities';

import styles from './styles.module.scss';
import { Course } from 'services/projects';
import { CourseResponse } from 'services/courses';

export type ProjectCardProps = {
  className?: string;
  hoverShadow?: boolean;
  index: number;
  onClick?: React.MouseEventHandler;
  project: CourseResponse;
  trackingData: UserClickData;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  project,
  onClick,
  hoverShadow,
  className,
  trackingData,
}) => {
  const {
    title,
    tags = [],
    id,
    url: img,
    description,
 
  } = project;

  const loadingColor = LOADING_COLORS[index % LOADING_COLORS.length];

  return (
    <div className={styles.container}>
      <LoadingScreen
        hiddenObject={title}
        stretchToFit
        loadingColor={loadingColor}
      />
      <TrackLink
        href={'/'}
        to={"/"}
        target={''}
        asButton
        className={styles.trackLink}
        onClick={onClick}
        data={{ ...trackingData, distinct_id: id }}
      >
        <CardShell
          variant={hoverShadow ? 'hoverable' : 'flat'}
          className={cx(styles.card, className)}
        >
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${img})` }}
          />
          <Box p={16} height="11.5rem" overflow="hidden">
            {<ProLogo variant="cutout" />}
            <CardTitle className={styles.title} as="h2">
              {title}
            </CardTitle>
            <CardDescription className={styles.description} truncateLine={2}>
              {description}
            </CardDescription>
            <CardTagList>
              {tags.map((t) => (
                <CardTag key={t}>{t}</CardTag>
              ))}
            </CardTagList>
          </Box>
        </CardShell>
      </TrackLink>
    </div>
  );
};
