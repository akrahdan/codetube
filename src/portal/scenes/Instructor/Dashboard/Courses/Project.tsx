
import type { CourseResponse } from "services/courses";
import { useAppSelector, useAppDispatch } from "store/hooks";

import { useEffect, useState } from "react";
import { ProjectEntityResponse } from "services/projects";

type ProjectProps = {
 project: ProjectEntityResponse
}


export const Project: React.FC<ProjectProps> = ({ project}) => {

  const [ projectResult, setProjectResult ] = useState<ProjectEntityResponse>(project)

  useEffect(() => {
    setProjectResult(project)
  }, [project])
  return (
    <div className="courses--card--teaching--1ntLN" data-purpose="course-row">
      <div className="courses--card--teaching__image-wrapper--3HgSD">
        <img
          className="courses--card--teaching__image--2vQr2"
          alt=""
          width={118}
          height={118}
          src={projectResult.thumbnail_url}
        />
      </div>
      <div className="fx fx-lt courses--card--teaching__body--1DbyK">
        <div className="courses--card--teaching__details--1Vm_Y">
          <div className="courses--details__name--cFOFy">{ projectResult.title}</div>
          <div className="a11 courses--details__card-status--1QgdN">
            <div className="fx-flex">
              <div className="courses--status-label--2I-yo">{projectResult.state}</div>
              <div className="courses--price-label--3RftA">
                <span>Public</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fx-lt fx courses--card--teaching__metrics--2UhMM">
          <div className="courses--draft-tile--2PVzV courses--col-padded--1i0gC">
            <span className="courses--progress-label--23Lmc">
              Finish your project
            </span>
            <div className="courses--progress-bar--3wzWl">
              <div className="progress-xs progress">
                <div
                  role="progressbar"
                  className="progress-bar"
                  aria-valuenow={2}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: "2%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <a
          href={`/instructor/project/${projectResult.id}/manage/goals`}
          className="courses--card--teaching__link--1NAoM"
        >
          <span
            className="label courses--label--2DONi"
           
          >
            Edit / manage course
          </span>
        </a>
      </div>
    </div>
  );
};
