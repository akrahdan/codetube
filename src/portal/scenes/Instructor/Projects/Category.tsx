import "./course.scss";
import { useFetchProjectCategoriesQuery } from "services/projects";
import { ProjectEntityResponse } from "services/projects";
import React from "react";

type CategoryProps = {
  handleChange: (value: string) => void,
  project: ProjectEntityResponse,
  updateProject: (course: ProjectEntityResponse) => void,
};
export const ProjectCategory: React.FC<CategoryProps> = ({
  handleChange,
  project,
  updateProject,
}) => {
  const { data: categories } = useFetchProjectCategoriesQuery();
  if (!categories) return null;
  return (
    <div className="full-page-takeover--content-wrapper--3Vzz1">
      <div className="container full-page-takeover--content--1ynJq">
        <div className="text-center create-course-flow--takeoverContent--1ds0W">
          <div>
            <div
              className="create-course-flow--headerText--1hV-a"
              data-purpose="header-text"
            >
              Provide the category for the project you will share
            </div>
            <h2 data-purpose="subhead-text">
              <small>
                If you're not sure about the right category, you can change it
                later.
              </small>
            </h2>
            <form className="create-course-flow--responseForm--DLkKF">
              <div className="create-course-flow--formOptions--15Rpx form-group">
                <div className="create-course-flow--optionsContainer--3TNVh">
                  <div className="create-course-flow--formField--m9MGJ">
                    <div className="form-control-single-select-container">
                      <select
                        id="courseCategory"
                        className="form-control"
                        value={project ? project.category : -1}
                        onChange={(event) => {
                          handleChange(event.target.value);
                          updateProject({
                            ...project,
                            category: Number(event.target.value),
                          });
                        }}
                      >
                        <option value="default">Choose a category</option>
                        {categories &&
                          categories.map((cat) => (
                            <option value={cat.id} key={cat.id}>
                              {cat.title}
                            </option>
                          ))}

                        <option value={-1}>I don't know yet</option>
                      </select>
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

export default ProjectCategory;
