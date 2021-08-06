import { useEffect } from "react";
export const Messages = ({ sideNavToggle, perfNavToggle}) => {
  useEffect(() => {
      sideNavToggle(true)
      perfNavToggle(false)
  })
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div className="ia-responsive-header--container--whwFw">
        <div className="ia-responsive-header--title-dropdown--3N0GS">
          <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
            Messages
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
                    Unread{" "}
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label title>
                  <input name="Important" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">
                    {" "}
                    Important{" "}
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label title>
                  <input name="Unanswered" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">
                    {" "}
                    Not answered{" "}
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label title>
                  <input name="Show automated messages" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">
                    {" "}
                    Show automated messages{" "}
                  </span>
                </label>
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
            <a href="/instructor/communication/messages/compose/">
              <button
                type="button"
                className="messaging--compose-button--1gXGo btn btn-quaternary"
              >
                Compose
              </button>
            </a>
          </div>
        </div>
        <div className="hidden filter-bar--filters-expanded--2NXv4">
          <div className="checkbox">
            <label title>
              <input name="Unread" type="checkbox" />
              <span className="toggle-control-label checkbox-label">
                {" "}
                Unread{" "}
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label title>
              <input name="Important" type="checkbox" />
              <span className="toggle-control-label checkbox-label">
                {" "}
                Important{" "}
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label title>
              <input name="Unanswered" type="checkbox" />
              <span className="toggle-control-label checkbox-label">
                {" "}
                Not answered{" "}
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label title>
              <input name="Show automated messages" type="checkbox" />
              <span className="toggle-control-label checkbox-label">
                {" "}
                Show automated messages{" "}
              </span>
            </label>
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
      <div className="messaging--messaging-content--1uL6t">
        <div className="fx fx-lt two-pane--container--2Ezpk two-pane--container--left-active--1ya1w">
          <div className="two-pane--container__left-pane--b9d60">
            <div className="message-thread-list--thread-list--2ARNF">
              <form className="message-thread-list--search-bar--3MVkF exitable-search-bar--outer--3CpWB">
                <span className="input-group">
                  <input
                    placeholder="Search by keyword, sender name"
                    type="text"
                    id="search-messages"
                    className="exitable-search-bar--search-field--1cErJ form-control"
                    defaultValue
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      aria-label="Search"
                      className="exitable-search-bar--search-button--3ksKn btn btn-default"
                    >
                      <span className="exitable-search-bar--search-icon--5mxlF udi udi-search" />
                    </button>
                  </span>
                </span>
              </form>
              <div className="message-thread-list--thread-list__thread-container---OahW">
                <a href="/instructor/communication/messages/100956182/detail/">
                  <div
                    role="button"
                    tabIndex={0}
                    data-threadid={100956182}
                    className="user-communication-card--communication-card--2NvmY user-communication-card--active--1OYZO"
                  >
                    <div className="user-communication-card--communication-card__container--39pYc">
                      <div className="user-communication-card--communication-card__container__user-info--gQNAt">
                        <div className="user-communication-card--user-initials--23nJ_">
                          <img
                            alt="Louis Sayers"
                            aria-label="Louis Sayers"
                            className="user-avatar user-avatar--image"
                            data-purpose="user-avatar"
                            height={36}
                            width={36}
                            src="https://img-c.udemycdn.com/user/50x50/238790_3849_3.jpg"
                          />
                        </div>
                      </div>
                      <div className="user-communication-card--communication-card__content--3Bkns">
                        <div className="user-communication-card--communication-card__content__top--3UkfK">
                          <div className="fs-exclude user-communication-card--communication-card__content__top__left--Vi2k0">
                            <p className="user-communication-card--communication-card__content__top__left__message--1fNfH">
                              {" "}
                              Hi Samuel, There'll be a way to integrate Neo4j in
                              to there as well - I'd ask on the Neo4j Slack
                              group ( https://neo4j.com/developer/slack/) and
                              google about first to see if someone has put up
                              how they've done the integration, maybe search on
                              StackOverflow. If you struggle to find something,
                              you may need to do some direct querying of Neo4j
                              and populating of your models. Which means you
                              might need to stray away from an ActiveRecord type
                              approach - which might also get a bit confusing
                              when mixing Neo4j ActiveModels and
                              ApplicationRecord models. Hope that helps a
                              bit!&nbsp;One last thought is that you could also
                              have a standalone recommendation service, but of
                              course that complicates the deployment side of
                              things. All the best, Louis{" "}
                            </p>
                          </div>
                          <div
                            className="unread-indicator--outer--RADfz"
                            role="button"
                            tabIndex={-1}
                          >
                            <div className="tooltip-container">
                              <div className="unread-indicator--thread-status--3YhQS unread-indicator--thread-status--read--3mSey" />
                              <div
                                id="tooltip-thread-status--23"
                                data-purpose="base-tooltip"
                                role="tooltip"
                                className="tooltip left"
                              >
                                <div className="tooltip-arrow" />
                                <div className="tooltip-inner">
                                  <div className>mark as unread</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="user-communication-card--communication-card__content__bottom--2bCEd">
                          <p className="user-communication-card--communication-card__content__bottom__name--3F4ch">
                            Louis Sayers
                          </p>
                          <p className="user-communication-card--communication-card__content__bottom__time--1_iYP">
                            3 years ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="/instructor/communication/messages/52432786/detail/">
                  <div
                    role="button"
                    tabIndex={0}
                    data-threadid={52432786}
                    className="user-communication-card--communication-card--2NvmY"
                  >
                    <div className="user-communication-card--communication-card__container--39pYc">
                      <div className="user-communication-card--communication-card__container__user-info--gQNAt">
                        <div className="user-communication-card--user-initials--23nJ_">
                          <img
                            alt="Jordan Hudgens"
                            aria-label="Jordan Hudgens"
                            className="user-avatar user-avatar--image"
                            data-purpose="user-avatar"
                            height={36}
                            width={36}
                            src="https://img-c.udemycdn.com/user/50x50/82487_ca08_5.jpg"
                          />
                        </div>
                      </div>
                      <div className="user-communication-card--communication-card__content--3Bkns">
                        <div className="user-communication-card--communication-card__content__top--3UkfK">
                          <div className="fs-exclude user-communication-card--communication-card__content__top__left--Vi2k0">
                            <p className="user-communication-card--communication-card__content__top__left__message--1fNfH">
                              You: Thanks Jordan, Very grateful
                            </p>
                          </div>
                          <div
                            className="unread-indicator--outer--RADfz"
                            role="button"
                            tabIndex={-1}
                          >
                            <div className="tooltip-container">
                              <div className="unread-indicator--thread-status--3YhQS unread-indicator--thread-status--read--3mSey" />
                              <div
                                id="tooltip-thread-status--24"
                                data-purpose="base-tooltip"
                                role="tooltip"
                                className="tooltip left"
                              >
                                <div className="tooltip-arrow" />
                                <div className="tooltip-inner">
                                  <div className>mark as unread</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="user-communication-card--communication-card__content__bottom--2bCEd">
                          <p className="user-communication-card--communication-card__content__bottom__name--3F4ch">
                            Jordan Hudgens
                          </p>
                          <p className="user-communication-card--communication-card__content__bottom__time--1_iYP">
                            4 years ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="/instructor/communication/messages/22929262/detail/">
                  <div
                    role="button"
                    tabIndex={0}
                    data-threadid={22929262}
                    className="user-communication-card--communication-card--2NvmY"
                  >
                    <div className="user-communication-card--communication-card__container--39pYc">
                      <div className="user-communication-card--communication-card__container__user-info--gQNAt">
                        <div className="user-communication-card--user-initials--23nJ_">
                          <img
                            alt="Jose Portilla"
                            aria-label="Jose Portilla"
                            className="user-avatar user-avatar--image"
                            data-purpose="user-avatar"
                            height={36}
                            width={36}
                            src="https://img-c.udemycdn.com/user/50x50/9685726_67e7_4.jpg"
                          />
                        </div>
                      </div>
                      <div className="user-communication-card--communication-card__content--3Bkns">
                        <div className="user-communication-card--communication-card__content__top--3UkfK">
                          <div className="fs-exclude user-communication-card--communication-card__content__top__left--Vi2k0">
                            <p className="user-communication-card--communication-card__content__top__left__message--1fNfH">
                              Thanks for enrolling!
                            </p>
                          </div>
                          <div
                            className="unread-indicator--outer--RADfz"
                            role="button"
                            tabIndex={-1}
                          >
                            <div className="tooltip-container">
                              <div className="unread-indicator--thread-status--3YhQS unread-indicator--thread-status--read--3mSey" />
                              <div
                                id="tooltip-thread-status--25"
                                data-purpose="base-tooltip"
                                role="tooltip"
                                className="tooltip left"
                              >
                                <div className="tooltip-arrow" />
                                <div className="tooltip-inner">
                                  <div className>mark as unread</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="user-communication-card--communication-card__content__bottom--2bCEd">
                          <p className="user-communication-card--communication-card__content__bottom__name--3F4ch">
                            Jose Portilla
                          </p>
                          <p className="user-communication-card--communication-card__content__bottom__time--1_iYP">
                            4 years ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="two-pane--container__right-pane--2xMVx">
            <div
              className="fx-dc h100p message-thread-detail--container--3jDDz"
              tabIndex={0}
              role="button"
            >
              <div className="fx-lc message-thread-detail--thread-header--2p-YK">
                <a
                  className="message-thread-detail--show-in-single-pane--2Se2V"
                  href="/instructor/communication/messages/100956182/"
                >
                  Back
                </a>
                <div className="fx-dc fx">
                  <div className="fx text-truncate ellipsis p-space-xs">
                    Conversation with Louis Sayers
                  </div>
                  <div className="thread-header__dropdown" />
                </div>
                <div className="message-thread-detail--thread-header__action-button--2HYG_">
                  <div className="dropdown dropdown--open-on-hover dropdown--desktop btn-group btn-group-link">
                    <button
                      aria-label="Conversation actions"
                      id="dropdown-thread-actions--26"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      type="button"
                      className="actions-dropdown--options-dropdown--zpA1U dropdown-toggle btn btn-link"
                    >
                      <span className="udi udi-ellipsis-v" />
                    </button>
                    <ul
                      role="menu"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdown-thread-actions--26"
                    >
                      <li role="presentation" className>
                        <a
                          role="menuitem"
                          tabIndex={-1}
                          href="javascript:void(0)"
                        >
                          <span>Mark as unread</span>
                        </a>
                      </li>
                      <li role="presentation" className>
                        <a
                          role="menuitem"
                          tabIndex={-1}
                          href="javascript:void(0)"
                        >
                          <span>Mark as important</span>
                        </a>
                      </li>
                      <li role="presentation" className>
                        <a
                          role="menuitem"
                          tabIndex={-1}
                          href="javascript:void(0)"
                        >
                          <span>Block</span>
                        </a>
                      </li>
                      <li role="presentation" className>
                        <a
                          role="menuitem"
                          tabIndex={-1}
                          href="javascript:void(0)"
                        >
                          <span>Archive</span>
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          className="dropdown-menu-link"
                          role="menuitem"
                          tabIndex={-1}
                          aria-label="Report abuse"
                          href="javascript:void(0)"
                        >
                          {" "}
                          Report abuse
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="fx preserve-scroll--content--3nogq">
                <div className="fx message-thread-detail--messages--Htree">
                  <div className="text-uppercase text-center mt20 mb20 message-thread-detail--date-divider--2eJzy">
                    Aug 15, 2018
                  </div>
                  <div className="fx-df message-thread-detail--message-outer--3iE12">
                    <a
                      href="/user/louis7/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        alt="Louis Sayers"
                        aria-label="Louis Sayers"
                        className="user-avatar user-avatar--image"
                        data-purpose="user-avatar"
                        height={36}
                        width={36}
                        src="https://img-c.udemycdn.com/user/50x50/238790_3849_3.jpg"
                      />
                    </a>
                    <div className="fx message-thread-detail--message-content--3TkMw">
                      <div className="mb10 message-thread-detail--message-info-bar--2RgoK">
                        <a
                          href="/user/louis7/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="mr15 message-thread-detail--message-info-bar__name--24jIB">
                            Louis Sayers
                          </span>
                        </a>
                        <span>9:55am</span>
                      </div>
                      <div className="fs-exclude">
                        <div data-purpose="safely-set-inner-html:rich-text-viewer:html">
                          Welcome to the course! Did you know that Neo4j is used
                          by Walmart, eBay, Linkedin? You can read more about
                          their customers and how they use Neo4j at
                          neo4j.com/customers. For now, enjoy the course, and
                          let me know if you have any feedback / questions ;)
                          Thanks, Louis
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-uppercase text-center mt20 mb20 message-thread-detail--date-divider--2eJzy">
                    Aug 17, 2018
                  </div>
                  <div className="fx-df message-thread-detail--message-outer--3iE12">
                    <a target="_blank" rel="noopener noreferrer">
                      <div
                        role="img"
                        aria-label="Samuel Akrah"
                        className="user-avatar user-avatar--initials"
                        data-purpose="user-avatar"
                        style={{
                          backgroundColor: "rgb(28, 29, 31)",
                          fontSize: "15px",
                          width: "36px",
                        }}
                      >
                        <div className="user-avatar__inner fx-c">
                          <span className="user-initials">SA</span>
                        </div>
                      </div>
                    </a>
                    <div className="fx message-thread-detail--message-content--3TkMw">
                      <div className="mb10 message-thread-detail--message-info-bar--2RgoK">
                        <a target="_blank" rel="noopener noreferrer">
                          <span className="mr15 message-thread-detail--message-info-bar__name--24jIB">
                            Samuel Akrah
                          </span>
                        </a>
                        <span>11:00am</span>
                      </div>
                      <div className="fs-exclude">
                        <div data-purpose="safely-set-inner-html:rich-text-viewer:html">
                          <p>
                            Hi Louis, I&nbsp;have finished building a rails
                            ecommerce with a PostgreSQL db. How do I integrate
                            neo4j for recommendations. It does seem like the
                            options available require me to switch from the
                            PostgreSQL to neo4j. Is there any other option?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-uppercase text-center mt20 mb20 message-thread-detail--date-divider--2eJzy">
                    Aug 20, 2018
                  </div>
                  <div className="fx-df message-thread-detail--message-outer--3iE12">
                    <a
                      href="/user/louis7/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        alt="Louis Sayers"
                        aria-label="Louis Sayers"
                        className="user-avatar user-avatar--image"
                        data-purpose="user-avatar"
                        height={36}
                        width={36}
                        src="https://img-c.udemycdn.com/user/50x50/238790_3849_3.jpg"
                      />
                    </a>
                    <div className="fx message-thread-detail--message-content--3TkMw">
                      <div className="mb10 message-thread-detail--message-info-bar--2RgoK">
                        <a
                          href="/user/louis7/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="mr15 message-thread-detail--message-info-bar__name--24jIB">
                            Louis Sayers
                          </span>
                        </a>
                        <span>7:16pm</span>
                      </div>
                      <div className="fs-exclude">
                        <div data-purpose="safely-set-inner-html:rich-text-viewer:html">
                          <p>
                            Hi Samuel, <br />
                            <br />
                            There'll be a way to integrate Neo4j in to there as
                            well - I'd ask on the Neo4j Slack group (
                            <a
                              target="_blank"
                              rel="nofollow"
                              href="https://neo4j.com/developer/slack/)"
                            >
                              https://neo4j.com/developer/slack/)
                            </a>{" "}
                            and google about first to see if someone has put up
                            how they've done the integration, maybe search on
                            StackOverflow.
                            <br />
                            <br />
                            If you struggle to find something, you may need to
                            do some direct querying of Neo4j and populating of
                            your models. Which means you might need to stray
                            away from an ActiveRecord type approach - which
                            might also get a bit confusing when mixing Neo4j
                            ActiveModels and ApplicationRecord models.
                            <br />
                            <br />
                            Hope that helps a bit!&nbsp;One last thought is that
                            you could also have a standalone recommendation
                            service, but of course that complicates the
                            deployment side of things.
                            <br />
                            <br />
                            All the best, <br />
                            <br />
                            <br />
                            Louis
                            <br />
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reply-form--reply-form--GZtNK">
                <form className>
                  <label className="sr-only">Message:</label>
                  <div className="fs-exclude form-group">
                    <div className="reply-styling">
                      <div
                        className="rt-editor rt-editor--empty rt-editor--wysiwyg-mode"
                        data-purpose="wysiwyg-mode"
                      >
                        <div
                          contentEditable="true"
                          placeholder="Type your message..."
                          className="ProseMirror"
                          style={{ minHeight: "70px" }}
                        >
                          <p>
                            <br />
                          </p>
                        </div>
                      </div>
                      <div
                        className="rt-menu-bar-container"
                        data-purpose="menu-bar-container"
                      >
                        <div
                          className="rt-menu-bar fx-lt"
                          data-purpose="menu-bar"
                        >
                          <div className="btn-group">
                            <button
                              data-purpose="TOGGLE_STRONG"
                              aria-label="Bold"
                              title="Bold"
                              type="button"
                              className="btn btn-link"
                            >
                              <span className="udi udi-bold" />
                            </button>
                            <button
                              data-purpose="TOGGLE_EM"
                              aria-label="Italic"
                              title="Italic"
                              type="button"
                              className="btn btn-link"
                            >
                              <span className="udi udi-italic" />
                            </button>
                            <button
                              data-purpose="PROMPT_IMAGE_UPLOAD"
                              aria-label="Image"
                              title="Image"
                              type="button"
                              className="btn btn-link"
                            >
                              <span className="udi udi-image" />
                            </button>
                            <button
                              data-purpose="TOGGLE_CODE"
                              aria-label="Code"
                              title="Code"
                              type="button"
                              className="btn btn-link"
                            >
                              <span className="udi udi-curly-braces" />
                            </button>
                          </div>
                          <div className="fx">&nbsp;</div>
                          <div className="btn-group" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="reply-form--button-group--FPLMn">
                    <button
                      type="submit"
                      data-purpose="submit-reply-form-btn"
                      disabled
                      className="text-capitalize btn btn-sm btn-primary"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
