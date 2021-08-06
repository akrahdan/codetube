import { useEffect } from "react";

export const Announcements = ({ sideNavToggle, perfNavToggle }) => {
  useEffect(() => {
    sideNavToggle(true);
    perfNavToggle(false)
  });
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div className="ia-responsive-header--container--whwFw">
        <div className="ia-responsive-header--title-dropdown--3N0GS">
          <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
            Announcements
          </h1>
          <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
        </div>
        <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
        <div className="filter-bar--filters-container--1Hjrm" />
      </div>
      <div className="announcements--empty-state--3Ps3b">
        <div className="text-center w100p">
          <img
            alt=""
            width={240}
            height={180}
            className
            src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
            srcSet="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg 1x, https://s.udemycdn.com/communication/empty-mailbox-2x-v2.jpg 2x"
          />
          <h3 className="empty-state--empty-title--27f48">
            No announcements yet
          </h3>
          <div className="empty-state--empty-text--2ABCu">
            <span>
              Here’s where you can send your students a few email announcements
              every month. Use educational emails to support your students’
              learning. Use promotional emails to market your courses.{" "}
              <a
                href="/udemy-teach-hub/marketing_reach_out/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
