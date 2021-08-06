import { useHistory } from "react-router";
import { selectLocationType, selectLocationPayload } from "state/location/selectors";
import { selectCourses } from "state/course/courseSplice";
import { useFetchInstructorCoursesQuery } from "services/courses";
import type { CourseResponse } from "services/courses";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { useEffect, useState } from "react";

import { Course } from "./Course";
export const Courses = ({ sideNavToggle, perfNavToggle }) => {
  const { push } = useHistory();
  const { data: coursesQuery } = useFetchInstructorCoursesQuery()

  const selectedCourses = useAppSelector(selectCourses)

  const [courses, setCourses] = useState<CourseResponse[]>(selectedCourses)

  useEffect(() => {
    sideNavToggle(false);
    perfNavToggle(false)
  });

  useEffect(() => {
    setCourses(selectedCourses)
  }, [selectedCourses])
  return (
    <div className="responsive_container">
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
              push('/course/create')
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
                        src="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg"
                        srcSet="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg 1x, https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg 2x"
                      />
                    </div>
                    <div className="col-md-7 p0 instructor-dashboard--resource-description-col--2wfGo">
                      <div className="h2 instructor-dashboard--resource-title--16nub">
                        Create an Engaging Course
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
        <div>
          <h2 className="instructor-dashboard--dashboard-resources-title--2bK8N">
            Have questions? Here are our most popular instructor resources.
          </h2>
          <div className="instructor-dashboard--resource-list--hV49F">
            <div className=" instructor-dashboard--resource-list--resources--3AFwk row">
              <div className="col-xs-6 col-sm-4 col-md-2 instructor-dashboard--resource-col--kqmwT">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <span className="cfi-medium cfi cfi-video-design" />
                  <div className="h4 mb20 udlite-link-underline instructor-dashboard--resource-unit-title--1bw7g">
                    Test Video
                  </div>
                  <small>Send us a sample video and get expert feedback.</small>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-2 instructor-dashboard--resource-col--kqmwT">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cfi-medium cfi cfi-social-media-marketing" />
                  <div className="h4 mb20 udlite-link-underline instructor-dashboard--resource-unit-title--1bw7g">
                    Instructor Community
                  </div>
                  <small>
                    Connect with experienced instructors. Ask questions, browse
                    discussions, and more.
                  </small>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-2 instructor-dashboard--resource-col--kqmwT">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cfi-medium cfi cfi-teaching-tools" />
                  <div className="h4 mb20 udlite-link-underline instructor-dashboard--resource-unit-title--1bw7g">
                    Teaching Center
                  </div>
                  <small>
                    Learn about best practices for teaching on Udemy.
                  </small>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-2 instructor-dashboard--resource-col--kqmwT">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cfi-medium cfi cfi-business" />
                  <div className="h4 mb20 udlite-link-underline instructor-dashboard--resource-unit-title--1bw7g">
                    Marketplace Insights
                  </div>
                  <small>
                    Validate your course topic by exploring our marketplace
                    supply and demand.
                  </small>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-2 instructor-dashboard--resource-col--kqmwT">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cfi-medium cfi cfi-happiness" />
                  <div className="h4 mb20 udlite-link-underline instructor-dashboard--resource-unit-title--1bw7g">
                    Help and Support
                  </div>
                  <small>
                    Browse our Help Center or contact our support team.
                  </small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
