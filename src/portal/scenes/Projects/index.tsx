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
import { SignupSection } from '../SignupSection';
import { SiginSection } from '../SignupSection/SigninSection';
import { SignupModal } from 'portal/scenes/Modal/SignupModal';
import { Payment } from 'portal/scenes/Payments'
import { Modal } from 'portal/scenes/Modal';
import { selectModal, showModal } from 'state/modals/modalSlice';
import { useAuth } from 'store/useAuth';
import { useFetchProjectsQuery, useCartUpdateMutation, Cart } from 'services/projects';

import { ProjectsSection } from './ProjectsSection/ProjectsSection';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const ProjectsContainer = styled(Column)`
  padding-bottom: ${({ theme }) => theme.spacing[64]};
`;

const ProjectsHeading = styled(HeadingDeprecated)`
  margin-top: ${({ theme }) => theme.spacing[24]};
`;

export const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { data: projects } = useFetchProjectsQuery()
  const modal = useAppSelector(selectModal)
  const dispatch = useAppDispatch()
  const [pay, setPay] = useState(false);
  const [cartUpdate] = useCartUpdateMutation()
  const { user } = useAuth();

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
                projects={projects}
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
      {modal == 'signup' && <SignupModal onClose>
        <SignupSection />
      </SignupModal>}

      {modal == 'login' && <SignupModal >
        <SiginSection />
      </SignupModal>}
    </PortalContainer>
  );
};

export default Projects;
