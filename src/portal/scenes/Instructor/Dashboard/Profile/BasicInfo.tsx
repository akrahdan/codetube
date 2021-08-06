import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import { RTEditor } from 'portal/scenes/Instructor/Editor'
import { useInstructor } from 'store/useInstructor'
import { useAlert } from "react-alert";
import type { InstructorResponse } from 'services/courses'
import { useFetchInstructorInfoQuery, useEditInstructorInfoMutation } from 'services/courses';
type BasicInfoProps = {
  active: boolean
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ active }) => {

  const { instructor } = useInstructor()
  const [ editInstructor ] = useEditInstructorInfoMutation()
  const [profile, setProfile] = useState<InstructorResponse>(instructor)
  const alert = useAlert()

  useEffect(() => {
    setProfile(instructor)
  }, [instructor])

  return (
    <div className={classNames("two-columns--two-columns--t3o3b", {
      hidden: !active
    })}>
      <form onSubmit={event => {
        event.preventDefault();
        editInstructor(profile).then((res: { data: InstructorResponse}) => {
           if(res.data) {
             alert.show("Your changes have been successfully saved.")
           }
        })

      }} >
        <div className="two-columns-ia__group">
          <div className="two-columns-ia__group__section">
            <div className="form-group">
              <label htmlFor="name" className="mb5 control-label">
                First Name
              </label>
              <input
                name="name"
                value={profile ? profile.first_name ? profile.first_name : '' : ''}
                onChange={event => {
                  setProfile({
                    ...profile,
                    first_name: event.target.value
                  })
                }}
                maxLength={64}
                id="name"
                className="form-control"

              />
            </div>
            <div className="form-group">
              <label htmlFor="surname" className="mb5 control-label">
                Last Name
              </label>
              <input
                name="surname"
                value={profile ? profile.last_name ? profile.last_name : '' : ''}
                onChange={event => {
                  setProfile({
                    ...profile,
                    last_name: event.target.value
                  })
                }}
                maxLength={64}
                id="surname"
                className="form-control"

              />
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="jobTitle" className="mb5 control-label">
                  Headline
                </label>
                <div className="form-control-counter-container">
                  <input
                    name="jobTitle"
                    value={profile ? profile.headline ? profile.headline : '' : ''}
                    onChange={event => {
                      setProfile({
                        ...profile,
                        headline: event.target.value
                      })
                    }}
                    placeholder="'Software  Architect' or 'Architect'"
                    maxLength={60}
                    id="jobTitle"
                    className="form-control"

                  />
                  <div
                    className="form-control-counter"
                    data-purpose="form-control-counter"
                  >
                    43
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="mb5 control-label">
                  Biography
                </label>
                <div >
                  <RTEditor editorValue={profile.description} handleChange={(value) => {
                    setProfile({
                      ...profile,
                      description: value
                    })
                  }} />
                </div>
                <span className="help-block">
                  Your biography should have at least 50 characters, links and
                  coupon codes are not permitted.
                </span>
              </div>

            </div>
          </div>
          <div className="two-columns-ia__group__section">
            <div className="form-group">
              <label htmlFor="urlPersonalWebsite" className="mb5 control-label">
                Website
              </label>
              <input
                name="urlPersonalWebsite"
                data-purpose="edit-profile-personal-website"
                placeholder="Url"
                maxLength={128}
                disabled
                id="urlPersonalWebsite"
                className="form-control"

              />
            </div>
            <div className="form-group">
              <label htmlFor="twitterProfile" className="mb5 control-label">
                Twitter
              </label>
              <span className="input-group">
                <span className="input-group-addon">
                  http://www.twitter.com/{" "}
                </span>
                <input
                  name="twitterProfile"
                  data-purpose="edit-profile-twitter"
                  placeholder="Username"
                  maxLength={128}
                  id="twitterProfile"
                  className="form-control"

                />
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="facebookProfile" className="mb5 control-label">
                Facebook
              </label>
              <span className="input-group">
                <span className="input-group-addon">
                  http://www.facebook.com/{" "}
                </span>
                <input
                  name="facebookProfile"
                  data-purpose="edit-profile-facebook"
                  placeholder="Username"
                  maxLength={128}
                  id="facebookProfile"
                  className="form-control"

                />
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="linkedInProfile" className="mb5 control-label">
                LinkedIn
              </label>
              <span className="input-group">
                <span className="input-group-addon">
                  http://www.linkedin.com/{" "}
                </span>
                <input
                  name="linkedInProfile"
                  data-purpose="edit-profile-linkedin"
                  placeholder="Resource ID"
                  maxLength={128}
                  id="linkedInProfile"
                  className="form-control"

                />
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="youtubeProfile" className="mb5 control-label">
                Youtube
              </label>
              <span className="input-group">
                <span className="input-group-addon">
                  http://www.youtube.com/{" "}
                </span>
                <input
                  name="youtubeProfile"
                  data-purpose="edit-profile-youtube"
                  placeholder="Username"
                  maxLength={128}
                  id="youtubeProfile"
                  className="form-control"

                />
              </span>
            </div>
          </div>
        </div>
        <div className="text-right mt20">
          <button
            type="submit"
            
            className="udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md"
          >
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};
