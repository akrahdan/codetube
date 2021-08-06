import React, { useEffect, useState } from "react";
import * as client from 'filestack-js'
import classNames from 'classnames';
import avatar from 'static/images/avatar/profile-avatar.png'

import { selectInstructor } from 'state/instructor/instructorSplice';
import type { Instructor, InstructorResponse } from 'services/courses';
import { useInstructor } from "store/useInstructor";
import { useAlert } from 'react-alert';
import { UploadProgress } from "../../Courses/Landing/UploadProgress";
import { useEditInstructorInfoMutation } from 'services/courses';

const filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {})

type PictureProps = {
  active: boolean
}
export const Picture: React.FC<PictureProps> = ({ active }) => {

  const [progress, setProgress] = useState(0)
  const [upLoading, setUpLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const [editInstructorInfo] = useEditInstructorInfoMutation()
  const { instructor } = useInstructor()
  const alert = useAlert()
  const [profile, setProfile] = useState<InstructorResponse>(instructor)


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
    setProfile(instructor)
  }, [instructor])


  return (
    <div className={classNames("one-column--one-column--3pI7D", {
      hidden: !active
    })}>
      <form onSubmit={event => {
        event.preventDefault()
        editInstructorInfo({
          ...profile
        }).then((res: { data: InstructorResponse }) => {
          if (res.data && res.data.avatar) {

            alert.show('Your profile picture has been successfully saved.')

          }
        })
      }} >
        <div>
          <div className="form-group">
            <label className="control-label">Image preview</label>
            <span className="help-block">
              Minimum 200x200 pixels, Maximum 6000x6000 pixels
            </span>
            <div className="photo--profileCrop--tdqoW">
              <div >
                <div className="image-upload-preview-with-crop--previewWrapper--1eYsy">
                  <div className="image-upload-preview-with-crop--imageWrapper--fNINE">
                    <img
                      data-purpose="image-preview"
                      alt="Course image"

                      src={profile && profile.avatar ? profile.avatar : avatar}
                    />
                    {(upLoading && progress < 100) && <div className="uploading-backdrop--wrapperLoader--3qlfG">
                      <span
                        aria-label="Loading"
                        className="uploading-backdrop--loader--23uMA cfi-medium cfi cfi-circle-loader"
                      />
                    </div>}
                  </div>
                  <div className="image-upload-preview-with-crop--tips--17Lj2" />
                </div>
                <div className="image-upload-preview-with-crop--form-element--2Nnsf">
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

                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt20">
            <button
              type="submit"

              disabled={!profile || !profile.avatar}
              tabIndex={-1}
              className={classNames("udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md", {
                'udlite-btn-disabled': !profile || !profile.avatar
              })}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
