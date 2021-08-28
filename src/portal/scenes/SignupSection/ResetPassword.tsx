import styles from "./style.module.scss";
import "./reset.scss";
import {
  showModal,
  hideCurrentModal,
} from "state/modals/modalSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import classNames from "classnames";
import { useState } from "react";
import { useResetPasswordMutation } from "services/auth";

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ resetPassword ] = useResetPasswordMutation()
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
                  <button
                    className="c-button c-button--link c-button--md cf-modal__close cf-p-0"
                    data-testid="modal-close-button"
                    onClick={() => dispatch(hideCurrentModal())}
                  >
                    <svg
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-label="Close"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.97 6.97a.75.75 0 011.06 0L12 10.94l3.97-3.97a.75.75 0 111.06 1.06L13.06 12l3.97 3.97a.75.75 0 11-1.06 1.06L12 13.06l-3.97 3.97a.75.75 0 01-1.06-1.06L10.94 12 6.97 8.03a.75.75 0 010-1.06z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div className="cf-px-4 cf-py-6">
                    <div>
                      <h4 className={styles.loginTitle}>Reset Password</h4>
                      <form
                        onSubmit={ async (event) => {
                          event.preventDefault();
                          console.log(email);
                          setLoading(!loading);
                          try {
                            const result = await resetPassword({ email }).unwrap()
                            console.log(result)
                            setLoading(!loading)
                          } catch (err) {
                            console.log(err)
                          }
                          
                          

              
                        }}
                      >
                        <div className="cf-form-group cf-form-group--default cf-mb-4">
                          <div className="row no-gutters justify-content-between align-items-center">
                            <div className="col align-self-end padding">
                              <label
                                htmlFor="email"
                                className="d-block cf-text-h8 cf-text--left cf-mb-1"
                              >
                                Email
                              </label>
                            </div>
                            <div className="col-12">
                              <div className="cf-form-input cf-form-element cf-form-element--default">
                                <input
                                  id="email"
                                  name="email"
                                  value={email}
                                  type="email"
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
                                  className="cf-form-element__element"
                                  data-ba="email-input"
                                />
                              </div>
                            </div>

                            <div className="col-auto align-self-start cf-ml-auto" />
                          </div>
                        </div>
                        <button
                          className={classNames(
                            styles.cButton,
                            "c-button--full-width c-button--primary c-button--md",
                            {
                              "c-button--loading": loading,
                            }
                          )}
                          type="submit"
                          data-ba="submit-btn"
                        >
                          <span className="c-button__content">Send Email</span>

                          {loading && ( <svg
                          width="2em"
                          height="2em"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="c-button__loader"
                        >
                          <path
                            opacity="0.3"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM5.25 12a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.25 6a.75.75 0 01.75-.75A6.75 6.75 0 0118.75 12a.75.75 0 01-1.5 0c0-2.9-2.35-5.25-5.25-5.25a.75.75 0 01-.75-.75z"
                            fill="currentColor"
                          ></path>
                        </svg>)}
                        </button>
                       
                        <p className="cf-text--center cf-mt-4">
                          Remember your password?{" "}
                          <a
                            className="cf-text--link"
                            onClick={() => dispatch(showModal("login"))}
                          >
                            Log In
                          </a>
                          .
                        </p>
                      </form>
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
