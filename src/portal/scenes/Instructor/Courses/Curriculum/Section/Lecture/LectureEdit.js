import { useState } from "react";

export const LectureEdit = ({ toggle, editLecture, lecture, index }) => {
  const [ title, setTitle] = useState(lecture.title || '')
  return (
    <form onSubmit={event => {
      event.preventDefault();
      editLecture({
        title,
        id: lecture.id
      })
      toggle()
      
    }} className="item-form--item-form--2egBT">
      <div className="df db-sm">
        <div className="mt5 mr5 mb5">
          <span>
            <span
              data-purpose="published-icon"
              className="text-secondary pr5 cfi cfi-check-circle"
            />
            Lecture {index + 1}:
          </span>
        </div>
        <div className="fx">
          <div
            data-purpose="lecture-form-group-title"
            className="form-group form-group-sm"
          >
            <div className="form-control-counter-container">
              <input
                maxLength={80}
                placeholder="Enter a Title"
                value= {title}
                type="text"
                onChange={event => setTitle(event.target.value)}
                id="title"
                className="form-control"
                defaultValue="Introduction"
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                {title.length}
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
            onClick={toggle}
              data-purpose="cancel-lecture-form"
              type="button"
              className="btn btn-sm btn-tertiary"
            >
              <span className="ellipsis" style={{ maxWidth: "85px" }}>
                Cancel
              </span>
            </button>
            <button
              type="submit"
              data-purpose="submit-lecture-form"
              className="ml5 btn btn-sm btn-secondary"
            >
              <span className="ellipsis" style={{ maxWidth: "145px" }}>
                Save Lecture
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
