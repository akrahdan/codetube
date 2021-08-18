import { UserClickData } from '@codecademy/tracking';
import React, { useEffect } from 'react';

import { ProjectCard } from 'components/ProjectCard';

import { ProjectEntityResponse } from 'services/projects';

export type ProjectsSectionProps = {
 
  projects: ProjectEntityResponse[];
  onAccessBlocked?: (project: ProjectEntityResponse) => void;
  canAccessProjects?: boolean;
  linkCallback: (project: ProjectEntityResponse) => any;
  trackingData: UserClickData;
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  canAccessProjects,
  linkCallback,
  onAccessBlocked,
  projects = [],
  trackingData,
}) => {
  


  const onCardClicked = (project: ProjectEntityResponse) => {
    window.location = linkCallback(project);
  };

  return (
    <>
      {projects.map((p, i) => (
        <li key={p.id}>
          <ProjectCard
            project={p}
            index={i}
            onClick={() => onCardClicked(p)}
            hoverShadow
            
          />
        </li>
      ))}
    </>
  );
};
