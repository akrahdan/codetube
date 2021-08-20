import classNames from "classnames";
import React from "react";
import { Experience } from "services/courses";

type ExperienceProps = {
  handleChange: ( experience: Experience) => void,
  handleRemove: ( experience: Experience) => void,
  experience: Experience
}

export const ExperienceCreate: React.FC<ExperienceProps> = ({experience, handleChange, handleRemove}) => {
  return (
    <div
      className={classNames("goals-form--sortable-answer--PLpb9 form-group ", {
        "goals-form--show-buttons-on-hover--1MIu0": experience?.name,
        "goals-form--hide-buttons--PHgbN": !experience?.name,
      })}
    >
      <span className="input-group">
        <input
          placeholder="Example: Beginner Python developers curious about data science"
          value={experience?.name || ''}
          onChange={(event) => {
            const name = event.target.value;
            const updatedExperience = { id: experience?.id, name, course: null };
            handleChange(updatedExperience);
          }}
          id={`${experience?.id}`}
          className="form-control"
        />
        <span className="input-group-btn">
          <button
            id={`${experience?.id}` || ''}
            type="button"
            className="btn btn-default"
            onClick={() => {
              handleRemove(experience);
            }}
          >
            <span id={`${experience?.id}`} className="cfi cfi-trash-o" />
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
