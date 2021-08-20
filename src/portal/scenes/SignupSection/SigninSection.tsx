import React, { useState } from "react";
import { ContentContainer } from "@codecademy/gamut";
import './sign.scss';
import { SigninForm } from "components/Forms/RegistrationForm/SigninForm";
import { GoogleLogin as GoogleBtn } from "./OauthLoginWrapper/GoogleLogin";
import { FacebookLogin as FacebookBtn } from "./OauthLoginWrapper/FacebookLogin";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Google, { GoogleLogin} from 'react-google-login';
import {
  useGoogleLoginMutation,
  useFacebookLoginMutation,
  getCurrentUser,
  useGetCurrentUserQuery
} from "services/auth";
import {
  showModal,
  hideModal,
  hideCurrentModal,
  selectModal,
} from "state/modals/modalSlice";

import { useAppDispatch, useAppSelector } from "store/hooks";
import styles from "./style.module.scss";
import { useStore } from "react-redux";
export type SignUpSectionProps = {
  redirectUrl?: string,
};

export const SiginSection: React.FC<SignUpSectionProps> = ({ redirectUrl }) => {
  const dispatch = useAppDispatch();
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();
  const [errors, setErrors] = useState<string[]>()
  

  const handleGoogleLoginSuccess = async (res) => {
   try {
     console.log(res.accessToken)
     const user = await googleLogin({
       access_token: res.accessToken
     }).unwrap()
     localStorage.setItem('token', user.key)
     dispatch(getCurrentUser.initiate())
     dispatch(hideCurrentModal())
     
   } catch(err) {
    if(err?.data?.non_field_errors) {
      setErrors(err?.data?.non_field_errors)
    }
   }
  }

  const handleGoogleLoginFailure = (response) => {
    console.log('Error:', response)
  }

  const handleFacebookResponse = (res) => {
    console.log(res)
  }

  return (
    <div className={styles.cfModal}>
      <div className={styles.cfBackdrop} />
      <div className={styles.cfModalViewport}>
        <div className={styles.container}>
          <div className={styles.cfModalContent} tabIndex={-1}>
            <div className={styles.cfInvert}>
              <div className={styles.cfBackgroundContainer} />
              <div className={styles.contentContainer}>
                <div className={styles.backgroundContent}>
                  <div
                    className={styles.modalClose}
                    onClick={() => dispatch(hideCurrentModal())}
                  >
                    <svg
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.97 6.97a.75.75 0 011.06 0L12 10.94l3.97-3.97a.75.75 0 111.06 1.06L13.06 12l3.97 3.97a.75.75 0 11-1.06 1.06L12 13.06l-3.97 3.97a.75.75 0 01-1.06-1.06L10.94 12 6.97 8.03a.75.75 0 010-1.06z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className={styles.cfPadding}>
                    <div>
                      <h4 className={styles.loginTitle}>Log In</h4>
                      <GoogleLogin
                        buttonText="LOGIN WITH GOOGLE"
                        clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        render={props => (
                          <GoogleBtn onGoogleClick={props.onClick} className={styles.cButton} />
                        )}
                        
                      />
                      
                      <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        
                        render={props => (
                          <FacebookBtn onFacebookClick={props.onClick} className={styles.cButton}/>
                        )}
                        
                        callback={handleFacebookResponse}
                      />


                      <div className={styles.mp4}>
                        <p className={styles.orSeparator}>
                          <span>or</span>
                        </p>
                      </div>
                      {errors?.length && errors?.map((err, index) =>  <p  key={index} className="cf-text--error cf-text--center cf-mb-4">{err}</p> )}
                      <SigninForm redirectUrl="/" />

                      <p className={styles.passForget}>
                        <a>Forgot your password?</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
