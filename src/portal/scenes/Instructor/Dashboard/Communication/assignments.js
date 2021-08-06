import { useEffect } from "react";
export const Assignments = ({ sideNavToggle, perfNavToggle }) => {
  useEffect(() => {
    sideNavToggle(true);
    perfNavToggle(false)
  });
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div className="ia-responsive-header--container--whwFw">
        <div className="ia-responsive-header--title-dropdown--3N0GS">
          <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
            Assignments
          </h1>
          <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
        </div>
        <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
        <div className="filter-bar--filters-container--1Hjrm">
          <div className="filter-bar--parent-left-options--30uhR">
            <div className="filter-bar--left-options--3Exs7">
              <div className="checkbox">
                <label title>
                  <input name="Unread" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">
                    {" "}
                    Unread (0)
                  </span>
                </label>
              </div>
              <span>
                <span className="description-dropdown--description--28pLr">
                  Sharing preference:
                </span>
                <div className="dropdown btn-group btn-group-quintinary">
                  <button
                    id="sharing-type"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="text-capitalize dropdown-toggle btn btn-quintinary"
                    style={{ paddingRight: "26px" }}
                  >
                    all (0)
                    <span style={{ position: "absolute", right: "12px" }}>
                      <span className="dropdown-caret udi udi-angle-down" />
                    </span>
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="sharing-type"
                  >
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        all (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        instructor only (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        public (0)
                      </a>
                    </li>
                  </ul>
                </div>
              </span>
              <span>
                <span className="description-dropdown--description--28pLr">
                  Feedback type:
                </span>
                <div className="dropdown btn-group btn-group-quintinary">
                  <button
                    id="sharing-type"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="text-capitalize dropdown-toggle btn btn-quintinary"
                    style={{ paddingRight: "26px" }}
                  >
                    all (0)
                    <span style={{ position: "absolute", right: "12px" }}>
                      <span className="dropdown-caret udi udi-angle-down" />
                    </span>
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="sharing-type"
                  >
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        all (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        no feedback (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        student only (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        instructor only (0)
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        student and instructor (0)
                      </a>
                    </li>
                  </ul>
                </div>
              </span>
              <span>
                <span className="description-dropdown--description--28pLr">
                  Sort by:
                </span>
                <div className="dropdown btn-group btn-group-quintinary">
                  <button
                    id="sharing-type"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="text-capitalize dropdown-toggle btn btn-quintinary"
                    style={{ paddingRight: "26px" }}
                  >
                    Newest first
                    <span style={{ position: "absolute", right: "12px" }}>
                      <span className="dropdown-caret udi udi-angle-down" />
                    </span>
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="sharing-type"
                  >
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        Newest first
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href="javascript:void(0)"
                      >
                        Oldest first
                      </a>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden filter-bar--filters-expanded--2NXv4">
          <div className="checkbox">
            <label title>
              <input name="Unread" type="checkbox" />
              <span className="toggle-control-label checkbox-label">
                {" "}
                Unread (0)
              </span>
            </label>
          </div>
          <span>
            <span className="description-dropdown--description--28pLr">
              Sharing preference:
            </span>
            <div className="dropdown btn-group btn-group-quintinary">
              <button
                id="sharing-type"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
                className="text-capitalize dropdown-toggle btn btn-quintinary"
                style={{ paddingRight: "26px" }}
              >
                all (0)
                <span style={{ position: "absolute", right: "12px" }}>
                  <span className="dropdown-caret udi udi-angle-down" />
                </span>
              </button>
              <ul
                role="menu"
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="sharing-type"
              >
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    all (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    instructor only (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    public (0)
                  </a>
                </li>
              </ul>
            </div>
          </span>
          <span>
            <span className="description-dropdown--description--28pLr">
              Feedback type:
            </span>
            <div className="dropdown btn-group btn-group-quintinary">
              <button
                id="sharing-type"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
                className="text-capitalize dropdown-toggle btn btn-quintinary"
                style={{ paddingRight: "26px" }}
              >
                all (0)
                <span style={{ position: "absolute", right: "12px" }}>
                  <span className="dropdown-caret udi udi-angle-down" />
                </span>
              </button>
              <ul
                role="menu"
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="sharing-type"
              >
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    all (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    no feedback (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    student only (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    instructor only (0)
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    student and instructor (0)
                  </a>
                </li>
              </ul>
            </div>
          </span>
          <span>
            <span className="description-dropdown--description--28pLr">
              Sort by:
            </span>
            <div className="dropdown btn-group btn-group-quintinary">
              <button
                id="sharing-type"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
                className="text-capitalize dropdown-toggle btn btn-quintinary"
                style={{ paddingRight: "26px" }}
              >
                Newest first
                <span style={{ position: "absolute", right: "12px" }}>
                  <span className="dropdown-caret udi udi-angle-down" />
                </span>
              </button>
              <ul
                role="menu"
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="sharing-type"
              >
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    Newest first
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    Oldest first
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <div>
        <div className="assignments--empty-state--dE_tU">
          <div className="text-center w100p">
            <img
              alt=""
              width={240}
              height={180}
              className
              src="https://s.udemycdn.com/communication/empty-search.jpg"
              srcSet="https://s.udemycdn.com/communication/empty-search.jpg 1x, https://s.udemycdn.com/communication/empty-search-2x.jpg 2x"
            />
            <h3 className="empty-state--empty-title--27f48">No results</h3>
            <div className="empty-state--empty-text--2ABCu">
              Try a different filter
            </div>
          </div>
        </div>
        <div
          className="pagination-container hidden"
          data-purpose="pagination-container"
        >
          <ul className="pager">
            <li className="disabled previous">
              <a
                href="/instructor/communication/assignments/"
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              >
                <span className="udi udi-previous" />
              </a>
            </li>
            <li className="disabled next">
              <a
                href="/instructor/communication/assignments/?p=2"
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              >
                <span className="udi udi-next" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
