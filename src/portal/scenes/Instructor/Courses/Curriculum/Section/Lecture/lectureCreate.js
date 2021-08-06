import { useState } from "react";

export const LectureCreate = ({ toggle, handleChange, position }) => {
  const [value, setValue ] = useState('');
 
  return (
    <div className="pt20 pb30">
      <form onSubmit={event => {
        event.preventDefault()
        handleChange({
          title: value,
          position
        })
        toggle()

      }} className="item-form--item-form--2egBT">
        <div className="df db-sm">
          <div className="mt5 mr5 mb5">New Lecture:</div>
          <div className="fx">
            <div
              data-purpose="lecture-form-group-title"
              className="form-group form-group-sm"
            >
              <div className="form-control-counter-container">
                <input
                  maxLength={80}
                  value={value}
                  placeholder="Enter a Title"
                  onChange={event => setValue(event.target.value)}
                  type="text"
                  id="title"
                  className="form-control"
                  
                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  80
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
                className="ml5 btn btn-sm btn-secondary"
              >
                <span className="ellipsis" style={{ maxWidth: "145px" }}>
                  Add Lecture
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
