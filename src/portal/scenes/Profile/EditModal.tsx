import './profile.scss';
import logo from 'static/images/avatar/profile-avatar.png';

import type { UserRequest, Avatar, UserResponse, User } from 'services/auth';
import { PickerOverlay } from 'filestack-react';
import { PickerResponse } from "filestack-js";
import { useUpdateProfileMutation, useUpdateAvatarMutation } from 'services/auth'
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useAuth, useAvatar } from 'store/useAuth';


type ModalProps = {
  onClose: () => void
}

export const EditModal: React.FC<ModalProps> = ({ onClose }) => {
  
  const { user } = useAuth()
  const { avatar: userAvatar } = useAvatar()

  const [updateAvatar] = useUpdateAvatarMutation()
  const [updateProfile] = useUpdateProfileMutation()
  const alert = useAlert()
  const [ pickerOpen , setPickerOpen] = useState(false)
  const [avatar, setAvatar] = useState<Avatar>({
    avatar: userAvatar
  })

  const [profile, setProfile] = useState<User>(user)

  const onPickerClose = () => {
    setPickerOpen(false)
  }

  useEffect(() => {
     setProfile(user)
  }, [user])

  useEffect(() => {
    setAvatar({
      avatar: userAvatar
    })
 }, [userAvatar])

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
          alert.show('Your avatar updates saved successfully')
        }
      })
    }
  }



  return (
    <div
      aria-labelledby="myModalLabel"
      className="modal fade in"
      data-first-name-missing="false"
      data-user-course-id
      data-user-id={1304005}
      id="complete-your-profile"
      role="dialog"
      tabIndex={-1}
      style={{ display: "block",  background: 'rgba(0,0,0,0.8)' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content cf-invert">
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              onClick={onClose}
              data-dismiss="modal"
              id="cyp-dismiss"
              type="button"
            >
              <span aria-hidden="true"> ×</span>
            </button>
            <div className="cf-text--center">
              <h4 className="cf-text-h4 cf-mb-2">
                Please complete your profile.
              </h4>
              <p>Introduce yourself.</p>
            </div>
          </div>
          <div className="modal-body">
            <form
              className="new_user_info"
              id="new_user_info"
              onSubmit={event => {
                event.preventDefault()
                updateProfile(profile)
                .then((res: { data: User}) => {
                  if(res.data && res.data.email) {
                    alert.show('Your profile changes saved successfully')
                    onClose()
                  }
                }).catch(err => {
                  alert.error(err)
                })
              }}
             
              
            >
           
              <div className="pre-comment__col-user-container">
                <div className="pre-comment__col-user-avatar-container">
                  <div className="pre-comment__col-user-avatar-edit-holder">
                    <img
                      className="pre-comment__user-avatar profile-photo"
                      src={avatar.avatar ? avatar.avatar : logo}
                    />
                    <div
                      className="c-button c-button--tertiary upload-photo"
                      data-module="FilePickerUpload"
                      onClick={() => {
                        setPickerOpen(!pickerOpen)
                      }}
                     
                      id="cyp-picker-trigger"
                    >
                      Upload Photo
                    </div>
                    <a
                      className="c-button c-button--primary c-button--facebook btn-facebook"
                      href=""
                      id="facebook-connect"
                    >
                      Import from Facebook
                    </a>
                  </div>
                </div>
              </div>
              <div className="fields-container">
                <ul>
                  <li>
                    <p>Name:</p>
                    <div className="cyp-name first">
                      <input
                        
                        placeholder="First Name"
                        className="name first"
                        value={profile ? profile.first_name : ''}
                          onChange={event => {
                            setProfile({
                              ...profile,
                              first_name: event.target.value
                            })
                          }}
                        type="text"
                        name="user_info[first_name]"
                        id="user_info_first_name"
                      />
                    </div>
                    <div className="cyp-name">
                      <input
                        defaultValue="Akrah"
                        placeholder="Last Name"
                        className="name"
                        value={profile ? profile.last_name : ''}
                          onChange={event => {
                            setProfile({
                              ...profile,
                              last_name: event.target.value
                            })
                          }}
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
                      name="user_info[location]"
                      id="user_info_location"
                    />
                  </li>
                </ul>
                <button
                  className="cf-mt-3 c-button c-button--primary c-button--full-width"
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
  );
};
