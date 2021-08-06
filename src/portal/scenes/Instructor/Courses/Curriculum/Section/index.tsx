import { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.scss";
import { Lecture } from "./Lecture";
import { LectureCreate } from "./Lecture/lectureCreate";
import { SectionCreate } from "./SectionCreate";
import { SectionEdit } from "./SectionEdit";
import { Modal } from "portal/scenes/Modal";
import { DeleteDialog } from "portal/scenes/Dialog/DeleteDialog";
import { selectLectures } from "state/curriculum/currriculumSplice";
import { useAppSelector } from "store/hooks";
import { useDeleteSectionMutation, useCreateLectureMutation, useEditLectureMutation, useFetchLecturesQuery } from 'services/courses';

export const Section = ({ addSection, sectionResult, index, editSection }) => {
  const [lecture, setLecture] = useState("");
  const [section, setSection] = useState("");
  const [sectionEdit, setSectionEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false)
  const [deleteSection] = useDeleteSectionMutation()
  const [editLecture] = useEditLectureMutation()
  const [createLecture] = useCreateLectureMutation()
  const { data } = useFetchLecturesQuery(sectionResult.id)
  const selectedLectures = useAppSelector(selectLectures)
  const [lectures, setLectures] = useState(selectedLectures);

  useEffect(() => {
    const sectionLectures = selectedLectures && selectedLectures.filter(lec => lec.section == sectionResult.id)
    if (sectionLectures) {
      setLectures(sectionLectures)
    }
  }, [selectedLectures])

  return (
    <>
      <li className="js-curriculum-item-draggable curriculum-list--curriculum-list__section--2SsIO curriculum-list--curriculum-list__section--inline--2E-oq">
        <div className="curriculum-list--item-wrap--1GkZz">
          <div className="curriculum-list--add-item-section-wrapper--bXWiB">
            <div
              className={classNames("curriculum-list--wrapper-section--3v7bx", {
                "curriculum-list--open--VjfTb": section == "newSection01",
              })}
            >
              <button
                id={"newSection01"}
                aria-label="New curriculum item"
                onClick={(event) => {
                  const target = event.target as Element
                  setSection(target.id);
                }}
                type="button"
                className={classNames(
                  "curriculum-list--add-item-section--3JmsU add-item--add-item-toggler--1k-rh add-item--section--1_IVB btn btn-xs btn-link",
                  { "add-item--open--2FcI6": section == "newSection01" }
                )}
              >
                <span
                  className={classNames(
                    "add-item--icon--2FsmW cfi-small cfi cfi-close",
                    {
                      "add-item--open--2FcI6": section == "newSection01",
                      "add-item--rotate--WJ08z": section != "newSection01",
                    }
                  )}
                />
              </button>
            </div>
            {section == "newSection01" && (
              <SectionCreate
                index={index}
                position="above"
                addSection={addSection}
                className={"curriculum-list--over-section--1DyMX"}
                toggle={() => setSection("")}
              />
            )}
          </div>
          <div data-purpose="section-editor">
            {sectionEdit && (
              <SectionEdit
                index={index}
                editSection={editSection}
                section={sectionResult}
                toggle={() => setSectionEdit(!sectionEdit)}
              />
            )}
            <div className="fx-lt item-icon-button-trigger js-curriculum-item-handle item-bar--item-bar--1qWKU item-bar--item-bar--section--3aQ_4">
              <div className="fx">
                <div className="fx-lt fxwrap">
                  <div className="item-bar--item-bar__left--1nfEv">
                    <div className="fx-lc item-bar--item-bar__title--3ww0E">
                      <span className="item-bar--item-bar__status--MZ70P">
                        <span data-purpose="empty-status-icon">&nbsp;</span>
                        {`Section ${index + 1}:`}
                      </span>
                      <span className="hidden-xxs ellipsis pl10">
                        <span className="pr5 cfi cfi-file-text-o" />
                        <span>{sectionResult.title}</span>
                      </span>
                      <button
                        onClick={() => {
                          setSectionEdit(!sectionEdit);
                        }}
                        data-purpose="section-edit-btn"
                        type="button"
                        className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                      >
                        <span className="cfi cfi-pencil" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => setToggleDelete(!toggleDelete)}
                        type="button"
                        className="item-icon-button--icon-button--1IKG6 btn btn-xs btn-quintinary"
                      >
                        <span className="cfi cfi-trash-o" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                    <div className="visible-xxs ellipsis pb5">
                      <span
                        data-purpose="section-icon"
                        className="pr5 cfi cfi-file-text-o"
                      />
                      <span>GraphQL Fundamentals</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-bar--item-bar__right--1gA3p">
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
          <div className="curriculum-list--add-item-wrapper--2CGL-">
            <div
              className={classNames("curriculum-list--wrapper--2Jw7f", {
                "curriculum-list--open--VjfTb": lecture == "newLecture01",
              })}
            >
              <button
                id={"newLecture01"}
                onClick={(event) => {
                  const target = event.target as Element
                  setLecture(target.id);
                }}
                aria-label="New curriculum item"
                type="button"
                className={classNames(
                  "curriculum-list--add-item--1DK2G add-item--add-item-toggler--1k-rh add-item--lecture--2ZWW9 btn btn-xs btn-link",
                  {
                    "add-item--open--2FcI6": lecture == "newLecture1",
                  }
                )}
              >
                <span
                  className={classNames(
                    "add-item--icon--2FsmW  cfi-small cfi cfi-close",
                    {
                      "add-item--rotate--WJ08z": lecture != "newLecture01",
                      "add-item--open--2FcI6": lecture == "newLecture01",
                    }
                  )}
                />
              </button>
            </div>
            <div>
              {lecture == "newLecture01" && (
                <LectureCreate
                  position='above'
                  handleChange={(value) => {
                    var id = null
                    if(lectures && lectures.length) {
                      id = lectures[0].id
                    }
                    
                    createLecture({
                      title: value.title,
                      position: value.position,
                      neighbor: id,
                      section: sectionResult.id
                    })
                  }}
                  toggle={() => setLecture("")}
                />
              )}
            </div>
          </div>
        </div>
      </li>
      {lectures &&
        lectures.map((lec, index) => (
          <li
            id={`${index}`}
            key={index}
            className="js-curriculum-item-draggable curriculum-list--curriculum-list__section-item--1hfk_ curriculum-list--curriculum-list__section-item--inline--aFpJo"
          >
            <div className="curriculum-list--item-wrap--1GkZz">
              <Lecture lecture={lec} index={index} editMedia={result => {
                editLecture({
                  id: result.id,
                  title: lec.title,
                  video: result.video,
                  video_url: result.video_url
                })
              }} editLecture={value => editLecture({
                title: value.title,
                id: value.id,
                resources: value.resources,
                section: sectionResult.id
              })}/>
              <div className="curriculum-list--add-item-wrapper--2CGL-">
                <div
                  className={classNames("curriculum-list--wrapper--2Jw7f", {
                    "curriculum-list--open--VjfTb":
                      lecture == `newLecture${index}`,
                  })}
                >
                  <button
                    id={`newLecture${index}`}
                    onClick={(event) => {
                      const target = event.target as Element
                      setLecture(target.id);
                    }}
                    aria-label="New curriculum item"
                    data-purpose="add-item-inline"
                    type="button"
                    className={classNames(
                      "curriculum-list--add-item--1DK2G add-item--add-item-toggler--1k-rh add-item--lecture--2ZWW9 btn btn-xs btn-link",
                      {
                        "add-item--open--2FcI6":
                          lecture == `newLecture${index}`,
                      }
                    )}
                  >
                    <span
                      className={classNames(
                        "add-item--icon--2FsmW  cfi-small cfi cfi-close",
                        {
                          "add-item--rotate--WJ08z":
                            lecture != `newLecture${index}`,
                          "add-item--open--2FcI6":
                            lecture == `newLecture${index}`,
                        }
                      )}
                    />
                  </button>
                </div>
              </div>
              <div>
                {lecture == `newLecture${index}` && (
                  <LectureCreate
                    position='below'
                    handleChange={(value) => {
                      createLecture({
                        title: value.title,
                        position: value.position,
                        neighbor: lec.id,
                        section: sectionResult.id
                      })
                    }}
                    toggle={() => setLecture("")}
                  />
                )}
              </div>
              <div className="curriculum-list--add-item-section-wrapper--bXWiB">
                <div
                  className={classNames(
                    "curriculum-list--wrapper-section--3v7bx curriculum-list--is-last-item--1Diog",
                    {
                      "curriculum-list--open--VjfTb":
                        section == `newSection${index}`,
                    }
                  )}
                >
                  <button
                    id={`newSection${index}`}
                    onClick={(event) => {
                      const target = event.target as Element
                      index == lectures.length - 1
                        ? setSection(target.id)
                        : setLecture(target.id);
                    }}
                    aria-label="New curriculum item"
                    data-purpose="add-item-inline"
                    type="button"
                    className={classNames(
                      "curriculum-list--add-item-section--3JmsU add-item--add-item-toggler--1k-rh add-item--section--1_IVB btn btn-xs btn-link",
                      {
                        "add-item--open--2FcI6":
                          section == `newSection${index}`,
                      }
                    )}
                  >
                    <span
                      className={classNames(
                        "add-item--icon--2FsmW cfi-small cfi cfi-close",
                        {
                          "add-item--open--2FcI6":
                            section == `newSection${index}`,
                          "add-item--rotate--WJ08z":
                            section != `newSection${index}`,
                        }
                      )}
                    />
                  </button>
                </div>
                {section == `newSection${index}` && (
                  <SectionCreate
                    index={index}
                    position="below"
                    addSection={addSection}
                    className={"curriculum-list--under-section--zkvIv"}
                    toggle={() => setSection("")}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      {toggleDelete && <Modal>
        <DeleteDialog
          deleteCallback={() => {
            deleteSection(sectionResult.id)
              .then(() => setToggleDelete(!toggleDelete))
          }
          }
          cancelDelete={() => setToggleDelete(!toggleDelete)}
          text="You are about to remove a section item. Are you sure you want to continue?"
        />
      </Modal>}
    </>
  );
};
