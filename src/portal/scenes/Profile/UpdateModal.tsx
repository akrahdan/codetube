import React, { useState } from "react";

import classNames from 'classnames';
import styles from './style.module.scss';
import type { UserRequest, Avatar, UserResponse } from 'services/auth';
import { PickerOverlay } from 'filestack-react';
import { PickerResponse } from "filestack-js";
import { useUpdateProfileMutation, useUpdateAvatarMutation } from 'services/auth'


type ModalProps = {
  onClose: () => void
}

export const UpdateModal: React.FC<ModalProps> = ({ onClose }) => {
  const [updateAvatar] = useUpdateAvatarMutation()
  const [updateProfile] = useUpdateProfileMutation()
  const cs = classNames(styles.cButton, styles.uploadPhoto)
  const [ pickerOpen , setPickerOpen] = useState(false)
  const [avatar, setAvatar] = useState<Avatar>({
    avatar: ''
  })

  const [profile, setProfile] = useState<UserRequest>({
    first_name: '',
    last_name: '',
    email: '',
    csrfmiddlewaretoken: ''
  })

  const onPickerClose = () => {
    setPickerOpen(false)
  }

  const onUploadSuccess = (result: PickerResponse) => {
    if (result.filesUploaded && result.filesUploaded.length) {
      const files = result.filesUploaded[0]
      updateAvatar({
        avatar: files.url
      }).then((res: { data: UserResponse}) => {
        if(res.data && res.data.avatar) {
          setAvatar({
            avatar: res.data.avatar
          })
        }
      })
    }
  }



  return (
    <div
      aria-labelledby="myModalLabel"
      className={styles.modalOpen}
      role="dialog"
      tabIndex={-1}
      style={{ display: "block" }}
    >
      <div className={styles.cfBackdrop}>
        <div className={styles.modalDialog} role="document">
          <div className={classNames(styles.modalContent, styles.cfInvert)}>
            <div className={styles.modalHeader}>
              <button
                aria-label="Close"
                className={styles.close}
                onClick={onClose}
                type="button"
              >
                <span aria-hidden="true"> ×</span>
              </button>
              <div className={styles.textCenter}>
                <h4 className={styles.mbh4}>
                  Please complete your profile.
                </h4>

              </div>
            </div>
            <div className={styles.modalBody}>
              <form
                className="new_user_info"
                onSubmit={event => {
                  event.preventDefault();
                  updateProfile(profile)
                  onClose()
                }}

              >

                <div className={styles.userContainer}>
                  <div className="pre-comment__col-user-avatar-container">
                    <div className={styles.avatarEditHolder}>
                      <img
                        className={styles.profilePhoto}
                        src={avatar.avatar ? avatar.avatar : process.env.PUBLIC_URL + '/img/avatar-photo.png'}
                      />
                      <div
                        className={cs}
                       onClick={() => {
                         setPickerOpen(!pickerOpen)
                       }}
                       >
                        Upload Photo
                      </div>
                      <a
                        className={classNames(styles.cButton, styles.buttonFacebook)}
                        href=""

                      >
                        Import from Facebook
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.fieldsContainer}>
                  <ul>
                    <li>
                      <p>Name:</p>
                      <div className={classNames(styles.name, styles.first)}>
                        <input
                          placeholder="First Name"
                          className={styles.input}
                          type="text"
                          value={profile ? profile.first_name : ''}
                          onChange={event => {
                            setProfile({
                              ...profile,
                              first_name: event.target.value
                            })
                          }}
                          name="user_info[first_name]"
                          id="user_info_first_name"
                        />
                      </div>
                      <div className={styles.name}>
                        <input
                          placeholder="Last Name"
                          value={profile ? profile.last_name : ''}
                          onChange={event => {
                            setProfile({
                              ...profile,
                              last_name: event.target.value
                            })
                          }}
                          className={styles.input}
                          type="text"
                          name="user_info[last_name]"
                          id="user_info_last_name"
                        />
                      </div>
                    </li>
                    <li>
                      <p>Location:</p>
                      <input
                        placeholder="Your Location"
                        type="text"
                        name={styles.input}
                        id="user_info_location"
                      />
                    </li>
                  </ul>
                  <button
                    className={classNames(styles.cButton, styles.cButtonPrimary)}
                    id="cyp-submit"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </form>
              {pickerOpen && <PickerOverlay apikey="AVBagqtWmRWyWVqWas0m9z"
                onSuccess={onUploadSuccess}
                pickerOptions={{
                  onClose: onPickerClose,
                  
                }}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
