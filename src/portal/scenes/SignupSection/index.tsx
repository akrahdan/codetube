import React from "react";
import { ContentContainer } from "@codecademy/gamut";
import { RegistrationForm } from 'components/Forms/RegistrationForm';
import { GoogleLogin } from "./OauthLoginWrapper/GoogleLogin";
import { FacebookLogin } from "./OauthLoginWrapper/FacebookLogin";
import { showModal, hideModal, hideCurrentModal, selectModal } from 'state/modals/modalSlice';
import { useFacebookLoginMutation, useGoogleLoginMutation } from 'services/auth'
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './style.module.scss'
export type SignUpSectionProps = {
    redirectUrl?: string;
};

export const SignupSection: React.FC<SignUpSectionProps> = ({
    redirectUrl,
}) => {
    const dispatch = useAppDispatch();
    const [ facebookLogin ] = useFacebookLoginMutation();
    const [ googleLogin ] = useGoogleLoginMutation();
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
                                            <h4 className={styles.loginTitle}>Create Account</h4>
                                            <GoogleLogin className={styles.cButton} onGoogleClick={facebookLogin}/>
                                            <FacebookLogin className={styles.cButton} onFacebookClick={googleLogin}/>

                                            <div className={styles.mp4}>
                                                <p className={styles.orSeparator}>
                                                    <span>or</span>
                                                </p>
                                            </div>
                                            <RegistrationForm redirectUrl="/" />

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