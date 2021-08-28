import { useEffect, useState } from "react";

export const InstructionChoice = ({ handleChange }) => {
    const [value, setValue ] = useState('');


  useEffect(() => {
   handleChange(value)
  }, [value])
  
  return (
    <div className="full-page-takeover--content-wrapper--3Vzz1">
      <div className="container full-page-takeover--content--1ynJq">
        <div className="text-center create-course-flow--takeoverContent--1ds0W">
          <div>
            <div
              className="create-course-flow--headerText--1hV-a"
              data-purpose="header-text"
            >
              Select which instruction path to start first: Project or Course?
            </div>
            <form className="create-course-flow--responseForm--DLkKF">
              <div className="create-course-flow--formOptions--15Rpx form-group">
                <div className="create-course-flow--optionsContainer--3TNVh">
                  <div className="create-course-flow--buttonPanel--PDCNH radio radio-button">
                    <label >
                      <input 
                      name="course" 
                      type="radio"
                      checked={value=='course'}
                      value='course'
                      onChange={event => {
                          setValue('course')
                          //handleChange(event.target.value)
                      }}
                      />
                      <span className="toggle-control-label radio-label cfi-icon-check">
                        <div>
                          <div className="create-course-flow--buttonIcon--18-Fs">
                            <span className="text-secondary cfi-medium cfi cfi-video-design" />
                          </div>
                          <h3 className="semibold">Course</h3>
                          <div className="mb20">
                            
                            The course option helps you create video 
                            lectures and titles to link to your project
                          </div>
                        </div>
                      </span>
                    </label>
                  </div>
                  <div className="create-course-flow--buttonPanel--PDCNH radio radio-button">
                    <label >
                      <input
                        name="project"
                        type="radio"
                        checked={value=='project'}
                        value='project'
                        onChange={event => {
                            setValue('project')
                            //handleChange(event.target.value)
                        }}
                       
                      />
                      <span className="toggle-control-label radio-label cfi-icon-check">
                        <div>
                          <div className="create-course-flow--buttonIcon--18-Fs">
                            <span className="text-secondary cfi-medium cfi cfi-instructional-design" />
                          </div>
                          <h3 className="semibold">Project</h3>
                          <div className="mb20">
                            Create project-based courses 
                            to help engage your students
                          </div>
                        </div>
                      </span>
                    </label>
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

export default InstructionChoice;
