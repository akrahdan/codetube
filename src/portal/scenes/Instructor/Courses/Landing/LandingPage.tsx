import { useFetchCourseQuery, useFetchCourseLevelQuery, useFetchCategoriesQuery, useSearchTagsQuery, useUpdateCourseMutation } from "services/courses";
import { selectLocationPayload, selectLocationType } from "state/location/selectors";
import { useAppSelector } from "store/hooks";
import { selectSave } from "state/course/courseSplice";
import { useState, useEffect } from "react";
import * as client from 'filestack-js';
import Player from 'react-player';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme'
import algoliasearch from "algoliasearch/lite";
import { autoSearch } from "services/courses";
import type { CourseResponse } from 'services/courses'
import { courseMessage } from "portal/state/location/actions";
import { UploadProgress } from "./UploadProgress";
import { RTEditor } from 'portal/scenes/Instructor/Editor';
import classNames from "classnames";
import { usePrompt } from "../userPrompt";
import { useAlert } from "react-alert";
import type { CategoryResponse } from "services/courses";
import styles from './style.module.scss'



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



  const locationPayload = useAppSelector(selectLocationPayload);
  const locationPath = useAppSelector(selectLocationType);
  const selectedSave = useAppSelector(selectSave);
  const { data: course, isLoading } = useFetchCourseQuery(locationPayload.id)
  const [updateCourse] = useUpdateCourseMutation()
  const { data: levels } = useFetchCourseLevelQuery()
  const { data: categories } = useFetchCategoriesQuery()
  const [uploading, setUploading] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mediaResources, setMediaResources] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const [files, setFiles] = useState(null);
  const alert = useAlert()
  const [category, setCategory] = useState<CategoryResponse>()
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const [tags, setTags] = useState<string[]>(course ? course.tags : []);
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
        setCourseUpdate({
          ...courseUpdate,
          cover_image: results.url
        })
      }).catch(err => {
        setStatus('Failed')
        console.log(err)
        setError(err.status)
      })
  }

  const onVideoUpload = async (files, onProgress) => {
    setError(null)
    setStatus('Progress')
    setVideoUploading(true)

    filestack.upload(files, { onProgress })
      .then(results => {
        setCourseUpdate({
          ...courseUpdate,
          video_url: results.url
        })

      }).catch(err => {
        setStatus('Failed')
        console.log(err)
        setError(err.status)
      })
  }

  const [courseUpdate, setCourseUpdate] = useState<CourseResponse>(course)

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
      updateCourse({
        ...courseUpdate,
        tags
      }).then(data => {
        console.log(data)
        alert.show("Your changes have been saved successfully")
      }).catch(err => {
        console.log(err)
      })
    }
  }, [selectedSave])

  useEffect(() => {
    setCourseUpdate(course)
    setTags(course ? course.tags : [])
    const cat = course && course.category
    const newCat = categories && categories.find(item => item.id == cat)
    if (newCat) {
      setCategory(newCat)
    }

  }, [course])

  if (isLoading || !courseUpdate) {

    return (
      <div className="ud-app-loader">
        <div className="sub-header--wrapper--3Vunm">
          <div className="sub-header--main-content--22it3">
            <h2
              data-purpose="page-title"
              className="font-heading-serif-xl sub-header--title--2VD8q"
            >
              Course landing page
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
            Course landing page
          </h2>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">
        {" "}
        <form >
          <div className="form-group">
            <label htmlFor="title" className="control-label">
              Course title
            </label>
            <div className="form-control-counter-container">
              <input
                placeholder="Insert your course title."
                name="title"
                data-purpose="edit-course-title"
                maxLength={60}
                value={courseUpdate.title}
                onChange={(event) => setCourseUpdate({
                  ...courseUpdate,
                  title: event.target.value
                })}
                id="title"
                className="form-control"
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                {courseUpdate.title ? courseUpdate.title.length : null}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="headline" className="control-label">
              Course subtitle
            </label>
            <div className="form-control-counter-container">
              <input
                placeholder="Insert your course subtitle."
                name="headline"
                value={course.headline}
                onChange={event => setCourseUpdate({
                  ...courseUpdate,
                  headline: event.target.value
                })}
                maxLength={120}
                id="headline"
                className="form-control"
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                {courseUpdate.headline ? courseUpdate.headline.length : null}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="control-label">
              Course description
            </label>
            <RTEditor editorValue={courseUpdate ? courseUpdate.description: ''} handleChange={(value) =>
              setCourseUpdate(
                {
                  ...courseUpdate,
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
                  Course instructional level
                </label>
                <div className="form-control-single-select-container">
                  <select
                    title="Instructional level"
                    id="instructional_level"
                    className="form-control"
                    value={courseUpdate.level || -1}
                    onChange={event => setCourseUpdate({
                      ...courseUpdate,
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
                  Course category
                </label>
                <div className="form-control-single-select-container">
                  <select
                    title="Category"
                    id="category"
                    value={courseUpdate.category || -1}
                    onChange={(event) => {
                      const newCat = categories && categories.find(cat => cat.id == Number(event.target.value))
                      if (newCat) setCourseUpdate({
                        ...courseUpdate,
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
              <div className="form-group">
                <label htmlFor="subcategory" className="sr-only control-label">
                  Course subcategory
                </label>
                <div className="form-control-single-select-container">
                  <select
                    title="Subcategory"
                    id="subcategory"
                    value={courseUpdate.subcategory || -1}
                    onChange={event => setCourseUpdate({
                      ...courseUpdate,
                      subcategory: Number(event.target.value)
                    })}
                    className="form-control"
                  >
                    <option value={-1}>-- Select Subcategory --</option>
                    {category && category.children && category.children.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div>
                <div>
                  <div className="label-manager--sublabel--kpb1O">
                    <span data-purpose="safely-set-inner-html:label-manager:what-is-taught">
                      What is <strong>primarily</strong> taught in your course?
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

                    </span>;
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

                      src={courseUpdate.cover_image ? courseUpdate.cover_image : "https://s.udemycdn.com/course/750x422/placeholder.jpg"}
                    />
                  </div>
                  <div className="image-upload-preview-with-crop--tips--17Lj2" />
                </div>
                <div className="image-upload-preview-with-crop--form-element--2Nnsf">
                  <div>
                    <p>
                      <span>
                        Upload your course image here. It must meet our{" "}
                        <a
                          href="https://support.udemy.com/hc/en-us/articles/229232347"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          course image quality standards
                        </a>{" "}
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
          <div className="form-group">
            <label className="control-label">Promotional video</label>
            <div className="video-upload-with-preview--wrapper--1Gozg">
              <div className="video-upload-with-preview--previewWrapper--2cwTN">
                {courseUpdate.video_url ? <Player light className="contained" url={courseUpdate.video_url} width={`480px`} height={`270px`} /> : (<img
                  className="contained"
                  data-purpose="image-preview"
                  alt="placeholder"
                  width={480}
                  height={270}
                  src="https://s.udemycdn.com/course/480x270/placeholder.jpg"
                />)}
                {(videoUploading && progress < 100) && <div className="uploading-backdrop--wrapperLoader--3qlfG">
                  <span
                    aria-label="Loading"
                    className="uploading-backdrop--loader--23uMA cfi-medium cfi cfi-circle-loader"
                  />
                </div>}
              </div>
              <div className="video-upload-with-preview--formElement--3gzlF">
                <div className="video-upload-with-preview--tips--31TuE">
                  <div className="tip">
                    <p data-purpose="safely-set-inner-html:course-basics-form:promo-video-content-link">
                      Students who watch a well-made promo video are{" "}
                      <b>5X more likely to enroll</b> in your course. We've seen
                      that statistic go up to 10X for exceptionally awesome
                      videos.{" "}
                      <a
                        href="https://info.udemy.com/perfect-promo?utm_source=udemy-main&utm_medium=web&utm_content=inline-content&utm_campaign=promo-optimization"
                        rel="noopener noreferrer"
                        className="ext"
                      >
                        Learn how to make yours awesome!
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  className="file-uploader--file-selector--SGCns"
                  data-purpose
                >
                  {videoUploading ? <UploadProgress progress={progress} changeUpload={() => setUploading(!videoUploading)} /> : (<><input
                    accept=".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv"
                    type="file"
                    onChange={event => onVideoUpload(event.target.files[0], onProgress)}
                    id="FileUploaderS3-0--25"
                    className="sr-only"
                  />
                    <label htmlFor="FileUploaderS3-0--25">
                      <span className="input-group">
                        <div className="form-control file-uploader--fake-file-input--1_ohV">
                          No file selected
                        </div>
                        <span className="input-group-btn">
                          <div data-type="button"

                            className="btn btn-default">
                            Upload File
                          </div>
                        </span>
                      </span>
                    </label>
                  </>)}
                </div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default LandingPage;
