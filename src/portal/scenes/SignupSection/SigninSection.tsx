import React from "react";
import { ContentContainer } from "@codecademy/gamut";
import axios  from 'axios';
import { SigninForm } from 'components/Forms/RegistrationForm/SigninForm';
import { GoogleLogin } from "./OauthLoginWrapper/GoogleLogin";
import { FacebookLogin } from "./OauthLoginWrapper/FacebookLogin";
import { useFacebookLoginUrlMutation, useGoogleLoginUrlMutation } from 'services/auth'
import { showModal, hideModal, hideCurrentModal, selectModal } from 'state/modals/modalSlice';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './style.module.scss'
export type SignUpSectionProps = {
    redirectUrl?: string;
};

export const SiginSection: React.FC<SignUpSectionProps> = ({
    redirectUrl,
}) => {
    const dispatch = useAppDispatch()
    const [ facebookLoginUrl ] = useFacebookLoginUrlMutation()
    const [ googleLoginUrl ] = useGoogleLoginUrlMutation()

    const handleGoogleLogin = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/auth/google/url')
            console.log("Result: ", res)
        } catch(err) {
            console.log("Error: ", err)
        }
       
        
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
                                    <div className={styles.modalClose} onClick={()=> dispatch(hideCurrentModal())}>
                                        <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none">
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
                                            <GoogleLogin className={styles.cButton} onGoogleClick={handleGoogleLogin}/>
                                            <FacebookLogin className={styles.cButton} onFacebookClick={facebookLoginUrl} />

                                            <div className={styles.mp4}>
                                                <p className={styles.orSeparator}>
                                                    <span>or</span>
                                                </p>
                                            </div>
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
}