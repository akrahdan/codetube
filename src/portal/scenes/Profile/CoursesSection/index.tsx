import { Anchor, Text } from '@codecademy/gamut';
import { ListSection } from '@codecademy/gamut-labs';
import React, { useEffect, useState } from 'react';

import { catalogPath } from 'libs/urlHelpers';
import { useGetMyProjectsQuery } from 'services/projects';
import type { OrderResponse, ProjectEntityResponse } from 'services/projects';
import { allCourses } from './allCourses';

import { EnrollmentCard } from './EnrollmentCard';
import { EnrollmentLoadingCard } from './EnrollmentLoadingCard';
import { projectApi } from 'services/dist/projects';

export interface Enrollment {
  length: number,
  id: string
}
export type CoursesSectionProps = {
  isCurrentUser: boolean;
  enrollments: Enrollment[];
};



export const CoursesSection: React.FC<CoursesSectionProps> = ({
  isCurrentUser,
  enrollments,
}) => {


  const { data: projectsQuery, isLoading } = useGetMyProjectsQuery()
  const [projects, setProjects] = useState<ProjectEntityResponse[]>()
  const loadingCardsToDisplay =
    enrollments.length > 3 ? enrollments.slice(0, 3) : enrollments;
  const isEmpty = projects?.length === 0;
  const renderEmptyMessage = () => (
    <Text>
      <Anchor
        href={catalogPath}
        onClick={() => console.log()}
        variant="standard"
      >
        Browse our Projects
      </Anchor>{' '}
      to start a course now
    </Text>
  );

  useEffect(() => {
    if (projectsQuery && projectsQuery.length) {
      const rresult: ProjectEntityResponse[] = projectsQuery.map(q => q.project)
      setProjects(rresult)
    }
  }, [projectsQuery])



  const renderContent = (courses) =>
    isEmpty
      ? renderEmptyMessage()
      : courses?.map((course) => (
        <EnrollmentCard
          key={course.id}
          containerProgress={
            {
              percent_complete: 0
            }
          }
          id={course.id}
          title={course.title}

          onEnrollmentClick={(value) => console.log()}
        />
      ));



  const renderProjectConent = () =>
    isEmpty ? renderEmptyMessage()
      : projects?.map((project) => (
        <ListSection
          title={project.title}
          onShowAllOrLessClick={() => console.log()}
        >
          {renderContent(project.courses)}
         
        </ListSection>
      ));

  const renderLoadingState = () =>
    loadingCardsToDisplay.map((enrollment) => (
      <EnrollmentLoadingCard key={`enrollment-loading-card-${enrollment.id}`} />
    ));

  if (!isCurrentUser && isEmpty) return null;
  return (
    <div>
      {isLoading ? renderLoadingState() : renderProjectConent()}
    </div>
  );
};
