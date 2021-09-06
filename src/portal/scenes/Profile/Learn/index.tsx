import "./styles.scss";
import { Header } from "./header";
import { useAuth, useAvatar } from 'store/useAuth';
import { useGetMyProjectsQuery } from 'services/projects';
import type { OrderResponse, ProjectEntityResponse } from 'services/projects';
import { useFetchProjectsQuery } from 'services/projects';
import { projectDetailPath } from "libs/urlHelpers";
import { useFetchCourseViewsQuery, VideoAnalytics } from "services/courses";
import avatarLogo from "static/images/avatar/profile-avatar.png";
import { useAppSelector } from "store/hooks";
import { selectAnalytics } from "state/course/courseSplice";
import { useState, useEffect } from "react";
import { CourseProgress } from './Course';

import { ProjectSection } from "./ProjectSection";
export const Learn = () => {
  const { user } = useAuth()
  const { avatar } = useAvatar()
  const { data: projectsQuery, isLoading } = useGetMyProjectsQuery()
  const { data: projectsMore } = useFetchProjectsQuery()
  const { data: analyticsQuery } = useFetchCourseViewsQuery()
  const analytics = useAppSelector(selectAnalytics)
  const [projects, setProjects] = useState<ProjectEntityResponse[]>()
  const [views, setViews ] = useState<VideoAnalytics[]>(analytics)
  useEffect(() => {
    if (projectsQuery && projectsQuery.length) {
      const rresult: ProjectEntityResponse[] = projectsQuery.map(q => q.project)
      setProjects(rresult)
    }
  }, [projectsQuery])

  useEffect(() => {
        if(analytics) {
          
          setViews(analytics)
        }
  }, [analytics])


  if (!user) return null;
  return (
    <div>
      <Header />
      <div className="spa-route-content cf-page__content">
        <div
          className="container-fluid cf-mt-3 cf-mb-12"
          data-ba="my-progress-page"
        >
          <div className="d-flex align-items-center cf-pb-3">
            <img
              src={avatar ? avatar : avatarLogo}
              className="cf-corners--circle cf-mr-6"
              style={{ height: "48px", width: "48px" }}
            />
            <p className="cf-text--capitalize cf-mr-auto">{user.first_name ? `${user.first_name} ${user.last_name}` : user.username}</p>
            <div className="cf-ml-6">
              <h6 className="cf-text-h6 cf-text--right">0</h6>
              <p className="cf-text-small cf-opacity--hinted">
                Lectures Watched
              </p>
            </div>
            <div className="cf-ml-6">
              <h6 className="cf-text-h6 cf-text--right">0</h6>
              <p className="cf-text-small cf-opacity--hinted">
                Projects Completed
              </p>
            </div>
          </div>
          <hr className="cf-separator cf-mb-6" />
          {projects?.map((proj, index) => {
            return (
              <>
                <h4 className="cf-text-h4">{proj.title}</h4>
                <p className="cf-opacity--muted cf-mb-8">
                  {proj.header?.heading}
                </p>
                <div className="my-progress-row">
                  <div className="row">
                    {proj.courses?.map(course => <CourseProgress key={course.id}  course={course} instructor = { proj.instructor} analytics={views}/>)}
                  </div>
                  <div className="d-flex justify-content-center cf-mt-9">
                    <button
                      className="c-button c-button--secondary c-button--md col-4 col-md-3"
                      data-testid="showAllButton"
                    >
                      SHOW ALL (17)
                    </button>
                  </div>
                </div>

              </>
            );
          })}
         
          <div className="uncontainer" />
          <div className="cf-mb-9">
            <h4 className="cf-text-h4">Checkup Some New Projects</h4>
            <p className="cf-opacity--muted cf-mb-8">
              Master any skill one project at a time
            </p>
            <div className="my-progress-row">
              <div>
                <div className="row">
                  <ProjectSection 
                  projects={projectsMore} 
                  linkCallback={(pro) => projectDetailPath(pro.slug)}/>
                 
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center cf-mt-9">
              <button
                className="c-button c-button--secondary c-button--md col-4 col-md-3"
                data-testid="showAllButton"
              >
                SHOW ALL (16)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
