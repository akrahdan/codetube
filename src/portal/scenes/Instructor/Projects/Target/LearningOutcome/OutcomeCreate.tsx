import classNames from "classnames";
import { RTEditor } from 'portal/scenes/Instructor/Editor'
import React from "react";
import { TitleDescription } from "services/projects";
import { useState } from "react";

type SyllabusProps = {
  handleChange: (value: TitleDescription) => void,

  outcome: TitleDescription,
  toggle: () => void

}

export const OutcomeCreate: React.FC<SyllabusProps> = ({ toggle, handleChange, outcome }) => {
  const [ title, setTitle] = useState(outcome?.title || '')
  const [ description, setDescription] = useState(outcome?.description || '')
  return ( 
    <div className="m10">
      <form onSubmit={event => {
        event.preventDefault()
        handleChange({
          id: null,
          title,
          description,
          project: null,
          
        })
        toggle()
      }} className="item-form--item-form--2egBT">
        <div className="df db-sm">
          <div className="mt5 mr5 mb5 semibold">
            <span>
              <span data-purpose="empty-status-icon">&nbsp;</span>{`New Item :`}
            </span>
          </div>
          <div className="fx">
            <div
              data-purpose="section-form-group-title"
              className="form-group form-group-sm"
            >
              <div className="form-control-counter-container">
                <input
                  maxLength={80}
                  placeholder="Enter a Title"
                  type="text"
                  id="title"
                  onChange={event => setTitle(event.target.value)}
                  className="form-control"
                  value={title || ''}
                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  {title?.length}
                </div>
              </div>
            </div>
            <div
              data-purpose="section-form-group-description"
              className="form-group form-group-sm"
            >
              <label htmlFor="description" className="a11 control-label">
                What will students be able to do at the end of this section?
              </label>
              <div className="form-control-counter-container">
                <input
                  maxLength={200}
                  placeholder="Enter a Learning Objective"
                  data-purpose="section-objective"
                  type="text"
                  onChange={event => setDescription(event.target.value)}
                  value={description || ''}
                  id="description"
                  className="form-control"
                 
                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  {description?.length}
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
               onClick={toggle}
                
                type="button"
                className="btn btn-sm btn-tertiary"
              >
                <span className="ellipsis" style={{ maxWidth: "85px" }}>
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                data-purpose="submit-section-form"
                className="ml5 btn btn-sm btn-secondary"
              >
                <span className="ellipsis" style={{ maxWidth: "145px" }}>
                  Add to Syllabus
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
