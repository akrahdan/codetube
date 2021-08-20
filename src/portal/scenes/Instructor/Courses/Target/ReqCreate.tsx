import classNames from "classnames";
import { Requirement } from "services/courses";

type ReqProps = {
  handleChange: ( req: Requirement) => void,
  handleRemove: ( req: Requirement) => void,
  req: Requirement
}
export const ReqCreate: React.FC<ReqProps> = ({ req, handleChange, handleRemove }) => {
  
  return (
    <div
      className={classNames("goals-form--sortable-answer--PLpb9 ", {
        "goals-form--show-buttons-on-hover--1MIu0": req?.name,
        "goals-form--hide-buttons--PHgbN form-group": !req?.name,
      })}
    >
      <span className="input-group">
        <input
          placeholder="Example: Be able to read sheet music"
          value={req?.name || ''}
          id={`${req?.id}` || ''}
          onChange={(event) => {
            const name = event.target.value;
            const updatedGoal = { id: req?.id, name, course: null };
            handleChange(updatedGoal);
          }}
          className="form-control"
        />
        <span className="input-group-btn">
          <button
            id={`${req?.id}`|| ''}
            type="button"
            className="btn btn-default"
            onClick={() => {
              handleRemove(req);
            }}
          >
            <span id={`${req?.id}` || ''} className="cfi cfi-trash-o" />
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
