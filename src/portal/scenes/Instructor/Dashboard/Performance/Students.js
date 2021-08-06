import { useEffect } from "react";
export const Students = ({ sideNavToggle, perfNavToggle}) => {
    useEffect(() => {
        sideNavToggle(false)
        perfNavToggle(true)
       
    })
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div data-purpose="students-route">
        <div>
          <div className="ia-responsive-header--container--whwFw">
            <div className="ia-responsive-header--title-dropdown--3N0GS">
              <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
                Students
              </h1>
              <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
            </div>
            <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
            <div className="filter-bar--filters-container--1Hjrm" />
          </div>
          <div>
            <div
              className="students-route--no-students--3Zdr8"
              data-purpose="no-student-metrics"
            >
              <div>
                <h2 className="fx-dc center students-route--no-students-header--3HQhb">
                  No students yet...
                </h2>
                <div className="fx-dc center mt-space-xs">
                  <p className="text-center">
                    Once you publish your course, come here to learn about your
                    students.
                  </p>
                  <a
                    href="/instructor/courses/"
                    className="mt15 btn btn-default"
                  >
                    Go to Instructor Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
