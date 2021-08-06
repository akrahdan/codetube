import { RTEditor } from 'portal/scenes/Instructor/Editor';
import { useState } from 'react';

export const LectureDescription = ({ setToggle }) => {
  const [ lectureDescription, setLectureDescription] = useState('')
  return (
    <form data-purpose="description-form" className="pt10 pb10">
      <div className="form-group">
        <label htmlFor="description" className="control-label">
          Lecture Description
        </label>
        <RTEditor editorValue={lectureDescription} handleChange={(value) => {
          setLectureDescription(value)
        }}/>
      </div>
      <div className="text-right">
        <button onClick={() => setToggle(false)} type="button" className="mr5 btn btn-sm btn-default">
          Cancel
        </button>
        <button type="submit" className="btn btn-sm btn-secondary">
          Save
        </button>
      </div>
    </form>
  );
};
