import styles from './styles.module.scss';

import classNames from 'classnames';
export const Section = () => {
  return (
    <>
      <li
     
        className={styles.sectionList}
      >
        <div className={styles.curriculumWrapper}>
          <div className={styles.addItemSection}>
            <div className={styles.listWrapperSection}>
              <button
                aria-label="New curriculum item"
                data-purpose="add-item-inline"
                type="button"
                className={classNames(styles.addItemButton, styles.btnLink, styles.btn)}
              >
                <span className={classNames(styles.addItemIcon, styles.cfi, styles.cfi__close)} />
              </button>
            </div>
          </div>
          <div >
            <div className={styles.itemBarSection}>
              <div className={styles.fx}>
                <div className={styles.fxWrap}>
                  <div className={styles.itemBar}>
                    <div
                      className={classNames(styles.itemBarTitle, styles.fxlc)}
                     
                    >
                      <span
                        className={styles.itemBarStatus}
                        
                      >
                        <span >&nbsp;</span>
                        Section 1:
                      </span>
                      <span className="hidden-xxs ellipsis pl10">
                        <span
                          data-purpose="section-icon"
                          className="pr5 udi udi-file-text-o"
                        />
                        <span>GraphQL Fundamentals</span>
                      </span>
                      <button
                        data-purpose="section-edit-btn"
                        type="button"
                        className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                      >
                        <span className="udi udi-pencil" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        data-purpose="section-delete-btn"
                        type="button"
                        className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                      >
                        <span className="udi udi-trash-o" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                    <div className="visible-xxs ellipsis pb5">
                      <span
                        data-purpose="section-icon"
                        className="pr5 udi udi-file-text-o"
                      />
                      <span>GraphQL Fundamentals</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-bar--item-bar__right--1gA3p">
                <div
                  type="button"
                  className="item-bar--item-bar__handle--1DqDp item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                >
                  <span className="udi udi-bars" />
                  <span className="sr-only">Move</span>
                </div>
              </div>
            </div>
          </div>
          <div className="curriculum-list--add-item-wrapper--2CGL-">
            <div className="curriculum-list--wrapper--2Jw7f">
              <button
                aria-label="New curriculum item"
                data-purpose="add-item-inline"
                type="button"
                className="curriculum-list--add-item--1DK2G add-item--add-item-toggler--1k-rh add-item--lecture--2ZWW9 btn btn-xs btn-link"
              >
                <span className="add-item--icon--2FsmW add-item--rotate--WJ08z udi-small udi udi-close" />
              </button>
            </div>
          </div>
        </div>
      </li>
      <li
        id="lecture27580746"
        className="js-curriculum-item-draggable curriculum-list--curriculum-list__section-item--1hfk_ curriculum-list--curriculum-list__section-item--inline--aFpJo"
      >
        <div className="curriculum-list--item-wrap--1GkZz">
          <div
            data-purpose="lecture-editor"
            className="default-item-editor--item-editor--3GhNq"
          >
            <div className>
              <div className="fx-lt item-icon-button-trigger js-curriculum-item-handle item-bar--item-bar--1qWKU">
                <div className="fx">
                  <div className="fx-lt fxwrap">
                    <div className="item-bar--item-bar__left--1nfEv">
                      <div
                        className="fx-lc item-bar--item-bar__title--3ww0E"
                        data-purpose="item-full-title"
                      >
                        <span
                          className="item-bar--item-bar__status--MZ70P"
                          data-purpose="item-object-index"
                        >
                          <span
                            data-purpose="published-icon"
                            className="text-secondary pr5 udi udi-check-circle"
                          />
                          Lecture 1:
                        </span>
                        <span className="hidden-xxs ellipsis pl10">
                          <span
                            data-purpose="misc-icon"
                            className="pr5 udi udi-file-text-o"
                          />
                          <span>GraphQL Fundamentals</span>
                        </span>
                        <button
                          data-purpose="lecture-edit-btn"
                          type="button"
                          className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                        >
                          <span className="udi udi-pencil" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          data-purpose="lecture-delete-btn"
                          type="button"
                          className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                        >
                          <span className="udi udi-trash-o" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                      <div className="visible-xxs ellipsis pb5">
                        <span
                          data-purpose="misc-icon"
                          className="pr5 udi udi-file-text-o"
                        />
                        <span>GraphQL Fundamentals</span>
                      </div>
                    </div>
                    <div>
                      <button
                        data-purpose="lecture-add-content-btn"
                        aria-label="Add Content"
                        type="button"
                        className="mr10 btn btn-sm btn-default"
                      >
                        + Content
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item-bar--item-bar__right--1gA3p">
                  <button
                    data-purpose="lecture-collapse-btn"
                    type="button"
                    className="item-icon-button--icon-button--1IKG6 item-icon-button--icon-button--always-show--1mM0X btn btn-xs btn-quintinary"
                  >
                    <span className="udi udi-chevron-down" />
                    <span className="sr-only">Expand</span>
                  </button>
                  <div
                    type="button"
                    className="item-bar--item-bar__handle--1DqDp item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                  >
                    <span className="udi udi-bars" />
                    <span className="sr-only">Move</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden default-item-editor--add-content--1wZ-X"
              data-purpose="add-content-wrapper"
            >
              <div
                className="content-tab--content-tab--2ALO8"
                data-purpose="add-content"
              >
                <div className="content-tab--content-tab__header--1K1oU">
                  <div className="content-tab--header__inner--30WeT">
                    Select content type
                    <button
                      data-purpose="content-tab-close"
                      type="button"
                      className="content-tab--header__close--20p2w btn btn-xs btn-tertiary"
                    >
                      <span className="udi udi-close" />
                    </button>
                  </div>
                </div>
                <div className="pl10 pr10 pb10">
                  <div>
                    <p className="text-center a11">
                      Select the main type of content. Files and links can be
                      added as resources.{" "}
                      <a
                        href="https://www.udemy.com/support/229606188/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Learn about content types.
                      </a>
                    </p>
                    <div className="nav-container">
                      <ul className="fx-c fx-wrap nav nav-pills">
                        <li
                          role="presentation"
                          className="content-type-selector--selector-box__option--S_7p_ content-type-selector--option--asset--1RHms content-type-selector--option--rebrand--2Z3X4 content-type-selector--option--icon--12tvm"
                        >
                          <a
                            data-purpose="select-video"
                            href="javascript:void(0)"
                          >
                            <div className="content-type-selector--option__box--2jk9j">
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--before--3d1xd udi udi-play-circle-o" />
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--after--3cT5P udi udi-play-circle-o" />
                              <small className="content-type-selector--option__label--3Wtpk">
                                Video
                              </small>
                            </div>
                          </a>
                        </li>
                        <li
                          role="presentation"
                          className="content-type-selector--selector-box__option--S_7p_ content-type-selector--option--asset--1RHms content-type-selector--option--rebrand--2Z3X4 content-type-selector--option--icon--12tvm"
                        >
                          <a
                            data-purpose="select-videomashup"
                            href="javascript:void(0)"
                          >
                            <div className="content-type-selector--option__box--2jk9j">
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--before--3d1xd udi udi-play-circle-o" />
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--after--3cT5P udi udi-play-circle-o" />
                              <small className="content-type-selector--option__label--3Wtpk">
                                Video &amp; Slide Mashup
                              </small>
                            </div>
                          </a>
                        </li>
                        <li
                          role="presentation"
                          className="content-type-selector--selector-box__option--S_7p_ content-type-selector--option--asset--1RHms content-type-selector--option--rebrand--2Z3X4 content-type-selector--option--icon--12tvm"
                        >
                          <a
                            data-purpose="select-article"
                            href="javascript:void(0)"
                          >
                            <div className="content-type-selector--option__box--2jk9j">
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--before--3d1xd udi udi-file-text-o" />
                              <span className="content-type-selector--option__icon--305N_ content-type-selector--option__icon--after--3cT5P udi udi-file-text-o" />
                              <small className="content-type-selector--option__label--3Wtpk">
                                Article
                              </small>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden default-item-editor--edit-content--HLXOq"
              data-purpose="edit-content-wrapper"
            >
              <div
                className="lecture-editor--edit-content--CgLXg"
                data-purpose="edit-content"
              >
                <div className="pt10 pb10 lecture-editor--edit-content__row--3z9s2">
                  <div className="lecture-editor--edit-content__button-row--3QiBR">
                    <button
                      data-purpose="add-desc-btn"
                      aria-label="Add Description"
                      type="button"
                      className="mr5 btn btn-sm btn-default"
                    >
                      <span className="udi udi-vjs-plus" /> Description
                    </button>
                  </div>
                  <div className="lecture-editor--edit-content__button-row--3QiBR">
                    <button
                      data-purpose="add-resources-btn"
                      aria-label="Add Resources"
                      type="button"
                      className="btn btn-sm btn-default"
                    >
                      <span className="udi udi-vjs-plus" /> Resources
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="curriculum-list--add-item-wrapper--2CGL-">
            <div className="curriculum-list--wrapper--2Jw7f">
              <button
                aria-label="New curriculum item"
                data-purpose="add-item-inline"
                type="button"
                className="curriculum-list--add-item--1DK2G add-item--add-item-toggler--1k-rh add-item--lecture--2ZWW9 btn btn-xs btn-link"
              >
                <span className="add-item--icon--2FsmW add-item--rotate--WJ08z udi-small udi udi-close" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
