import classNames from "classnames";
import { useState } from "react";
export const SectionCreate = ({ className, toggle, addSection, index, position }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={classNames("curriculum-list--wrapper-section-form--2-wP8", className)}>
      <form onSubmit={event => {
        event.preventDefault()
        
        addSection({
          title,
          description,
          position
        })
        toggle()
      }} className="item-form--item-form--2egBT">
        <div className="df db-sm">
          <div className="mt5 mr5 mb5 semibold">New Section:</div>
          <div className="fx">
            <div
              
              className="form-group form-group-sm"
            >
              <div className="form-control-counter-container">
                <input
                  maxLength={80}
                  placeholder="Enter a Title"
                  value= { title }
                  onChange={event => setTitle(event.target.value)}
                  type="text"
                  id="title"
                  className="form-control"
                 
                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  {title.length}
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
                  value = {description}
                  onChange={event => setDescription(event.target.value)}
                  type="text"
                  id="description"
                  className="form-control"
                  
                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  {description.length}
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={toggle}
                data-purpose="cancel-section-form"
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
                  Add Section
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
