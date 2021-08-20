import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Goal } from "services/courses";
type GoalProps = { 
  handleChange: ( goal: Goal) => void,
  handleRemove: ( goal: Goal) => void,
  goal: Goal


}
export const GoalCreate: React.FC<GoalProps> = ({ goal, handleChange, handleRemove }) => {
  const [ goalUpdate, setGoalUpdate ] = useState(goal)

  useEffect(() => {
   
    setGoalUpdate(goal)
  }, [goal])
  return (
    <div className={classNames("goals-form--sortable-answer--PLpb9 ", {
        'goals-form--show-buttons-on-hover--1MIu0': goal?.name,
        'goals-form--hide-buttons--PHgbN form-group': !goal?.name
    })}>
      <span className="input-group">
        <input
          placeholder="Example: Low-light photography"
          value={goal?.name || ''}
          id={`${goal?.id || ''}`}
          onChange= {event => {
              const name = event.target.value;
              const updatedGoal = { id: Number(goal?.id), name, course: null}
              handleChange(updatedGoal)
              
          }}
          className="form-control"
        />
        <span className="input-group-btn">
          <button id={`${goal?.id}`} type="button" className="btn btn-default"
          onClick={() => {
              handleRemove(goal)
          }
          }>
            <span id={`${goal?.id}`} className="cfi cfi-trash-o" />
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
