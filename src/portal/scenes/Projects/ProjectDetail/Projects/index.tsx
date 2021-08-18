import { ContentContainer, Video } from '@codecademy/gamut';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardGrid } from 'portal/components/CardGrid';
import { CourseCard } from 'components/CourseCard';
import { contentServiceRequest } from 'libs/contentServiceRequest';
// import { trackUserClick } from '~/libs/eventTracking';
import CMSContext from 'portal/scenes/Paths/ContentfulContext';
// import { selectUserJWT } from '~/state/currentUser/selectors';
import { ProjectContentItem, VideoContentItem } from 'typings/entities';
import { Items, ProjectItems } from './sample';
import { HalfCircle } from './icons/HalfCircle';
import styles from './styles.module.scss';
import type { Course } from 'services/projects';
import { CoursePlayerResponse, CourseResponse } from 'services/courses';

type ContentItemTypes = VideoContentItem | ProjectContentItem;

interface Video {
  id: string;
  type: string;
  video_url: string;
  time: number;
  title: string;
}



export type ProjectProps = {
  courses: CoursePlayerResponse[]
  linkCallback: (project: CoursePlayerResponse) => any;
}

const byProject = (item: ContentItemTypes): item is ProjectContentItem =>
  item.type === 'project';

const byVideo = (item: ContentItemTypes): item is VideoContentItem =>
  item.type === 'video';

export const Projects = ({
  courses,
  linkCallback,
}: ProjectProps) => {
  const {
    content_item_ids: contentIds,
    side_shapes_color: sideShapesColor,
    projects_headline: projectsHeadline,
    video_headline: videoHeadline,
  } = useContext(CMSContext);

  const onCardClicked = (course: CoursePlayerResponse) => {
    window.location = linkCallback(course);
  };

  const [contentItems, setContentItems] = useState<ContentItemTypes[]>([]);
  // const jwt = useSelector(selectUserJWT);

  // useEffect(() => {
  //   (async () => {
  //     if (contentIds) {
  //       const { data } = await contentServiceRequest({
  //         endpoint: 'content-items/search',
  //         version: 1,
  //         data: {
  //           id: contentIds,
  //           minimal: false,
  //         },
  //         method: 'POST',
  //         jwt,
  //       });

  //       setContentItems(data);
  //     }
  //   })();
  // }, [contentIds, jwt]);

  // const renderProjects = () =>
  //   contentItems
  //     .filter(byProject)
  //     .map((project: ProjectContentItem, index: number) => (
  //       <ProjectCard
  //         project={project}
  //         index={index}
  //         key={project.id}
  //         className={styles.projectCard}
  //         trackingData={{ target: 'path_marketing_page_projects' }}
  //         hoverShadow
  //       />
  //     ));

  const renderProjects = () =>
    courses
      .map((course: CoursePlayerResponse, index: number) => (
        <li>
          <CourseCard
            project={course}
            index={index}
            key={course.id}
            onClick={() => onCardClicked(course)}
            className={styles.projectCard}
            trackingData={{ target: 'path_marketing_page_projects' }}
            hoverShadow
          />
        </li>


      ));



  const renderVideos = () =>
    Items.map((video: VideoContentItem) => (
      <div key={video.id} style={{ width: '100%' }}>
        <Video
          videoUrl={video.video_url}
          videoTitle={video.title}
          className={styles.video}
          onPlay={() =>
            // trackUserClick({
            //   page_name: 'marketingpathlandingpage',
            //   context: 'projects_section',
            //   target: 'play_video',
            //   video_url: video.video_url,
            // })
            console.log()}
        />
        <p className={styles.videoTitle}>{video.title}</p>
      </div>
    ));

  const projects = renderProjects();
  const video = renderVideos();

  if (isEmpty(projects) && isEmpty(video)) return null;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundHalfCircle}>
        <HalfCircle fill={sideShapesColor ?? '#C8D7FA'} />
      </div>

      <ContentContainer>
        <div className={styles.contentItemsContainer}>
          {!isEmpty(projects) && (
            <div className={styles.projectContainer}>
              <h2>{projectsHeadline || 'Courses That Are Included'}</h2>
              <div className={styles.displayHorizontal}>
                <CardGrid as="ul" columns={3}>
                  {projects}
                </CardGrid>
              </div>
            </div>
          )}

        </div>
      </ContentContainer>
    </div>
  );
};
