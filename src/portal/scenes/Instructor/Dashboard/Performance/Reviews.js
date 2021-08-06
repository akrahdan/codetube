import { useEffect } from "react";
export const Reviews = ({  sideNavToggle, perfNavToggle}) => {
    useEffect(() => {
        sideNavToggle(false)
        perfNavToggle(true)
       
    })
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div>
        <div className="ia-responsive-header--container--whwFw">
          <div className="ia-responsive-header--title-dropdown--3N0GS">
            <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
              Reviews
            </h1>
            <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
          </div>
          <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
          <div className="filter-bar--filters-container--1Hjrm">
            <div className="filter-bar--parent-left-options--30uhR">
              <div className="filter-bar--left-options--3Exs7">
                <div className="checkbox">
                  <label title>
                    <input
                      data-purpose="not-answered-checkbox"
                      type="checkbox"
                    />
                    <span className="toggle-control-label checkbox-label">
                      Not answered
                    </span>
                  </label>
                </div>
                <div className="checkbox">
                  <label title>
                    <input
                      data-purpose="has-commented-checkbox"
                      type="checkbox"
                    />
                    <span className="toggle-control-label checkbox-label">
                      Has a comment
                    </span>
                  </label>
                </div>
                <div>
                  <span className="reviews-route--dropdown-filter-text--1xBZ9">
                    Rating
                  </span>
                  <div
                    data-purpose="star-filter-dropdown"
                    className="reviews-route--star-filter-dropdown--28Py1 dropdown btn-group"
                  >
                    <button
                      id="star-rating-filter-dropdown--1"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      type="button"
                      className="dropdown-toggle btn btn-quintinary"
                      style={{ paddingRight: "26px" }}
                    >
                      All
                      <span style={{ position: "absolute", right: "12px" }}>
                        <span className="dropdown-caret udi udi-angle-down" />
                      </span>
                    </button>
                    <ul
                      role="menu"
                      className="dropdown-menu"
                      aria-labelledby="star-rating-filter-dropdown--1"
                    >
                      <li role="presentation" className>
                        <span className="dropdown-menu-link" role="menuitem">
                          <div className="m0 checkbox">
                            <label title>
                              <input
                                name={1}
                                data-purpose="star-menu-item-1"
                                type="checkbox"
                              />
                              <span className="toggle-control-label checkbox-label">
                                1 star
                              </span>
                            </label>
                          </div>
                        </span>
                      </li>
                      <li role="presentation" className>
                        <span className="dropdown-menu-link" role="menuitem">
                          <div className="m0 checkbox">
                            <label title>
                              <input
                                name={2}
                                data-purpose="star-menu-item-2"
                                type="checkbox"
                              />
                              <span className="toggle-control-label checkbox-label">
                                2 stars
                              </span>
                            </label>
                          </div>
                        </span>
                      </li>
                      <li role="presentation" className>
                        <span className="dropdown-menu-link" role="menuitem">
                          <div className="m0 checkbox">
                            <label title>
                              <input
                                name={3}
                                data-purpose="star-menu-item-3"
                                type="checkbox"
                              />
                              <span className="toggle-control-label checkbox-label">
                                3 stars
                              </span>
                            </label>
                          </div>
                        </span>
                      </li>
                      <li role="presentation" className>
                        <span className="dropdown-menu-link" role="menuitem">
                          <div className="m0 checkbox">
                            <label title>
                              <input
                                name={4}
                                data-purpose="star-menu-item-4"
                                type="checkbox"
                              />
                              <span className="toggle-control-label checkbox-label">
                                4 stars
                              </span>
                            </label>
                          </div>
                        </span>
                      </li>
                      <li role="presentation" className>
                        <span className="dropdown-menu-link" role="menuitem">
                          <div className="m0 checkbox">
                            <label title>
                              <input
                                name={5}
                                data-purpose="star-menu-item-5"
                                type="checkbox"
                              />
                              <span className="toggle-control-label checkbox-label">
                                5 stars
                              </span>
                            </label>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
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
            <div className="filter-bar--right-cta--zHN_E">
              <button
                data-purpose="open-confirm-modal"
                type="button"
                className="btn btn-default btn-block"
              >
                <span className="ellipsis" style={{ maxWidth: "100%" }}>
                  Export to CSV...
                </span>
              </button>
            </div>
          </div>
          <div className="hidden filter-bar--filters-expanded--2NXv4">
            <div className="checkbox">
              <label title>
                <input data-purpose="not-answered-checkbox" type="checkbox" />
                <span className="toggle-control-label checkbox-label">
                  Not answered
                </span>
              </label>
            </div>
            <div className="checkbox">
              <label title>
                <input data-purpose="has-commented-checkbox" type="checkbox" />
                <span className="toggle-control-label checkbox-label">
                  Has a comment
                </span>
              </label>
            </div>
            <div>
              <span className="reviews-route--dropdown-filter-text--1xBZ9">
                Rating
              </span>
              <div
                data-purpose="star-filter-dropdown"
                className="reviews-route--star-filter-dropdown--28Py1 dropdown btn-group"
              >
                <button
                  id="star-rating-filter-dropdown--2"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  className="dropdown-toggle btn btn-quintinary"
                  style={{ paddingRight: "26px" }}
                >
                  All
                  <span style={{ position: "absolute", right: "12px" }}>
                    <span className="dropdown-caret udi udi-angle-down" />
                  </span>
                </button>
                <ul
                  role="menu"
                  className="dropdown-menu"
                  aria-labelledby="star-rating-filter-dropdown--2"
                >
                  <li role="presentation" className>
                    <span className="dropdown-menu-link" role="menuitem">
                      <div className="m0 checkbox">
                        <label title>
                          <input
                            name={1}
                            data-purpose="star-menu-item-1"
                            type="checkbox"
                          />
                          <span className="toggle-control-label checkbox-label">
                            1 star
                          </span>
                        </label>
                      </div>
                    </span>
                  </li>
                  <li role="presentation" className>
                    <span className="dropdown-menu-link" role="menuitem">
                      <div className="m0 checkbox">
                        <label title>
                          <input
                            name={2}
                            data-purpose="star-menu-item-2"
                            type="checkbox"
                          />
                          <span className="toggle-control-label checkbox-label">
                            2 stars
                          </span>
                        </label>
                      </div>
                    </span>
                  </li>
                  <li role="presentation" className>
                    <span className="dropdown-menu-link" role="menuitem">
                      <div className="m0 checkbox">
                        <label title>
                          <input
                            name={3}
                            data-purpose="star-menu-item-3"
                            type="checkbox"
                          />
                          <span className="toggle-control-label checkbox-label">
                            3 stars
                          </span>
                        </label>
                      </div>
                    </span>
                  </li>
                  <li role="presentation" className>
                    <span className="dropdown-menu-link" role="menuitem">
                      <div className="m0 checkbox">
                        <label title>
                          <input
                            name={4}
                            data-purpose="star-menu-item-4"
                            type="checkbox"
                          />
                          <span className="toggle-control-label checkbox-label">
                            4 stars
                          </span>
                        </label>
                      </div>
                    </span>
                  </li>
                  <li role="presentation" className>
                    <span className="dropdown-menu-link" role="menuitem">
                      <div className="m0 checkbox">
                        <label title>
                          <input
                            name={5}
                            data-purpose="star-menu-item-5"
                            type="checkbox"
                          />
                          <span className="toggle-control-label checkbox-label">
                            5 stars
                          </span>
                        </label>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
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
          <div className="instructor-alerts--instructor-alerts--2pNRM">
            <div role="alert" className="with-icon alert alert-info">
              <span className="icon udi udi-exp-information" />
              <div className="content">
                It can take up to 48 hours for approved student ratings to show
                on your course landing page.
              </div>
            </div>
          </div>
          <div className="text-center" data-purpose="no-reviews-found">
            No reviews found
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
