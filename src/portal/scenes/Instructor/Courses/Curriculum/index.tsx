import { useCreateSectionMutation, useEditSectionMutation,
   useCreateResourceMutation, useFetchResourcesQuery } from 'services/courses';
import classNames from 'classnames';
import { selectSections } from 'state/curriculum/currriculumSplice';
import { useFetchSectionsQuery } from 'services/courses';
import { useAppSelector } from 'store/hooks';
import { selectLocationPayload } from 'state/location/selectors';
import { PickerOverlay, client } from 'filestack-react';
import { PickerResponse } from 'filestack-js';
import "./styles.scss";
import styles from '../Landing/style.module.scss';
import { Section } from "./Section";
import { useEffect, useState } from "react";

export const Curriculum = () => {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [createSection, { isLoading }] = useCreateSectionMutation()
  const [ createResource ] = useCreateResourceMutation()
  const [editSection] = useEditSectionMutation()

  const selectedSections = useAppSelector(selectSections)
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: querySections } = useFetchSectionsQuery(locationPayload.id)
  const { data: resources } = useFetchResourcesQuery(locationPayload.id)
  const [sections, setSections] = useState(selectedSections)

  const onUploadSuccess = (results: PickerResponse) => {
    const data = results.filesUploaded
    data && Array.from(data).forEach( async file => {
      const media = {
        name: file.filename,
        filetype: file.mimetype,
        size: file.size,
        key: file.handle,
        course: locationPayload.id
      };
      try {
       const result = createResource(media).unwrap()
      } catch(err) {
        console.log(err)
      }
    })
  }
  const onClose = (event) => {
    setPickerOpen(false)
  }



  useEffect(() => {
    setSections(selectedSections)
    console.log('SelectedSections', selectedSections)
  }, [selectedSections])

  if (isLoading || !sections || (sections.length == 0)) {

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
  return (
    <>
      {pickerOpen && <PickerOverlay  apikey="AVBagqtWmRWyWVqWas0m9z"
        onSuccess={onUploadSuccess}
        pickerOptions={{
          onClose,
          maxFiles: 20
        }}
      />}
      <div>
        <div className="sub-header--wrapper--3Vunm">
          <div className="sub-header--main-content--22it3">
            <h2
              data-purpose="page-title"
              className="font-heading-serif-xl sub-header--title--2VD8q"
            >
              Curriculum
            </h2>
          </div>
          <div className="sub-header--actions--1Nblj">
            <div>
              <button onClick={() => setPickerOpen(!pickerOpen)} type="button" className="btn-bulk-uploader btn btn-default">
                Bulk Uploader
              </button>
            </div>
          </div>
        </div>
        <div className="main-content--wrap_component--2TEkz">
          <div className="curriculum-editor--alert-container--zgMwN">
            <div className="pb20">
              Start putting together your course by creating sections, lectures
              and practice (quizzes, coding exercises and assignments).
            </div>
            <p data-purpose="free-course-message">
              If you’re intending to offer your course for free, the total length
              of video content must be less than 2 hours.
            </p>
          </div>
          <div>
            <ul >
              {sections.map((section, index) => <Section editSection={value => {

                editSection({
                  id: section.id,
                  description: value.description,
                  title: value.title,
                  course: locationPayload.id
                })

              }} key={index} index={index} sectionResult={section} addSection={value => {

                createSection({
                  title: value.title,
                  description: value.description,
                  course: locationPayload.id,
                  position: value.position,
                  neighbor: section.id || null

                })

              }} />)}

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Curriculum;
