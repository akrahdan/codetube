import classNames from "classnames";
export const GoalCreate = ({ goal, handleChange, handleRemove }) => {

  return (
    <div className={classNames("goals-form--sortable-answer--PLpb9 ", {
        'goals-form--show-buttons-on-hover--1MIu0': goal.name,
        'goals-form--hide-buttons--PHgbN form-group': !goal.name
    })}>
      <span className="input-group">
        <input
          placeholder="Example: Low-light photography"
          value={goal.name}
          id={goal.id}
          onChange= {event => {
              const name = event.target.value;
              const updatedGoal = { id: goal.id, name}
              handleChange(updatedGoal)
              
          }}
          className="form-control"
        />
        <span className="input-group-btn">
          <button id={goal.id} type="button" className="btn btn-default"
          onClick={() => {
              handleRemove(goal)
          }
          }>
            <span id={goal.id} className="cfi cfi-trash-o" />
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
