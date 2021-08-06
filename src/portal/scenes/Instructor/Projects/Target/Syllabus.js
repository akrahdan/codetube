import classNames from "classnames";
export const Syllabus = ({ syllabus, handleChange, handleRemove }) => {

  return (
    <div className={classNames("goals-form--sortable-answer--PLpb9 ", {
        'goals-form--show-buttons-on-hover--1MIu0': syllabus.title,
        'goals-form--hide-buttons--PHgbN form-group': !syllabus.title
    })}>
      <span className="input-group">
        <input
          placeholder="Example: Low-light photography"
          value={syllabus.title || ''}
          id={syllabus.id}
          onChange= {event => {
              const title = event.target.value;
              const updatedSyllabus = { id: syllabus.id, title}
              handleChange(updatedSyllabus)
              
          }}
          className="form-control"
        />
        <span className="input-group-btn">
          <button id={syllabus.id} type="button" className="btn btn-default"
          onClick={() => {
              handleRemove(syllabus)
          }
          }>
            <span id={syllabus.id} className="cfi cfi-trash-o" />
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
