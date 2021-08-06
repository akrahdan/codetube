import { Anchor, Text } from '@codecademy/gamut';
import { ListSection } from '@codecademy/gamut-labs';
import React from 'react';

import { catalogPath } from 'libs/urlHelpers';

import { allCourses } from './allCourses';

import { EnrollmentCard } from './EnrollmentCard';
import { EnrollmentLoadingCard } from './EnrollmentLoadingCard';

export interface Enrollment {
    length : number,
    id: string
}
export type CoursesSectionProps = {
  isCurrentUser: boolean;
  enrollments: Enrollment[];
};

const isLoading = false;

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  isCurrentUser,
  enrollments,
}) => {
 
  const isEmpty = allCourses?.length === 0;
  const loadingCardsToDisplay =
    enrollments.length > 3 ? enrollments.slice(0, 3) : enrollments;

  const renderEmptyMessage = () => (
    <Text>
      <Anchor
        href={catalogPath}
        onClick={() => console.log()}
        variant="standard"
      >
        Browse our catalog
      </Anchor>{' '}
      to start a course now
    </Text>
  );

  const renderContent = () =>
    isEmpty
      ? renderEmptyMessage()
      : allCourses?.map((course) => (
          <EnrollmentCard
            key={course.id}
            id={course.id}
           
            onEnrollmentClick={(value) => console.log()}
          />
        ));

  const renderLoadingState = () =>
    loadingCardsToDisplay.map((enrollment) => (
      <EnrollmentLoadingCard key={`enrollment-loading-card-${enrollment.id}`} />
    ));

  if (!isCurrentUser && isEmpty) return null;
  return (
    <ListSection
      title="Latest Courses"
      onShowAllOrLessClick={() => console.log()}
    >
      {isLoading ? renderLoadingState() : renderContent()}
    </ListSection>
  );
};
