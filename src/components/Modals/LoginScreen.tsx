import React from 'react'
export const LoadingScreen: React.FC = ({

}) => {
    return (
        <div className="cf-modal cf-modal--small authentication-modal authentication-modal--login">
            <div className="cf-backdrop cf-backdrop--dark cf-modal__backdrop" />
            <div className="cf-modal__viewport">
                <div className="container">
                    <div className="cf-modal__content" tabIndex={-1}>
                        <div className="cf-invert cf-background cf-background--color-light cf-background--fit-content">
                            <div className="cf-background__background-container" />
                            <div className="cf-background__content-container">
                                <div className="cf-background__content">
                                    <div className="cf-modal__close">
                                        <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6.97 6.97a.75.75 0 011.06 0L12 10.94l3.97-3.97a.75.75 0 111.06 1.06L13.06 12l3.97 3.97a.75.75 0 11-1.06 1.06L12 13.06l-3.97 3.97a.75.75 0 01-1.06-1.06L10.94 12 6.97 8.03a.75.75 0 010-1.06z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="cf-px-4 cf-py-6">
                                        <div>
                                            <h4 className="cf-text-h4 cf-text--center cf-mb-6">Log In</h4>
                                            <div className="cf-mb-4">
                                                <button className="c-button c-button--full-width c-button--google c-button--md">
                                                    <svg
                                                        width="2em"
                                                        height="2em"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="cf-mr-3"
                                                    >
                                                        <rect width={24} height={24} rx={2} fill="#fff" />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M19.68 12.182c0-.567-.05-1.113-.145-1.636H12v3.094h4.305a3.68 3.68 0 01-1.596 2.415v2.007h2.585c1.513-1.393 2.386-3.444 2.386-5.88z"
                                                            fill="#4285F4"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12 20c2.16 0 3.97-.716 5.294-1.938l-2.585-2.008c-.716.48-1.633.764-2.71.764-2.083 0-3.846-1.407-4.475-3.298H4.85v2.073A7.997 7.997 0 0012 20z"
                                                            fill="#34A853"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.524 13.52c-.16-.48-.251-.993-.251-1.52s.09-1.04.25-1.52V8.407H4.852A7.997 7.997 0 004 12c0 1.29.31 2.513.85 3.593l2.674-2.073z"
                                                            fill="#FBBC05"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12 7.182c1.175 0 2.229.403 3.058 1.196l2.295-2.294C15.967 4.793 14.156 4 12 4a7.997 7.997 0 00-7.15 4.407l2.674 2.073C8.153 8.59 9.916 7.182 12 7.182z"
                                                            fill="#EA4335"
                                                        />
                                                    </svg>
                                                    Log in with Google
                                                </button>
                                            </div>
                                            <div className="cf-mb-4" data-ba="facebook-login">
                                                <button className="c-button c-button--full-width c-button--facebook c-button--md">
                                                    <svg
                                                        width="2em"
                                                        height="2em"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="cf-mr-3"
                                                    >
                                                        <path
                                                            d="M19.117 4H4.877A.883.883 0 004 4.883v14.24a.883.883 0 00.883.877h7.664v-6.187h-2.08V11.39h2.08V9.61c0-2.066 1.263-3.2 3.106-3.2a16.73 16.73 0 011.862.096v2.166h-1.28c-1 0-1.193.48-1.193 1.176v1.542h2.398l-.32 2.423h-2.08V20h4.077a.883.883 0 00.883-.883V4.877A.883.883 0 0019.117 4z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    Log in with Facebook
                                                </button>
                                            </div>
                                           
                                            <div className="cf-mb-4">
                                                <p className="cf-text-x-small cf-text-hr cf-opacity--muted cf-text--uppercase cf-mt-3">
                                                    <span>or</span>
                                                </p>
                                            </div>
                                            <form name="login-form">
                                                <div className="cf-form-group cf-form-group--default cf-mb-4">
                                                    <div className="row no-gutters justify-content-between align-items-center">
                                                        <div className="col align-self-end">
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
                                                                    name="email"
                                                                    type="email"
                                                                    className="cf-form-element__element"
                                                                    id="sign-in-email"
                                                                    data-ba="email-input"
                                                                    defaultValue=''
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col align-self-start">
                                                            <p className="cf-text-x-small cf-opacity--muted cf-text--left cf-mt-1" />
                                                        </div>
                                                        <div className="col-auto align-self-start cf-ml-auto" />
                                                    </div>
                                                </div>
                                                <div className="cf-form-group cf-form-group--default cf-mb-4">
                                                    <div className="row no-gutters justify-content-between align-items-center">
                                                        <div className="col align-self-end">
                                                            <label
                                                                htmlFor="password"
                                                                className="d-block cf-text-h8 cf-text--left cf-mb-1"
                                                            >
                                                                Password
                                                            </label>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="cf-form-input cf-form-element cf-form-element--default">
                                                                <input
                                                                    name="password"
                                                                    type="password"
                                                                    className="cf-form-element__element"
                                                                    id="sign-in-password"
                                                                    data-ba="password-input"
                                                                    defaultValue=''
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col align-self-start">
                                                            <p className="cf-text-x-small cf-opacity--muted cf-text--left cf-mt-1" />
                                                        </div>
                                                        <div className="col-auto align-self-start cf-ml-auto" />
                                                    </div>
                                                </div>
                                                <button
                                                    className="c-button c-button--full-width c-button--primary c-button--md"
                                                    type="submit"
                                                    name="submit-button"
                                                    data-ba="submit-btn"
                                                >
                                                    Log In
                                                </button>
                                            </form>
                                            <p className="cf-text--center cf-mt-4">
                                                Need an account?{" "}
                                                <a data-ba="sign-up-button" className="cf-text--link">
                                                    Sign up
                                                </a>
                                                .
                                            </p>
                                            <p className="cf-text-x-small cf-text--center cf-opacity--muted cf-text--link cf-mt-4">
                                                <a>Forgot your password?</a>
                                            </p>
                                            <p className="cf-text-x-small cf-text--center cf-opacity--muted cf-mt-4">
                                                By logging in, you agree to our{" "}
                                                <span className="cf-text--nowrap">
                                                    <a
                                                        className="cf-text--link cf-text--nowrap"
                                                        href="/privacy"
                                                    >
                                                        Privacy Policy
                                                    </a>{" "}
                                                    and{" "}
                                                    <a
                                                        className="cf-text--link cf-text--nowrap"
                                                        href="/terms"
                                                    >
                                                        Terms of Service
                                                    </a>
                                                    .
                                                </span>
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