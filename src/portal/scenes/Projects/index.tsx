import {
  Column,
  ContentContainer,
  HeadingDeprecated,
  LayoutGrid,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { challengeProjectPath, projectDetailPath } from 'libs/urlHelpers';

import { CardGrid } from 'portal/components/CardGrid';
import { PortalContainer } from 'portal/layouts/PortalContainer';


import { useFetchProjectsQuery, useCartUpdateMutation, Cart } from 'services/projects';

import { ProjectsSection } from './ProjectsSection/ProjectsSection';

const ProjectsContainer = styled(Column)`
  padding-bottom: ${({ theme }) => theme.spacing[64]};
`;

const ProjectsHeading = styled(HeadingDeprecated)`
  margin-top: ${({ theme }) => theme.spacing[24]};
`;

export const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const { data: projects } = useFetchProjectsQuery()


  return (
    <PortalContainer
    backgroundColor="beige"
    >
      <ContentContainer as="main">
        <LayoutGrid rowGap={48} columnGap={{ _: 16, md: 32 }}>
          <ProjectsContainer size={12}>
            <ProjectsHeading as="h1" fontSize="xl">
              Coming Soon
            </ProjectsHeading>
            <p>Master any skill a Project at a time</p>
            <CardGrid as="ul" columns={4}>
              <ProjectsSection
                projects= { projects}
                linkCallback={(project) => projectDetailPath(project.slug)}
              
                trackingData={{
                  page_name: 'practice_tab',
                  target: 'challenge_project',
                }}
              />
            </CardGrid>
          </ProjectsContainer>
          
        </LayoutGrid>
      </ContentContainer>
    </PortalContainer>
  );
};

export default Projects;
