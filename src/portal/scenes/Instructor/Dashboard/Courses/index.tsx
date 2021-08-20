import { useHistory } from "react-router";
import { selectLocationType, selectLocationPayload } from "state/location/selectors";
import { selectCourses } from "state/course/courseSplice";
import { selectProjects } from "state/project/projectSplice";
import { CoursePlayerResponse, useFetchInstructorCoursesQuery } from "services/courses";
import { ProjectEntityResponse, useFetchInstructorProjectsQuery } from "services/projects";
import type { CourseResponse } from "services/courses";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { useEffect, useState } from "react";
import projectLogo from "static/images/instructor/engaging-course.jpeg"

import { Course } from "./Course";
import { Project } from "./Project";
export const Courses = ({ sideNavToggle, perfNavToggle }) => {
  const { push } = useHistory();
  const { data: coursesQuery } = useFetchInstructorCoursesQuery()
  const { data: projectQuery } = useFetchInstructorProjectsQuery()
  const selectedCourses = useAppSelector(selectCourses)
  const selectedProjects = useAppSelector(selectProjects)
  const [courses, setCourses] = useState<CoursePlayerResponse[]>(selectedCourses)
  const [ projects, setProjects] = useState<ProjectEntityResponse[]>(selectedProjects)

  useEffect(() => {
    sideNavToggle(false);
    perfNavToggle(false)
  });

  useEffect(() => {
    setCourses(selectedCourses)
  }, [selectedCourses])

  useEffect(()=> {
    setProjects(selectedProjects)
  }, [selectedProjects])
  return (
    <div className="responsive_container">
      <div className="courses--header--38vYX">
        <h1 className="udlite-heading-serif-xxl">Projects</h1>
        <button
          data-purpose="header-new-course"
          type="button"
          className="visible-xxs visible-xs btn btn-primary"
        >
          New project
        </button>
      </div>
      <div className="instructor-alerts--instructor-alerts--2pNRM" />
      <div className="courses--form-header--2ig8K">
        <form
          data-purpose="search-my-courses"
          className="courses--search-form-wrapper--3ZLNh"
        >
          <div className="courses--search-wrapper--1n0Ss">
            <span className="courses--search--27eDm input-group">
              <input
                placeholder="Search your courses"
                type="text"
                id="query"
                className="form-control"
              />
              <span className="input-group-btn">
                <button
                  id="search-taught-courses"
                  type="submit"
                  aria-label="Search"
                  className="btn btn-secondary"
                >
                  <span className="cfi cfi-search" />
                </button>
              </span>
            </span>
          </div>
          <div className="dropdown btn-group btn-group-quaternary">
            <button
              aria-label="Change the ordering of the courses"
              id="sortOrder"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              className="dropdown-toggle btn btn-quaternary"
              style={{ paddingRight: "26px" }}
            >
              Newest
              <span style={{ position: "absolute", right: "12px" }}>
                <span className="dropdown-caret cfi cfi-angle-down" />
              </span>
            </button>
            <ul
              role="menu"
              className="dropdown-menu"
              aria-labelledby="sortOrder"
            >
              <li role="presentation" className="active">
                <a
                  data-key="-created"
                  id="ordering-0"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Newest
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="created"
                  id="ordering-1"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Oldest
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="title"
                  id="ordering-2"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  A-Z
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="-title"
                  id="ordering-3"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Z-A
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="is_published,-admin_rating,-published_time,-created"
                  id="ordering-4"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Published first
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="-is_published,admin_rating,published_time,created"
                  id="ordering-5"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Unpublished first
                </a>
              </li>
            </ul>
          </div>
        </form>
        <div className="hidden-xxs hidden-xs courses--header-button-wrapper--2TXW4">
          <button
            onClick={() => {
              window.location.replace('/project/create')
            }}
            type="button"
            className="btn btn-primary"
          >
            New project
          </button>
        </div>
      </div>
      <div>
        <div className="view-type-light courses--courses-list--1lGPH">
         {projects && projects.map(project => <Project key={project.id} project={project} />)}
        </div>
      </div>

      <div className="courses--header--38vYX">
        <h1 className="udlite-heading-serif-xxl">Courses</h1>
        <button
          data-purpose="header-new-course"
          type="button"
          className="visible-xxs visible-xs btn btn-primary"
        >
          New course
        </button>
      </div>
      <div className="instructor-alerts--instructor-alerts--2pNRM" />
      <div className="courses--form-header--2ig8K">
        <form
          data-purpose="search-my-courses"
          className="courses--search-form-wrapper--3ZLNh"
        >
          <div className="courses--search-wrapper--1n0Ss">
            <span className="courses--search--27eDm input-group">
              <input
                placeholder="Search your courses"
                type="text"
                id="query"
                className="form-control"
              />
              <span className="input-group-btn">
                <button
                  id="search-taught-courses"
                  type="submit"
                  aria-label="Search"
                  className="btn btn-secondary"
                >
                  <span className="cfi cfi-search" />
                </button>
              </span>
            </span>
          </div>
          <div className="dropdown btn-group btn-group-quaternary">
            <button
              aria-label="Change the ordering of the courses"
              id="sortOrder"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              className="dropdown-toggle btn btn-quaternary"
              style={{ paddingRight: "26px" }}
            >
              Newest
              <span style={{ position: "absolute", right: "12px" }}>
                <span className="dropdown-caret cfi cfi-angle-down" />
              </span>
            </button>
            <ul
              role="menu"
              className="dropdown-menu"
              aria-labelledby="sortOrder"
            >
              <li role="presentation" className="active">
                <a
                  data-key="-created"
                  id="ordering-0"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Newest
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="created"
                  id="ordering-1"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Oldest
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="title"
                  id="ordering-2"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  A-Z
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="-title"
                  id="ordering-3"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Z-A
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="is_published,-admin_rating,-published_time,-created"
                  id="ordering-4"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Published first
                </a>
              </li>
              <li role="presentation" >
                <a
                  data-key="-is_published,admin_rating,published_time,created"
                  id="ordering-5"
                  role="menuitem"
                  tabIndex={-1}
                  href="javascript:void(0)"
                >
                  Unpublished first
                </a>
              </li>
            </ul>
          </div>
        </form>
        <div className="hidden-xxs hidden-xs courses--header-button-wrapper--2TXW4">
          <button
            onClick={() => {
              window.location.replace('/course/create')
            }}
            type="button"
            className="btn btn-primary"
          >
            New course
          </button>
        </div>
      </div>
      <div>
        <div className="view-type-light courses--courses-list--1lGPH">
         {courses && courses.map(course => <Course key={course.id} course={course} />)}
        </div>
      </div>
      <div>
        <div>
          <div>
            <div className="instructor-dashboard--resource-recommendations--mloO1">
              <h2 className="instructor-dashboard--dashboard-resources-title--2bK8N">
                Based on your experience, we think these resources will be
                helpful.
              </h2>
              <div
                className="instructor-dashboard--new-instructor-resources--13KnT"
                data-purpose="new-instructor-resources"
              >
                <div className="instructor-dashboard--resource-panel-primary--2Zcjn panel panel-default">
                  <div className="panel-body">
                    <div className="col-md-5 instructor-dashboard--resource-image-col--2ZkJ2">
                      <img
                        alt=""
                        width={300}
                        height={300}
                        className="instructor-dashboard--resource-image--2vPP8"
                        src={projectLogo}
                        
                      />
                    </div>
                    <div className="col-md-7 p0 instructor-dashboard--resource-description-col--2wfGo">
                      <div className="h2 instructor-dashboard--resource-title--16nub">
                        Create an Engaging Project
                      </div>
                      <p className="instructor-dashboard--resource-text--3objL">
                        Whether you've been teaching for years or are teaching
                        for the first time, you can make an engaging course.
                        We've compiled resources and best practices to help you
                        get to the next level, no matter where you're starting.
                      </p>
                      <a
                        className="udlite-link-underline"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                        <span className="udlite-sr-only">
                          {" "}
                          Create an Engaging Course
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
               
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Courses;
