import { useEffect } from "react";
export const Overview = ({ perfNavToggle, sideNavToggle }) => {
  
    useEffect(() => {
        sideNavToggle(false)
        perfNavToggle(true)
       
    })

  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div>
        <div>
          <div className="ia-responsive-header--container--whwFw">
            <div className="ia-responsive-header--title-dropdown--3N0GS">
              <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
                Overview
              </h1>
              <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
            </div>
            <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
            <div className="filter-bar--filters-container--1Hjrm" />
          </div>
          <div data-purpose="metrics-content">
            <h2 className="mt30">Get top insights about your performance</h2>
            <div className="mt30 instructor-analytics--instructor-overview-panel--eQA-8 panel panel-default">
              <div className="panel-body">
                <div id="top-metrics">
                  <div className="nav-container">
                    <ul role="tablist" className="nav nav-tabs">
                      <li role="presentation" className="active">
                        <a
                          id="top-metrics-tab"
                          role="tab"
                          aria-controls="top-metrics-pane"
                          aria-selected="true"
                          href=""
                        >
                          <div className="instructor-analytics--metrics-data--1S3Nx instructor-analytics--temp-ia-class--26quf">
                            <div>
                              <div className="a11 text-midnight-lighter">
                                Total revenue
                              </div>
                              <div className="h1 m0 text-midnight">$0.00</div>
                              <div className="text-midnight-lighter">
                                $0.00 this month
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          id="top-metrics-tab-[object Object]"
                          role="tab"
                          aria-controls="top-metrics-pane-[object Object]"
                          tabIndex={-1}
                          aria-selected="false"
                          href=""
                        >
                          <div className="instructor-analytics--metrics-data--1S3Nx instructor-analytics--temp-ia-class--26quf">
                            <div>
                              <div className="a11 text-midnight-lighter">
                                Total enrollments
                                <span
                                  aria-describedby="popper8"
                                  tabIndex={0}
                                  className="ml10 instructor-analytics--tooltip-icon--2_EIZ cfi-small cfi cfi-question-circle"
                                />
                                <div className="sr-only" id="popper8" />
                              </div>
                              <div className="h1 m0 text-midnight">0</div>
                              <div className="text-midnight-lighter">
                                0 this month
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li role="presentation" >
                        <a
                          id="top-metrics-tab-[object Object]"
                          role="tab"
                          aria-controls="top-metrics-pane-[object Object]"
                          tabIndex={-1}
                          aria-selected="false"
                          href=""
                        >
                          <div className="instructor-analytics--metrics-data--1S3Nx instructor-analytics--temp-ia-class--26quf">
                            <div>
                              <div className="a11 text-midnight-lighter">
                                Instructor rating
                                <span
                                  aria-describedby="popper9"
                                  tabIndex={0}
                                  className="ml10 instructor-analytics--tooltip-icon--2_EIZ cfi-small cfi cfi-question-circle"
                                />
                                <div className="sr-only" id="popper9" />
                              </div>
                              <div className="h1 m0 text-midnight">0.00</div>
                              <div className="text-midnight-lighter">
                                0 ratings this month
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div
                      id="top-metrics-pane-[object Object]"
                      aria-labelledby="top-metrics-tab-[object Object]"
                      role="tabpanel"
                      aria-hidden="false"
                      className="tab-pane active fade in"
                    >
                      <div>
                        <div className="instructor-analytics--chart--FW_HY">
                          <div>
                            <div className="instructor-analytics--date-filter--1mATk">
                              <div className="instructor-analytics--date-filter-label--1QB4f">
                                Date range:{" "}
                              </div>
                              <div className="dropdown btn-group btn-group-xs btn-group-default">
                                <button
                                  id="date-filter-dropdown"
                                  role="button"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  type="button"
                                  className="instructor-analytics--second-dropdown--2fcT5 dropdown-toggle btn btn-xs btn-default"
                                  style={{ paddingRight: "26px" }}
                                >
                                  Last 12 months
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "12px",
                                    }}
                                  >
                                    <span className="dropdown-caret cfi cfi-angle-down" />
                                  </span>
                                </button>
                                <ul
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="date-filter-dropdown"
                                >
                                  <li role="presentation" >
                                    <a
                                      role="menuitem"
                                      tabIndex={-1}
                                      href=""
                                    >
                                      <span className="ellipsis">
                                        Last 7 days
                                      </span>
                                    </a>
                                  </li>
                                  <li role="presentation" >
                                    <a
                                      role="menuitem"
                                      tabIndex={-1}
                                      href=""
                                    >
                                      <span className="ellipsis">
                                        Last 30 days
                                      </span>
                                    </a>
                                  </li>
                                  <li role="presentation" >
                                    <a
                                      role="menuitem"
                                      tabIndex={-1}
                                      href=""
                                    >
                                      <span className="ellipsis">
                                        Last 12 months
                                      </span>
                                    </a>
                                  </li>
                                  <li role="presentation" >
                                    <a
                                      role="menuitem"
                                      tabIndex={-1}
                                      href=""
                                    >
                                      <span className="ellipsis">All time</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div
                              className="fx-c instructor-analytics--no-data-message--fv4a2"
                              data-purpose="no-data"
                            >
                              No data to display
                            </div>
                          </div>
                        </div>
                        <div
                          className="instructor-analytics--chart-footer--1h4Yp"
                          data-purpose="report-link"
                        >
                          <a
                            href="/revenue-report/"
                            className="btn btn-sm btn-link"
                          >
                            Revenue Report
                            <span className="ml5 cfi cfi-angle-right" />
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
      </div>
    </div>
  );
};

export default Overview;
