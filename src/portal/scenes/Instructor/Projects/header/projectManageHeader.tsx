import { saveCourse } from "state/course/courseSplice";

import { selectLocationType, selectLocationPayload } from "state/location/selectors";
import { selectCourse } from "state/course/courseSplice";
import { selectProject } from "state/project/projectSplice";
import { useFetchProjectQuery } from "services/projects";
import type { ProjectEntityResponse } from "services/projects";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { useEffect, useState } from "react";


export const ProjectManageHeader = () => {
  const dispatch = useAppDispatch()
  const locationPath = useAppSelector(selectLocationType)
  const locationPayload = useAppSelector(selectLocationPayload)
  const project = useAppSelector(selectProject)
  const [projectUpdate, setProjectUpdate] = useState<ProjectEntityResponse>(project)
  const { data: projectsQuery } = useFetchProjectQuery(locationPayload.id)
 
 
  useEffect(() => {

    setProjectUpdate(project || projectsQuery)
  }, [project, projectsQuery])

  if (!projectUpdate) return null;
  return (
    <>

      <div className="full-page-takeover-header--affix-wrapper--koEW3">
        <div>
          <div />
          <div className="full-page-takeover-header--header--yZv70" style={{}}>
            <div className="full-page-takeover-header--title--x4F1h">
              <a
                className="udlite-in-udheavy full-page-takeover-header--back-button--32gwR"
                href="/instructor/courses"
                aria-label="Back to courses"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="udlite-icon udlite-icon-medium"
                >
                  <use xlinkHref="#icon-previous">
                    <svg id="icon-previous" viewBox="0 0 24 24">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
                    </svg>
                  </use>
                </svg>
                <span className="hidden-xxs hidden-xs hidden-sm hidden-md full-page-takeover-header--back-to-courses--nsJ3P">
                  Back to projects
                </span>
              </a>
              <span
                className="full-page-takeover-header--course-title--3gEaO"
                data-purpose="course-title"
              >
                {projectUpdate.title}
              </span>
              <span className="udlite-in-udheavy full-page-takeover-header--status--2cjmy">
                <span className="udlite-heading-xs">{projectUpdate.state}</span>
              </span>
             
            </div>
            <div className="full-page-takeover-header--actions--2bLjN">
              <div className="udlite-in-udheavy">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(saveCourse({
                      locationPath,
                      submit: true
                    }))

                  }}
                  tabIndex={-1}
                  className="udlite-btn udlite-btn-small udlite-btn-white-solid udlite-heading-sm"
                >
                  <span>Save</span>
                </button>
              </div>
            </div>
            <div className="full-page-takeover-header--menu--30tIM">
              <a href={`/instructor/course/${locationPayload.id}/manage/settings`}>
                <svg
                  aria-label="Course Settings"
                  focusable="false"
                  className="udlite-icon udlite-icon-medium"
                >
                  <use xlinkHref="#icon-settings">
                    <svg id="icon-settings" viewBox="0 0 24 24">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z">
                      </path>
                  </svg>
                  </use>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
