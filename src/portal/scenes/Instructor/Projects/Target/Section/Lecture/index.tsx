import { useState } from "react";
import classNames from "classnames";

import { SyllabusEdit } from "../SyllabusEdit";
import { useDeleteLectureMutation } from "services/courses";
export const Lecture = ({ syllabus, index, editLecture, handleDelete }) => {
  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [lectureEdit, setLectureEdit] = useState(false);
 
  const [toggleDelete, setToggleDelete] = useState(false);
  const [deleteLecture] = useDeleteLectureMutation();

  return (
    <div
      className="default-item-editor--item-editor--3GhNq"
    >
      {lectureEdit && (
        <SyllabusEdit
          syllabus={syllabus}
          editSyllabus={editLecture}
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
                toggleAdd || toggleEdit,
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
                    {`Item ${index + 1}:`}
                  </span>
                  <span className="hidden-xxs ellipsis pl10">
                    <span
                      data-purpose="misc-icon"
                      className={classNames("pr5 cfi", {
                        "cfi-file-text-o": true
                      })}
                    />
                    <span>{syllabus?.title}</span>
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
                    onClick={handleDelete}
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
                  <span>{syllabus?.title}</span>
                </div>
              </div>
             
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
              data-type="button"
              className="item-bar--item-bar__handle--1DqDp item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
            >
              <span className="cfi cfi-bars" />
              <span className="sr-only">Move</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
