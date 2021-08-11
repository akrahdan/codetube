import classNames from "classnames";
import { RTEditor } from 'portal/scenes/Instructor/Editor'
import React from "react";
import { TitleDescription } from "services/projects";

type SyllabusProps = {
  handleChange: (value: TitleDescription) => void,
  handleRemove: (value: TitleDescription) => void,
  syllabus: TitleDescription

}
export const SyllabusCreate: React.FC<SyllabusProps> = ({ syllabus, handleChange, handleRemove }) => {

  return (
    <div className={classNames("goals-form--sortable-answer--PLpb9 ", {
      'goals-form--show-buttons-on-hover--1MIu0': syllabus.title,
      'goals-form--hide-buttons--PHgbN form-group': !syllabus.title
    })}>
      <label htmlFor="title" className="control-label">
        Title
      </label>
      <span className="input-group">

        <input
          placeholder="Title"
          value={syllabus ? syllabus.title : ''}
          id={`${syllabus.id}`}
          onChange={event => {
            const title = event.target.value;
            const updatedSyllabus = { ...syllabus, title }
            handleChange(updatedSyllabus)

          }}
          className="form-control"
        />
        <div className="form-group">
          <label htmlFor="description" className="control-label">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Give a description of what is expected"
            value={syllabus ? syllabus.description : ""}
            onChange={event => {
              const updatedSyllabus = { ...syllabus, description: event.target.value }

              handleChange(updatedSyllabus);
            }} />
         
        </div>
        <span className="input-group-btn">
          <button id={`${syllabus.id}`} type="button" className="btn btn-default"
            onClick={() => {
              handleRemove(syllabus)
            }
            }>
            <span id={`${syllabus.id}`} className="cfi cfi-trash-o" />
          </button>
          <button
            type="button"
            className="js-drag-handle goals-form--sortable-answer__handle--2dOgs btn btn-default"
          >
            <span className="cfi cfi-bars" />
          </button>
        </span>
      </span>
    </div>
  );
};
