import { RTEditor } from 'portal/scenes/Instructor/Editor'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { selectInstructor } from 'state/instructor/instructorSplice';
import type { Instructor, InstructorResponse } from 'services/courses';
import { useAppSelector } from 'store/hooks';
import { useAlert } from 'react-alert';
import { useFetchInstructorInfoQuery, useEditInstructorInfoMutation } from 'services/courses';
export const PersonalInfo = ({ active, next }) => {
  const [editInstructorInfo] = useEditInstructorInfoMutation()
  const { data: profileQuery, isLoading } = useFetchInstructorInfoQuery()
  const selectedProfile = useAppSelector(selectInstructor)
  const alert = useAlert()
  const [profile, setProfile] = useState<InstructorResponse>(selectedProfile)

  useEffect(() => {
    setProfile(selectedProfile)
  }, [selectedProfile])

  if (isLoading || !profile) {
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
                )}>

              </div>
            </div>
          </form>

        </div>


      </div>
    );
  }

  return (
    <form className={classNames({
      hidden: !active
    })}
    onSubmit= {event => {
      event.preventDefault();
      if(profile) {
        editInstructorInfo({
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
          headline: profile.headline,
          description: profile.description
        }).then((res: { data: InstructorResponse}) => {
           alert.show("Your profile changes have been saved successfully")
           next()
        })
      }

    }}
    >
      <div className="manage-fields-wrapper sectioned">

        <div
          className="form-field-container  labeled form-section"
          id="form-item-name"
        >

          <label className="control-label " htmlFor="id_name">
            Basics:
          </label>
          <div id="tooltip-reference-name" className="tooltip-reference pos-r ">

            <input
              type="text"
              name="first_name"
              value={profile.first_name || profile.user && profile.user.first_name ||profile.user && profile.user.username}
              className="textinput textInput form-control"
              onChange={(event) => {
                setProfile({
                  ...profile,
                  first_name:event.target.value
                })
              }}
              required
              id="id_first_name"
              placeholder="First Name"
            />
          </div>
        </div>
        <div
          className="form-field-container  non-labeled form-section"
          id="form-item-surname"
        >

          <div
            id="tooltip-reference-surname"
            className="tooltip-reference pos-r "
          >

            <input
              type="text"
              name="last_name"
              value={profile.last_name ||profile.user && profile.user.last_name ||profile.user && profile.user.username}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  last_name:event.target.value
                })
              }}
              className="textinput textInput form-control"
              required
              id="last_name"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div
          className="form-field-container  non-labeled form-section"
          id="form-item-job_title"
        >

          <div
            id="tooltip-reference-job_title"
            className="tooltip-reference pos-r "
          >

            <div
              className="ud-app-loader ud-component--form-fields--form-control-with-counter ud-app-loaded"
              data-module-id="form-fields"
            >
              <div className="form-control-counter-container">
                <input
                  name="job_title"
                  maxLength={60}
                  value={profile.headline || ''}
                  onChange={(event) => {
                    setProfile({
                      ...profile,
                      headline:event.target.value
                    })
                  }}
                  placeholder="Headline"
                  type="text"
                  id="id_job_title"
                  className="textinput textInput form-control form-control"

                />
                <div
                  className="form-control-counter"
                  data-purpose="form-control-counter"
                >
                  60
                </div>
              </div>
            </div>
            <div className="help-block">
              Add a professional headline like, "Engineer at Codefluent" or
              "Architect."
            </div>
          </div>
        </div>
        <div
          className="form-field-container  non-labeled form-section"
          id="form-item-email"
        >

          <div
            id="tooltip-reference-email"
            className="tooltip-reference pos-r "
          >

            <input
              type="email"
              name="email"
              onChange={(event) => {
                setProfile({
                  ...profile,
                  email:event.target.value
                })
              }}
              value={profile.email || profile.user && profile.user.email}
              className="emailinput form-control"
              required
              id="id_email"
              placeholder="Email"
            />
          </div>
        </div>
        <div
          className="form-field-container  labeled form-section"
          id="form-item-description"
        >

          <label className="control-label " htmlFor="id_description">
            Biography:
          </label>
          <div
            id="tooltip-reference-description"
            className="tooltip-reference pos-r "
          >

            <div
              className="ud-app-loader ud-component--form-fields--rich-text-editor ud-app-loaded"
              data-module-id="form-fields"
            >
              <div >
                <RTEditor editorValue={profile.description} handleChange={(value) => {
                  setProfile({
                    ...profile,
                    description: value
                  })
                }} />

              </div>
            </div>
            <div className="help-block">
              Your instructor biography should emphasize your experience and
              expertise. It should have at least 50 characters and may not
              contain links or coupon codes.
            </div>
          </div>
        </div>
      </div>
      <div className="form-actions">

        <div className="submit-row">

          <input
            type="submit"
            name="submit"
            defaultValue="Save and Continue"
            className="btn btn-primary "
            id="submit-id-submit"
          />
        </div>
      </div>
    </form>
  );
};
export default PersonalInfo