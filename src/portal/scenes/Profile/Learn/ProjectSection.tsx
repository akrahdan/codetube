import React from "react";
import { ProjectEntityResponse } from "services/projects";
import { Project } from './Project'
type SectionProps = {
    projects: ProjectEntityResponse[],
    linkCallback: (project: ProjectEntityResponse) => any;
}
export const ProjectSection: React.FC<SectionProps> = ({ projects, linkCallback }) => {

    const onCardClicked = (project: ProjectEntityResponse) => {
        window.location = linkCallback(project);
      };

    return (
        <>
            {projects?.map(proj =>
                <Project
                    key={proj.id}
                    onClick={() => onCardClicked(proj)}
                    project={proj} />)}
        </>
    );
}