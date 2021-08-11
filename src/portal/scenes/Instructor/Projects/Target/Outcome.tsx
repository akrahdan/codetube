import classNames from "classnames";
import React from "react";
import { TitleDescription } from "services/projects";

type OutcomeProps = {
  handleChange: (value: TitleDescription) => void,
  handleRemove: (value:TitleDescription) => void,
  outcome: TitleDescription

}
export const Outcome: React.FC<OutcomeProps> = ({outcome, handleChange, handleRemove}) => {
  return (
    <div
      className={classNames("goals-form--sortable-answer--PLpb9 form-group ", {
        "goals-form--show-buttons-on-hover--1MIu0": outcome.title,
        "goals-form--hide-buttons--PHgbN": !outcome.title,
      })}
    >
      <span className="input-group">
        <input
          placeholder="Example: Beginner Python developers curious about data science"
          value={outcome.title || ''}
          onChange={(event) => {
            const title = event.target.value;
            const updatedOutcome = { ...outcome, title };
            handleChange(updatedOutcome);
          }}
          id={`${outcome.id}` }
          className="form-control"
        />
        <span className="input-group-btn">
          <button
            id={`${outcome.id}` }
            type="button"
            className="btn btn-default"
            onClick={() => {
              handleRemove(outcome);
            }}
          >
            <span id={`${outcome.id}` } className="cfi cfi-trash-o" />
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
