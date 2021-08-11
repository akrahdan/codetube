import Select from 'react-select';
import { CourseResponse, useFetchCourseLevelQuery, useFetchInstructorCoursesQuery } from "services/courses";
import { useFetchProjectCategoriesQuery } from "services/projects";
import { useFetchProjectQuery, useUpdateProjectMutation, useEditHeadingMutation, useCreateHeadingMutation } from "services/projects";
import type { HeaderDescription } from "services/projects";
import { selectLocationPayload, selectLocationType } from "state/location/selectors";
import { useAppSelector, useAppDispatch } from "store/hooks";

import { selectSave, selectCourses } from "state/course/courseSplice";
import { useState, useEffect } from "react";
import * as client from 'filestack-js';
import Player from 'react-player';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme'
import algoliasearch from "algoliasearch/lite";
import { autoSearch } from "services/courses";
import type { ProjectEntityResponse, ProjectEntityRequest, Course } from "services/projects";
import { UploadProgress } from "./UploadProgress";
import { RTEditor } from 'portal/scenes/Instructor/Editor';
import classNames from "classnames";
import { usePrompt } from "../../Courses/userPrompt";
import { useAlert } from "react-alert";
import type { CategoryResponse } from "services/courses";
import styles from './style.module.scss'
import { saveCourse } from "state/course/courseSplice";
import { selectProject } from "state/project/projectSplice";
import { values } from 'lodash';


const filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {})

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

export const LandingPage = () => {
  const getSuggestions = async (query: string) => {
    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) return []
    const results = await searchClient.initIndex('tags_index').search(inputValue)
    const suggestions = results.hits.map(hit => {
      return hit
    })

    const courseSuggestions = [...suggestions, { isAddNew: true }]
    return courseSuggestions
  }


  const { data: coursesQuery } = useFetchInstructorCoursesQuery()
  const [createHeading] = useCreateHeadingMutation()
  const [editHeading] = useEditHeadingMutation()
  const locationPayload = useAppSelector(selectLocationPayload);
  const locationPath = useAppSelector(selectLocationType);
  const selectedSave = useAppSelector(selectSave);
  const selectedProject = useAppSelector(selectProject)
  const selectedCourses = useAppSelector(selectCourses)
  const dispatch = useAppDispatch()
  const { data: project, isLoading } = useFetchProjectQuery(locationPayload.id)
  const [updateProject] = useUpdateProjectMutation()

  const { data: levels } = useFetchCourseLevelQuery()
  const { data: categories } = useFetchProjectCategoriesQuery()
  const [uploading, setUploading] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const [files, setFiles] = useState(null);
  const alert = useAlert()
  const [category, setCategory] = useState<CategoryResponse>()
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const [projectUpdate, setProjectUpdate] = useState<ProjectEntityResponse>(selectedProject)
  const [courses, setCourses] = useState<CourseResponse[]>(selectedCourses)
  const [course, setCourse] = useState<CourseResponse>()
  const [projectCourse, setProjectCourse] = useState<CourseResponse[]>(selectedProject ? selectedProject.courses : [])
  const [tags, setTags] = useState<string[]>(selectedProject ? selectedProject.tags : []);
  const [header, setHeader] = useState<HeaderDescription>(selectedProject ? selectedProject.header : {
    heading: '',
    description: '',
    id: null,
    projects: []
  })
  usePrompt(true)
  const onProgress = eve => {
    console.log(eve.totalPercent)
    setProgress(eve.totalPercent)

  }
  const onUpload = async (files, onProgress) => {
    setError(null)
    setStatus('Progress')
    setUploading(true)

    filestack.upload(files, { onProgress })
      .then(results => {
        setProjectUpdate({
          ...projectUpdate,
          thumbnail_url: results.url
        })
      }).catch(err => {
        setStatus('Failed')
        console.log(err)
        setError(err.status)
      })
  }

  useEffect(() => {
     setProjectCourse(selectedProject.courses)
  }, [selectedProject])





  const renderSuggestion = suggestion => {

    if (suggestion.isAddNew) {

      return (
        <div className="course-labels--propose-label--1zROI">
          <a role="button" tabIndex={0}>Propose new topic {suggestionValue}
          </a>
        </div>

      );
    }
    console.log('Suggestions: ', suggestion.name)

    return <span className="course-labels--course-label--1Vi_C label label-default">{suggestion.name}</span>;
  };

  const theme = {
    ...defaultTheme,
    container: 'autosuggest-theme--container--aLRPK',
    itemsContainer: 'label-manager--suggestions-container--2TqhD',
    item: 'autosuggest-theme--suggestion--Ut3Fu',
  }
  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value)
      .then(results => setSuggestions(results))

  }
  const handleSuggestionChange = (event, { newValue, method }) => {
    setSuggestionValue(newValue)
  }

  const suggestInputProps = {
    placeholder: 'Type suggestion',
    value: suggestionValue,
    className: 'form-control',
    onChange: handleSuggestionChange
  }

  useEffect(() => {

    if (selectedSave.locationPath == locationPath) {
      if (header) {
        if (selectedProject.header) {
          editHeading({
            ...header,
            projects: [projectUpdate.id]
          }).then((res: {
            data: HeaderDescription
          }) => {
            const { header, ...body } = projectUpdate
            updateProject({
              ...body,
              tags,
              courses: projectCourse.map(item => Number(item.id))

            }).then((res: { data: ProjectEntityResponse }) => {
              if (res.data && res.data.id) {
                alert.show("Your changes have been saved successfully")
                setProjectUpdate(res.data)
                dispatch(saveCourse({
                  submit: false,
                  locationPath: null
                }))
              }

            }).catch(err => {
              alert.error(err)
              dispatch(saveCourse({
                submit: false,
                locationPath: null
              }))
            })
          })
        } else {
          createHeading({
            heading: header.heading,
            description: header.description,
            projects: [projectUpdate.id]
          }).then((res: {
            data: HeaderDescription
          }) => {
            const { header, ...body } = projectUpdate
            updateProject({
              ...body,
              tags,

              courses: projectCourse.map(item => Number(item.id))
            }).then((res: { data: ProjectEntityResponse }) => {
              if (res.data && res.data.id) {
                alert.show("Your changes have been saved successfully")
                setProjectUpdate(res.data)
                dispatch(saveCourse({
                  submit: false,
                  locationPath: null
                }))
              }

            }).catch(err => {
              alert.error(err)
              dispatch(saveCourse({
                submit: false,
                locationPath: null
              }))
            })
          })
        }
      }

    }
  }, [selectedSave])

  useEffect(() => {
    setProjectUpdate(selectedProject)
    setTags(selectedProject ? selectedProject.tags : [])
    setHeader(selectedProject ? selectedProject.header : null)
    const cat = selectedProject && selectedProject.category
    const newCat = categories && categories.find(item => item.id == cat)
    if (newCat) {
      setCategory(newCat)
    }

  }, [selectedProject])


  useEffect(() => {
    setCourses(selectedCourses)
  }, [selectedCourses])

  if (isLoading || !projectUpdate) {

    return (
      <div className="ud-app-loader">
        <div className="sub-header--wrapper--3Vunm">
          <div className="sub-header--main-content--22it3">
            <h2
              data-purpose="page-title"
              className="font-heading-serif-xl sub-header--title--2VD8q"
            >
              Project landing page
            </h2>
          </div>
        </div>
        <div className="main-content--wrap_component--2TEkz">
          <form>
            <div className="form-group">
              <div className={classNames("cfi-medium", "cfi", "cfi-circle-loader",
                styles.loader)}>

              </div>
            </div>
          </form>

        </div>


      </div>
    );
  }

  const validateFileType = (fileItem) => {
    var fileType = fileItem.filetype; // image/png image/jpeg
    var rootType = fileType.split("/")[0];
    switch (rootType) {
      case "image":
        return 'File';
      default:
        return 'Video';
    }
  }

  return (
    <div>
      <div className="sub-header--wrapper--3Vunm">
        <div className="sub-header--main-content--22it3">
          <h2
            data-purpose="page-title"
            className="font-heading-serif-xl sub-header--title--2VD8q"
          >
            Project landing page
          </h2>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <form >
          <div className="form-group">
            <label htmlFor="title" className="control-label">
              Project title
            </label>
            <div className="form-control-counter-container">
              <input
                placeholder="Insert your course title."
                name="title"
                data-purpose="edit-course-title"
                maxLength={60}
                value={projectUpdate.title}
                onChange={(event) => setProjectUpdate({
                  ...projectUpdate,
                  title: event.target.value
                })}
                id="title"
                className="form-control"
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                {projectUpdate.title ? projectUpdate.title.length : null}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="headline" className="control-label">
              Project header heading
            </label>
            <div className="form-control-counter-container">
              <input
                placeholder="Insert your course subtitle."
                name="headline"
                value={header ? header.heading ? header.heading : '' : ''}
                onChange={event => setHeader({
                  ...header,
                  heading: event.target.value
                })}
                maxLength={120}
                id="headline"
                className="form-control"
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                {header ? header.heading ? header.heading.length : null : null}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="control-label">
              Project header description
            </label>
            <RTEditor editorValue={header ? header.description : ''} handleChange={(value) =>
              setHeader(
                {
                  ...header,
                  description: value
                }
              )} />
          </div>
          <div>

            <div className="form-group">
              <label htmlFor="description" className="control-label">
                Project description
              </label>
              <RTEditor editorValue={projectUpdate ? projectUpdate.description : ''} handleChange={(value) =>
                setProjectUpdate(
                  {
                    ...projectUpdate,
                    description: value
                  }
                )} />
            </div>
            <div>
              <p>Basic info</p>
              <div className="course-basics-form--inline-fields--3ZuU2">
                <div className="form-group">
                  <label
                    htmlFor="instructional_level"
                    className="sr-only control-label"
                  >
                    Project instructional level
                  </label>
                  <div className="form-control-single-select-container">
                    <select
                      title="Instructional level"
                      id="instructional_level"
                      className="form-control"
                      value={projectUpdate.level || -1}
                      onChange={event => setProjectUpdate({
                        ...projectUpdate,
                        level: event.target.value
                      })}
                    >
                      <option value={-1}>-- Select Level --</option>
                      {levels && levels.map(level => <option key={level.name} value={level.name}>{level.display}</option>)}

                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="category" className="sr-only control-label">
                    Project category
                  </label>
                  <div className="form-control-single-select-container">
                    <select
                      title="Category"
                      id="category"
                      value={projectUpdate.category || -1}
                      onChange={(event) => {
                        const newCat = categories && categories.find(cat => cat.id == Number(event.target.value))
                        if (newCat) setProjectUpdate({
                          ...projectUpdate,
                          category: newCat.id
                        })
                        setCategory(newCat)
                      }}
                      className="form-control"
                    >
                      <option value={-1}>-- Select Category --</option>
                      {categories && categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}

                    </select>
                  </div>
                </div>

              </div>

              <p>Select Courses for this project</p>
              <div className="course-basics-form--inline-fields--3ZuU2">

                <div className="form-group">
                  <label htmlFor="courses" className="sr-only control-label">
                    Project courses
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    onChange={value => {
                      console.log(value)
                     value && setProjectCourse(value as CourseResponse[])
                    }}
                    value = {projectCourse}
                  
                    getOptionLabel={options => options.title}
                    getOptionValue={options => options.id.toString()}
                    isMulti
                    options={courses}

                  />
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="headline" className="control-label">
                  Let your students know the overall goal of this project
                </label>
                <div className="form-control-counter-container">
                  <input
                    placeholder="Insert your course subtitle."
                    name="headline"
                    value={projectUpdate.goal || ''}
                    onChange={event => setProjectUpdate({
                      ...projectUpdate,
                      goal: event.target.value
                    })}
                    maxLength={120}
                    id="headline"
                    className="form-control"
                  />
                  <div
                    className="form-control-counter"
                    data-purpose="form-control-counter"
                  >
                    {projectUpdate.goal ? projectUpdate.goal.length : null}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <div>
                    <div className="label-manager--sublabel--kpb1O">
                      <span data-purpose="safely-set-inner-html:label-manager:what-is-taught">
                        What is <strong>primarily</strong> taught in your project?
                      </span>
                      <span className="label-manager--tooltip-icon--15XkO overlay-with-pointer cfi cfi-info-circle" />
                    </div>
                  </div>
                  <div className="m0 row">
                    <div className="col-sm-6 pl0 pr0">
                      <span className="course-labels--course-labels--gbBja">
                        {tags && tags.map(tag => (
                          <>
                            <span
                              key={tag}
                              className="course-labels--course-label--1Vi_C label label-default"
                            >
                              <span>{tag}</span>
                              <span
                                className="cfi cfi-close course-labels--course-label__icon--cBTbb"

                                role="button"
                                tabIndex={0}
                              />
                            </span>
                          </>
                        ))}

                      </span>
                      <Autosuggest
                        suggestions={suggestions}
                        renderSuggestion={renderSuggestion}
                        inputProps={suggestInputProps}
                        theme={theme}
                        onSuggestionSelected={(event, { suggestion }) => {
                          if (suggestion.isAddNew) {
                            setTags([
                              ...tags,
                              suggestionValue
                            ])
                          } else {
                            setTags([
                              ...tags,
                              suggestion.name
                            ])
                          }
                        }}
                        onSuggestionsClearRequested={() => {
                          setSuggestions([])
                        }}
                        getSuggestionValue={(suggestion) => {
                          if (suggestion.isAddNew) return suggestionValue
                          return suggestion.name
                        }}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested} />
                    </div>

                  </div>


                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Course image</label>
              <div>
                <div className="image-upload-preview-with-crop--stack--URrDD">
                  <div className="image-upload-preview-with-crop--previewWrapper--1eYsy">
                    <div className="image-upload-preview-with-crop--imageWrapper--fNINE">
                      <img

                        alt="Course image"

                        src={projectUpdate.thumbnail_url ? projectUpdate.thumbnail_url : "https://s.udemycdn.com/course/750x422/placeholder.jpg"}
                      />
                    </div>
                    <div className="image-upload-preview-with-crop--tips--17Lj2" />
                  </div>
                  <div className="image-upload-preview-with-crop--form-element--2Nnsf">
                    <div>
                      <p>
                        <span>
                          Upload your project image here. It must meet our
                          <a
                            href="https://support.udemy.com/hc/en-us/articles/229232347"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            course image quality standards
                          </a>
                          to be accepted. Important guidelines: 750x422 pixels;
                          .jpg, .jpeg,. gif, or .png. no text on the image.
                        </span>
                      </p>
                    </div>
                    <div
                      className="file-uploader--file-selector--SGCns"

                    >
                      {uploading ? <UploadProgress progress={progress} changeUpload={() => setUploading(!uploading)} /> : (
                        <><input
                          accept=".gif,.jpg,.jpeg,.png"
                          type="file"
                          onChange={event => onUpload(event.target.files[0], onProgress)}
                          id="FileUploaderS3-0--24"
                          className="sr-only"
                        />
                          <label htmlFor="FileUploaderS3-0--24">
                            <span className="input-group">
                              <div className="form-control file-uploader--fake-file-input--1_ohV">
                                No file selected
                              </div>
                              <span className="input-group-btn">
                                <div data-type="button" className="btn btn-default">
                                  Upload File
                                </div>
                              </span>
                            </span>
                          </label>
                        </>)}
                    </div>
                    <input type="hidden" />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
