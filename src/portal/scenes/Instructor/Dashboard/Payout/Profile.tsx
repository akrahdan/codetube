import classNames from "classnames";
import * as client from 'filestack-js'
import { useEffect, useState } from "react";
import avatar from 'static/images/avatar/profile-avatar.png'
import { selectInstructor } from 'state/instructor/instructorSplice';
import type { Instructor, InstructorResponse } from 'services/courses';
import { useAppSelector } from 'store/hooks';
import { useAlert } from 'react-alert';
import { UploadProgress } from "../../Courses/Landing/UploadProgress";
import { useFetchInstructorInfoQuery, useEditInstructorInfoMutation } from 'services/courses';

const filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {})
export const Profile = ({ active, next }) => {
  const [progress, setProgress] = useState(0)
  const [upLoading, setUpLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const [editInstructorInfo] = useEditInstructorInfoMutation()
  const { data: profileQuery, isLoading } = useFetchInstructorInfoQuery()
  const selectedProfile = useAppSelector(selectInstructor)
  const alert = useAlert()
  const [profile, setProfile] = useState<InstructorResponse>(selectedProfile)


  const onProgress = eve => {
    console.log(eve.totalPercent)
    setProgress(eve.totalPercent)

  }

  const onUpload = async (files, onProgress) => {
    setError(null)
    setStatus('Progress')
    setUpLoading(true)

    filestack.upload(files, { onProgress })
      .then(results => {
        setProfile({
          ...profile,
          avatar: results.url
        });
        setUpLoading(false)
      }).catch(err => {
        setStatus('Failed')
        console.log(err)
        setError(err.status)
      })
  }

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
    <form
      className={classNames({
        hidden: !active
      })}
      onSubmit={event => {
        event.preventDefault()
        editInstructorInfo({
          ...profile
        }).then((res: { data: InstructorResponse }) => {
          if (res.data && res.data.avatar) {

            alert.show('Your profile picture has been successfully saved.')
            next()
          }
        })
      }}
    >
      <div className="manage-fields-wrapper">

        <div
          className="form-field-container  labeled form-section"
          id="form-item-image_file"
        >

          <label className="control-label " htmlFor="id_image_file">
            Image preview
          </label>
          <div
            id="tooltip-reference-image_file"
            className="tooltip-reference pos-r "
          >

            <div>

              <div
                className="ud-app-loader ud-component--versioned-image-upload-with-preview--app mt20 mb30 ud-app-loaded"

              >
                <div >
                  <div className="image-upload-preview-with-crop--previewWrapper--1eYsy">
                    <div className="image-upload-preview-with-crop--imageWrapper--fNINE">
                      <img
                        data-purpose="image-preview"
                        alt="Course image"
                        style={{ width: '200px', height: '200px' }}
                        src={profile && profile.avatar ? profile.avatar : avatar}
                      />
                      {(upLoading && progress < 100) && <div className="uploading-backdrop--wrapperLoader--3qlfG">
                        <span
                          aria-label="Loading"
                          className="uploading-backdrop--loader--23uMA cfi-medium cfi cfi-circle-loader"
                        />
                      </div>}
                    </div>
                    <div className="image-upload-preview-with-crop--tips--17Lj2">
                      Your image should be at minimum 200x200 pixels and maximum
                      6000x6000 pixels.
                    </div>
                  </div>
                  <div className="image-upload-preview-with-crop--form-element--2Nnsf">
                    <div>
                      <label>Add / Change Image:</label>
                    </div>
                    <div
                      className="file-uploader--file-selector--SGCns"

                    >
                      {upLoading ? <UploadProgress progress={progress} changeUpload={() => setUpLoading(!upLoading)} /> : <>
                        <input
                          accept=".gif,.jpg,.jpeg,.png"
                          type="file"
                          onChange={event => onUpload(event.target.files[0], onProgress)}
                          id="FileUploaderS3-0--1"
                          className="sr-only"
                        />
                        <label htmlFor="FileUploaderS3-0--1">
                          <span className="input-group">
                            <div className="form-control file-uploader--fake-file-input--1_ohV">
                              No file selected
                            </div>
                            <span className="input-group-btn">
                              <div data-type="button" className="btn btn-default">
                                Upload image
                              </div>
                            </span>
                          </span>
                        </label>
                      </>}
                    </div>
                    <input type="hidden" name="image_file" />
                  </div>
                </div>
              </div>
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

export default Profile
