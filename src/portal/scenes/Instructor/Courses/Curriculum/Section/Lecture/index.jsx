import { useState } from "react";
import classNames from "classnames";
import { Preview } from "./Preview";
import { LectureEdit } from "./LectureEdit";
import { UploadVideo } from "./UploadVideo";
import { Modal } from "portal/scenes/Modal";
import { DeleteDialog } from "portal/scenes/Dialog/DeleteDialog";
import { Resources } from "./Resources";
import { LectureDescription } from "./LectureDescription";
import { Downloadables } from "./Downloadables";
import { useDeleteLectureMutation } from "services/courses";
export const Lecture = ({ lecture, index, editLecture, editMedia }) => {
  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [lectureEdit, setLectureEdit] = useState(false);
  const [toggleResource, setToggleResource] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [deleteLecture] = useDeleteLectureMutation();

  return (
    <div
      className="default-item-editor--item-editor--3GhNq"
    >
      {lectureEdit && (
        <LectureEdit
          lecture={lecture}
          index={index}
          editLecture={editLecture}
          toggle={() => {
            setLectureEdit(!lectureEdit);
          }}
        />
      )}
      <div className={classNames({ hidden: lectureEdit })}>
        <div
          className={classNames(
            "fx-lt item-icon-button-trigger js-curriculum-item-handle item-bar--item-bar--1qWKU",
            {
              "item-bar--item-bar--expanded--2QfQd":
                toggleAdd || toggleResource || toggleEdit,
            }
          )}
        >
          <div className="fx">
            <div className="fx-lt fxwrap">
              <div className="item-bar--item-bar__left--1nfEv">
                <div
                  className="fx-lc item-bar--item-bar__title--3ww0E"
                  
                >
                  <span
                    className="item-bar--item-bar__status--MZ70P"
                    data-purpose="item-object-index"
                  >
                    <span
                      data-purpose="published-icon"
                      className="text-secondary pr5 cfi cfi-check-circle"
                    />
                    {`Lecture ${index + 1}:`}
                  </span>
                  <span className="hidden-xxs ellipsis pl10">
                    <span
                      data-purpose="misc-icon"
                      className={classNames("pr5 cfi", {
                        "cfi-file-text-o": !lecture.video_url,
                        "cfi-play-circle-o": lecture.video_url,
                      })}
                    />
                    <span>{lecture.title}</span>
                  </span>
                  <button
                    onClick={() => {
                      setLectureEdit(!toggleEdit);
                    }}
                    type="button"
                    className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                  >
                    <span className="cfi cfi-pencil" />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setToggleDelete(!toggleDelete)}
                    className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                  >
                    <span className="cfi cfi-trash-o" />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
                <div className="visible-xxs ellipsis pb5">
                  <span
                    data-purpose="misc-icon"
                    className="pr5 cfi cfi-file-text-o"
                  />
                  <span>{lecture.title}</span>
                </div>
              </div>
              {!toggleAdd && !toggleResource && !lecture.video_url && (
                <div>
                  <button
                    onClick={() => {
                      setToggleAdd(!toggleAdd);
                    }}
                    
                    aria-label="Add Content"
                    type="button"
                    className="mr10 btn btn-sm btn-default"
                  >
                    + Content
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="item-bar--item-bar__right--1gA3p">
            <button
              onClick={() => {
                setToggleEdit(!toggleEdit);
              }}
              data-purpose="lecture-collapse-btn"
              type="button"
              className="item-icon-button--icon-button--1IKG6 item-icon-button--icon-button--always-show--1mM0X btn btn-xs btn-quintinary"
            >
              <span
                className={classNames("cfi", {
                  "cfi-chevron-down": toggleEdit,
                  "cfi-chevron-up": !toggleEdit,
                })}
              />
              <span className="sr-only">Expand</span>
            </button>
            <div
              type="button"
              className="item-bar--item-bar__handle--1DqDp item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
            >
              <span className="cfi cfi-bars" />
              <span className="sr-only">Move</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames("default-item-editor--add-content--1wZ-X", {
          hidden: !toggleAdd && !toggleResource,
        })}
        data-purpose="add-content-wrapper"
      >
        <div className="content-tab--content-tab--2ALO8">
          <div className="content-tab--content-tab__header--1K1oU">
            <div className="content-tab--header__inner--30WeT">
              {toggleResource ? "Add Resources" : "Upload Video"}
              <button
                onClick={() => {
                  toggleResource
                    ? setToggleResource(!toggleResource)
                    : setToggleAdd(!toggleAdd);
                }}
                data-purpose="content-tab-close"
                type="button"
                className="content-tab--header__close--20p2w btn btn-xs btn-tertiary"
              >
                <span className="cfi cfi-close" />
              </button>
            </div>
          </div>
          {toggleResource ? (
            <Resources
              onSuccess={(result) => {
                const resources = [...lecture.resources, ...result];
                editLecture({
                  ...lecture,
                  resources,
                });
                setToggleResource(!toggleResource);
                setToggleEdit(!toggleEdit);
              }}
              toggle={() => {
                setToggleResource(!toggleResource);
                setToggleEdit(!toggleEdit);
              }}
              selectResource={(resource) => {
                const resources = [...lecture.resources, resource.id];
                editLecture({
                  ...lecture,
                  resources,
                });
              }}
            />
          ) : (
            <UploadVideo
              lecture={lecture}
              onSuccess={(result) => {
                editMedia({
                  id: lecture.id,
                  video: result.id,
                  video_url: result.url,
                });
                setToggleAdd(!toggleAdd);
                setToggleEdit(!toggleEdit);
              }}
            />
          )}
        </div>
      </div>
      <div
        className={classNames("default-item-editor--edit-content--HLXOq", {
          hidden: !toggleEdit,
        })}
      >
        <div
          className="lecture-editor--edit-content--CgLXg"
          data-purpose="edit-content"
        >
          {lecture.video_url && (
            <Preview
              media={lecture.video}
              video_url={lecture.video_url}
              setToggle={() => {
                setToggleAdd(!toggleAdd);
                setToggleEdit(!toggleEdit);
              }}
            />
          )}
          {lecture.resources && lecture.resources.length ? (
            <Downloadables
              deleteDownload={(media) => {
                const resources = lecture.resources.filter(
                  (item) => item != media.id
                );
                editLecture({
                  title: lecture.title,
                  id: lecture.id,
                  resources,
                });
              }}
              resources={lecture.resources}
            />
          ) : null}
          <div className="pt10 pb10 lecture-editor--edit-content__row--3z9s2">
            <div className="lecture-editor--edit-content__button-row--3QiBR">
              {toggleDescription ? (
                <LectureDescription setToggle={setToggleDescription} />
              ) : (
                <button
                  onClick={() => setToggleDescription(!toggleDescription)}
                  data-purpose="add-desc-btn"
                  aria-label="Add Description"
                  type="button"
                  className="mr5 btn btn-sm btn-default"
                >
                  <span className="cfi cfi-vjs-plus" /> Description
                </button>
              )}
            </div>
            <div className="lecture-editor--edit-content__button-row--3QiBR">
              <button
                onClick={() => {
                  setToggleResource(!toggleResource);
                  setToggleEdit(!toggleEdit);
                }}
                data-purpose="add-resources-btn"
                aria-label="Add Resources"
                type="button"
                className="btn btn-sm btn-default"
              >
                <span className="cfi cfi-vjs-plus" /> Resources
              </button>
            </div>
          </div>
        </div>
      </div>
      {toggleDelete && (
        <Modal>
          <DeleteDialog
            deleteCallback={() => {
              deleteLecture(lecture.id).then(() =>
                setToggleDelete(!toggleDelete)
              );
            }}
            cancelDelete={() => setToggleDelete(!toggleDelete)}
            text="You are about to remove a course lecture. Are you sure you want to do it?"
          />
        </Modal>
      )}
    </div>
  );
};
