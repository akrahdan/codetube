import { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.scss";
import { Lecture } from "./Lecture";
import { SyllabusEdit } from "./SyllabusEdit";
import { SyllabusCreate } from "./SyllabusCreate";
import { useAppSelector } from "store/hooks";
import { TitleDescription, useCreateSyllabusMutation, useFetchSyllabusQuery, useEditSyllabusMutation, useDeleteSyllabusMutation } from "services/projects";
import { selectLocationPayload } from "state/location/selectors";
import { selectSyllabuses } from "state/project/projectSplice";

export const Section = () => {
  const [lecture, setLecture] = useState("");
  const [section, setSection] = useState("");
  const [sectionEdit, setSectionEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false)
  const [createSyllabus] = useCreateSyllabusMutation();
  const [editSyllabus] = useEditSyllabusMutation();
  const [deleteSyllabus] = useDeleteSyllabusMutation()
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: syllabusQuery } = useFetchSyllabusQuery(locationPayload.id)
  const selectedSyllabus = useAppSelector(selectSyllabuses)
  const [syllabuses, setSyllabuses] = useState(selectedSyllabus)

  const [syllabus, setSyllabus] = useState<TitleDescription>()

  useEffect(() => {
    setSyllabuses(selectedSyllabus)
  }, [selectedSyllabus])

  return (
    <>
      <li className="js-curriculum-item-draggable curriculum-list--curriculum-list__section--2SsIO curriculum-list--curriculum-list__section--inline--2E-oq">
        <div className="curriculum-list--item-wrap--1GkZz">

          <div data-purpose="section-editor">
            {sectionEdit && (
              <SyllabusEdit
                
                editSyllabus={editSyllabus}
                syllabus={syllabus}
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
                        {`Project Syllabus`}
                      </span>
                      <span className="hidden-xxs ellipsis pl10">
                        <span className="pr5 cfi cfi-file-text-o" />
                        <span>Tell us what is included in this project</span>
                      </span>


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
                <SyllabusCreate
                  syllabus={syllabus}
                  handleChange={(value) => {
                    createSyllabus({
                      title: value.title,
                      description: value.description,
                      project: locationPayload.id
                    })
                  }}
                  toggle={() => setLecture("")}
                />
              )}
            </div>
          </div>
        </div>
      </li>
      {syllabuses &&
        syllabuses?.map((lec, index) => (
          <li
            id={`${index}`}
            key={index}
            className="js-curriculum-item-draggable curriculum-list--curriculum-list__section-item--1hfk_ curriculum-list--curriculum-list__section-item--inline--aFpJo"
          >
            <div className="curriculum-list--item-wrap--1GkZz">
              <Lecture syllabus={lec} index={index}
                handleDelete={() => deleteSyllabus(lec.id)}
                editLecture={value => editSyllabus({
                  ...lec,
                  title: value.title,


                })} />
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
                  <SyllabusCreate
                    syllabus={syllabus}
                    handleChange={(value) => {
                      createSyllabus({
                        title: value?.title,
                        description: value?.description,
                        project: locationPayload.id
                      })
                    }}
                    toggle={() => setLecture("")}
                  />
                )}
              </div>

            </div>
          </li>
        ))}

    </>
  );
};
