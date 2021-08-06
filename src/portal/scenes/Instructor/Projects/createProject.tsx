import './course.scss';
import { RouteMeta } from 'libs/location/routing';
import { getRouteComponent } from './getRouteComponent';
import { CATEGORY, CHOICE, DESCRIPTION, TITLE } from './routes';

import ProjectCategory from './Category';
import ProjectTitle from './Title';
import ProjectDescription from './Description';

import logo from 'static/images/brand/logo/codefluent.svg';
import { useEffect, useState } from 'react';


import { useHistory } from 'react-router';

import classNames from 'classnames';

import { ProjectEntityResponse } from 'services/projects';

import {useCreateProjectMutation  } from 'services/projects'
export const routesMeta: Record<string, RouteMeta> = {

  [`${CATEGORY}`]: {
    scene: ProjectCategory,
    pageName: undefined,
  },

  [`${TITLE}`]: {
    scene: ProjectTitle,
    pageName: undefined,
  },

  [`${DESCRIPTION}`]: {
    scene: ProjectDescription,
    pageName: undefined,
  },





}
const initialState = {
  title: '',
  description: '',
  category: ''
}
export const CreateProject = (props) => {
  const [locationType, setLocationType] = useState('title')
  
  const [ createProject ] = useCreateProjectMutation()
  const [value, setValue] = useState('');
  const [width, setWidth] = useState(25)
  const [step, setStep] = useState(1)

  const [projectId, setProjectId]= useState(null);
  const [ project, setProject ] = useState<Partial<ProjectEntityResponse>>()

  const { push } = useHistory()
  const headings = [ TITLE, CATEGORY, DESCRIPTION,]


  const handleCreateProject = async (projectRequest: Partial<ProjectEntityResponse>) => {
    try {
     
      const result = await createProject(projectRequest).unwrap()
      if (result) {
        setProjectId(result.id)
        push(`/instructor/project/${result.id}/manage/goals`)
      }
      console.log('Project: ', result)
    }
    catch (error) {
      console.log("Error:", error)
    }

  } 

  const { scene: Scene } = getRouteComponent(routesMeta, locationType)
 
  return (
    <div className="full-page-takeover--window--1ei3d">
      <div className="full-page-takeover--page--2QirY" >
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
              Step {step} of 3
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
        <Scene project={project} handleChange={(v) => setValue(v)
        }
          updateProject={setProject} />
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
                        handleCreateProject(project)
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
                      'udlite-btn-disabled': project && !project[locationType] && !value
                    })}
                    disabled={ project && !project[locationType] && !value}
                    tabIndex={-1}
                  >
                    <span>{locationType == DESCRIPTION ? 'Create Project' : ' Continue'}</span>
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

export default CreateProject;
