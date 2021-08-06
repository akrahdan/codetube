import React, { useState } from "react";
import RTEditor from "../Editor";

import { ProjectEntityResponse} from 'services/projects'
type DescriptionProps = {
  handleChange: (value: string) => void,
  project: ProjectEntityResponse,
  updateProject: (project: ProjectEntityResponse) => void,
};
export const ProjectDescription: React.FC<DescriptionProps> = ({
  handleChange,
  project,
  updateProject,
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="full-page-takeover--content-wrapper--3Vzz1">
      <div className="container full-page-takeover--content--1ynJq">
        <div className="text-center create-course-flow--takeoverContent--1ds0W">
          <div>
            <div
              className="create-course-flow--headerText--1hV-a"
              data-purpose="header-text"
            >
              Tell users what your course is about.
            </div>
            <h2 data-purpose="subhead-text">
              <small>
                Let your students know what they will get for their time and
                bucks. You can change it later.
              </small>
            </h2>
            <form className="create-course-flow--responseForm--DLkKF">
              <div className="create-course-flow--formOptions--15Rpx form-group">
                <div className="create-course-flow--optionsContainer--3TNVh">
                  <div className="create-course-flow--formField--m9MGJ">
                    <label
                      htmlFor="input-course-title"
                      className="sr-only control-label"
                    >
                      Course Description
                    </label>
                    <div className="form-control-counter-container text-justify">
                      <RTEditor
                        editorValue={project ? project.description : ""}
                        handleChange={(value) => {
                          setValue(value);
                          handleChange(value);
                          updateProject({
                            ...project,
                            description: value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
