import { useState } from "react";
import { CourseRequest} from 'services/courses'
type TitleProps = {
    handleChange: (value: string) => void,
    course: CourseRequest,
    updateCourse: (course: CourseRequest) => void
}
export const CourseTitle: React.FC<TitleProps> = ({handleChange, course, updateCourse}) => {
    const [value, setValue ] = useState('');
   
    return (
        <div className="full-page-takeover--content-wrapper--3Vzz1">
            <div className="container full-page-takeover--content--1ynJq">
                <div className="text-center create-course-flow--takeoverContent--1ds0W">
                    <div>
                        <div
                            className="create-course-flow--headerText--1hV-a"
                            data-purpose="header-text"
                        >
                            Provide a working title?
                        </div>
                        <h2 data-purpose="subhead-text">
                            <small>
                                You can think up any title for now. You can change
                                it later.
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
                                            Course title
                                        </label>
                                        <div className="form-control-counter-container">
                                            <input
                                                placeholder="e.g. Learn Photoshop CS6 from Scratch"
                                                maxLength={60}
                                                value = {course ? course.title: ''}
                                                onChange={(event) => {
                                                    setValue(event.target.value)
                                                    handleChange(event.target.value)
                                                    updateCourse({
                                                        ...course,
                                                        title: event.target.value
                                                    })
                                                }}
                                                id="input-course-title"
                                                className="form-control"


                                            />
                                            <div
                                                className="form-control-counter"
                                                data-purpose="form-control-counter"
                                            >
                                                60
                                            </div>
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
}

export default CourseTitle