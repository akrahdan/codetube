import classNames from "classnames";
import React from "react";
import { TitleDescription } from "services/projects";

type IncProps = {
  inc: TitleDescription,
  handleChange: (value: TitleDescription) => void,
  handleRemove: (value: TitleDescription) => void
}
export const CreateIncluded: React.FC<IncProps> = ({ inc, handleChange, handleRemove }) => {
  return (
    <div
      className={classNames("goals-form--sortable-answer--PLpb9 ", {
        "goals-form--show-buttons-on-hover--1MIu0": inc.title,
        "goals-form--hide-buttons--PHgbN form-group": !inc.title,
      })}
    >
      <span className="input-group">
        <input
          placeholder="Example: Be able to read sheet music"
          value={inc.title}
          id={`${inc.id}`}
          onChange={(event) => {
            const title = event.target.value;
            const updated = {...inc, title };
            handleChange(updated);
          }}
          className="form-control"
        />
        <span className="input-group-btn">
          <button
            id={`${inc.id}`}
            type="button"
            className="btn btn-default"
            onClick={() => {
              handleRemove(inc);
            }}
          >
            <span id={`${inc.id}`}className="cfi cfi-trash-o" />
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
