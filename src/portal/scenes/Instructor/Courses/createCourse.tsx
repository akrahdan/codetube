import './course.scss';
import { RouteMeta } from 'libs/location/routing';
import { getRouteComponent } from './getRouteComponent';
import { CATEGORY, CHOICE, DESCRIPTION, TITLE } from './routes';

import CourseCategory from './CourseCategory';
import CourseTitle from './CourseTitle';
import CourseDescription from './CourseDescription';
import InstructionChoice from './InstructionChoice';
import logo from 'static/images/brand/logo/codefluent.svg';
import { useEffect, useState } from 'react';


import { useHistory } from 'react-router';

import classNames from 'classnames';
import { CourseRequest } from 'services/courses'
import { useCreateCourseMutation } from 'services/courses';
export const routesMeta: Record<string, RouteMeta> = {

  [`${CATEGORY}`]: {
    scene: CourseCategory,
    pageName: undefined,
  },

  [`${TITLE}`]: {
    scene: CourseTitle,
    pageName: undefined,
  },

  [`${DESCRIPTION}`]: {
    scene: CourseDescription,
    pageName: undefined,
  },

  [`${CHOICE}`]: {
    scene: InstructionChoice,
    pageName: undefined,
  },



}
const initialState = {
  title: '',
  description: '',
  category: ''
}
export const CreateCourse = (props) => {
  const [locationType, setLocationType] = useState('choice')
  
  const [createCourse] = useCreateCourseMutation()
  const [value, setValue] = useState('');
  const [width, setWidth] = useState(25)
  const [step, setStep] = useState(1)
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState<Partial<CourseRequest>>()

  const { push } = useHistory()
  const headings = [CHOICE, TITLE, CATEGORY, DESCRIPTION,]
  const handleCreateCourse = async (courseRequest: Partial<CourseRequest>) => {
    try {
     
      const result = await createCourse(courseRequest).unwrap()
      if (result) {
        setCourseId(result.id)
        push(`/instructor/course/${result.id}/manage/goals`)
      }
      console.log('Course: ', result)
    }
    catch (error) {
      console.log("Error:", error)
    }

  }

  const { scene: Scene } = getRouteComponent(routesMeta, locationType)
 
  return (
    <div className="full-page-takeover--window--1ei3d">
      <div className="full-page-takeover--page--2QirY" data-purpose="page">
        <div>
          
          <div className="full-page-takeover--header--2mfbT">
            <div className="full-page-takeover--logo-block--1Op9u">
              <img
                className="udemy-logo full-page-takeover--rebrand-logo--36Lru"
                alt="codefluent"
                width={91}
                height={34}

                src={logo}
              />
            </div>
            <div className="full-page-takeover--header-divider--3XSTc" />
            <div
              className="full-page-takeover--header-text-block--1PdFS"
              data-purpose="header-text"
            >
              Step {step} of 4
            </div>
            <div className="full-page-takeover--header-buttons--1lu2t">
              <button
                onClick={() => {
                  push('/')
                }}
                type="button"
                className="btn btn-tertiary"
              >
                Exit
              </button>
            </div>
          </div>
          <div
            data-purpose="header-bottom"
            className="full-page-takeover--header-bottom--progress--2Hfvp"
          >
            <div
              className="full-page-takeover--header-bottom--progress-highlight--1Pr6t"
              style={{ width: `${width}%` }}
            />
          </div>
        </div>
        <Scene course={course} handleChange={(v) => setValue(v)
        }
          updateCourse={setCourse} />
        <div data-purpose="footer" className="full-page-takeover--footer--2wFgA">
          <div className="container">
            <div className="row">
              <div className="col-xxs-6 full-page-takeover--button-container--1rnpO">
                <div className="udlite-in-udheavy">
                  {(locationType != CHOICE) && <button
                    onClick={() => {
                      const heading = headings[step - 1]
                      const wd = ((step - 1) * 100 / (headings.length))
                      setWidth(wd);
                      setStep(step - 1)
                      setLocationType(heading)

                    }}
                    type="button"
                    data-purpose="left-button"
                    className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-link-neutral full-page-takeover--left-button--3-75z"
                  >
                    <span>Previous</span>
                  </button>}
                </div>
              </div>
              <div className="col-xxs-6 full-page-takeover--button-container--1rnpO">
                <div className="udlite-in-udheavy">
                  <button
                    type="button"
                    onClick={() => {
                      if (step >= headings.length) {
                        handleCreateCourse(course)
                      } else {
                        const heading = headings[step]
                        const wd = ((step + 1) * 100 / (headings.length))
                        setWidth(wd);
                        setStep(step + 1)
                        setLocationType(heading)
                        setValue('')
                      }
                    }}

                    className={classNames("udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md full-page-takeover--right-button--i1q_g", {
                      'udlite-btn-disabled': course && !course[locationType] && !value
                    })}
                    disabled={ course && !course[locationType] && !value}
                    tabIndex={-1}
                  >
                    <span>{locationType == DESCRIPTION ? 'Create Course' : ' Continue'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
