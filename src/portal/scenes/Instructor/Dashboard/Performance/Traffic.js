import { useEffect } from "react";
export const Traffic = ({ sideNavToggle, perfNavToggle }) => {
    useEffect(() => {
        sideNavToggle(false)
        perfNavToggle(true)
       
    })
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div data-purpose="conversion-route">
        <div>
          <div className="ia-responsive-header--container--whwFw">
            <div className="ia-responsive-header--title-dropdown--3N0GS">
              <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
                Traffic &amp; conversion
              </h1>
              <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
            </div>
            <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
            <div className="filter-bar--filters-container--1Hjrm">
              <div className="filter-bar--parent-left-options--30uhR">
                <div className="filter-bar--left-options--3Exs7">
                  <div className="instructor-analytics--full-width-button--2ltiL">
                    <div className="dropdown btn-group btn-group-sm btn-group-quaternary">
                      <button
                        id="date-filter-dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        type="button"
                        className="instructor-analytics--second-dropdown--2fcT5 dropdown-toggle btn btn-sm btn-quaternary"
                        style={{ paddingRight: "26px" }}
                      >
                        <span className="ellipsis instructor-analytics--dropdown-title--yjkKv">
                          Last 12 months
                        </span>
                        <span style={{ position: "absolute", right: "12px" }}>
                          <span className="dropdown-caret udi udi-angle-down" />
                        </span>
                      </button>
                      <ul
                        role="menu"
                        className="dropdown-menu"
                        aria-labelledby="date-filter-dropdown"
                      >
                        <li role="presentation" className>
                          <a
                            role="menuitem"
                            tabIndex={-1}
                            href="javascript:void(0)"
                          >
                            <span className="ellipsis">Last 7 days</span>
                          </a>
                        </li>
                        <li role="presentation" className>
                          <a
                            role="menuitem"
                            tabIndex={-1}
                            href="javascript:void(0)"
                          >
                            <span className="ellipsis">Last 30 days</span>
                          </a>
                        </li>
                        <li role="presentation" className>
                          <a
                            role="menuitem"
                            tabIndex={-1}
                            href="javascript:void(0)"
                          >
                            <span className="ellipsis">Last 12 months</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden filter-bar--filters-expanded--2NXv4">
              <div className="instructor-analytics--full-width-button--2ltiL">
                <div className="dropdown btn-group btn-group-sm btn-group-quaternary">
                  <button
                    id="date-filter-dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="instructor-analytics--second-dropdown--2fcT5 dropdown-toggle btn btn-sm btn-quaternary"
                    style={{ paddingRight: "26px" }}
                  >
                    <span className="ellipsis instructor-analytics--dropdown-title--yjkKv">
                      Last 12 months
                    </span>
                    <span style={{ position: "absolute", right: "12px" }}>
                      <span className="dropdown-caret udi udi-angle-down" />
                    </span>
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu"
                    aria-labelledby="date-filter-dropdown"
                  >
                    <li role="presentation" className>
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        <span className="ellipsis">Last 7 days</span>
                      </a>
                    </li>
                    <li role="presentation" className>
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        <span className="ellipsis">Last 30 days</span>
                      </a>
                    </li>
                    <li role="presentation" className>
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        <span className="ellipsis">Last 12 months</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2
                className="fx-dc center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                No courses yet...
              </h2>
              <div className="fx-dc center mt-space-xs">
                <p className="text-center">
                  Once you publish your course, come here to learn about your
                  traffic &amp; conversion.
                </p>
                <a href="/instructor/courses/" className="mt15 btn btn-default">
                  Go to Instructor Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;
