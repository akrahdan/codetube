import "./course.scss";
import { useFetchCategoriesQuery } from "services/courses";
import { CourseRequest} from 'services/courses';
import React from "react";

type CategoryProps = {
    handleChange: (value: string) => void,
    course: CourseRequest,
    updateCourse: (course: CourseRequest) => void
}
export const CourseCategory:React.FC<CategoryProps> = ({ handleChange, course, updateCourse }) => {
  const {data: categories } = useFetchCategoriesQuery()
  if(!categories) return null;
  return ( 
    <div className="full-page-takeover--content-wrapper--3Vzz1">
      <div className="container full-page-takeover--content--1ynJq">
        <div className="text-center create-course-flow--takeoverContent--1ds0W">
          <div>
            <div
              className="create-course-flow--headerText--1hV-a"
              data-purpose="header-text"
            >
              Provide the category for the course you will share
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
                      <select id="courseCategory" className="form-control" value={course? course.category: -1} onChange={(event)  => {
                        handleChange(event.target.value)
                         updateCourse({
                           ...course,
                           category: Number(event.target.value)
                         })
                        }}>
                        <option value="default">Choose a category</option>
                        {categories && categories.map((cat) => (<option value={cat.id} key={cat.id}>
                          {cat.title}
                        </option>))  }
                       
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

export default CourseCategory;
