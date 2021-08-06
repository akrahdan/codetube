import { getRouteMetaForLocation } from "libs/location/routing";
import { selectLocationPayload } from "state/location/selectors";
import { routesManageProject } from "portal/routes";

import { ProjectManageHeader } from "./header/projectManageHeader";
import { ManageSidebar } from "./Sidebar/ManageSidebar";

import "./course.scss";

import { useAppSelector } from "store/hooks";
export const CreateProject = () => {
  const locationPayload = useAppSelector(selectLocationPayload);
  const { scene: Scene } = getRouteMetaForLocation(
    routesManageProject,
    locationPayload.slug
  );
  return (
    <div className="ia">
      <ProjectManageHeader />
      <div className="course_manage app--container--7qJMh">
        <ManageSidebar projectId={locationPayload.id} />
        <div className="app--content--3vcMt">
          <Scene />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
