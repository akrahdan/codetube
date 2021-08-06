import React, { Component } from 'react'

import Button from '@pluralsight/ps-design-system-button'
import Link from '@pluralsight/ps-design-system-link'
import moment from 'moment'

// import * as actions from '../../actions'
import { Errors } from '../constants'
import css from './error-modal.module.css'

function ModalUnauthenticated(signIn) {
  return (
    <div className={css['error-modal__content']}>
      <p>You need to sign in to view this course.</p>
      <Button className={css['error-modal__btn']} onClick={() => signIn && signIn()}>
        Sign in
      </Button>
    </div>
  )
}

function ModalForbidden(upgrade, buttonText) {
  return (
    <div className={css['error-modal__content']}>
      <p>
        Your current plan doesn’t allow access to this course. Upgrade to get access to thousands of expert-led courses
        across hundreds of topics.
      </p>
      <Button className={css['error-modal__btn']} onClick={() => upgrade && upgrade()}>
        {buttonText}
      </Button>
    </div>
  )
}

export const ModalGeneric = ({ retry, tryAgainCount, setTryAgainCount }) => {
  return (
    <div className={css['error-modal__content']}>
      <p>We're sorry, there has been an issue loading your video.</p>
      <Button
        className={css['error-modal__btn']}
        onClick={() => {
          setTryAgainCount && setTryAgainCount(tryAgainCount ? tryAgainCount + 1 : 1)
          retry && retry()
        }}
      >
        Try again
      </Button>
      {tryAgainCount > 0 && (
        <div>
          <Link appearance={Link.appearances.subtle}>
            <a className={css['error-modal__link']} href="https://app.pluralsight.com/video/test" target="_blank">
              Still having issues?
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export class ErrorModal extends Component {
  getErrorMessage() {
    const {
      error,
      signIn,
      requestUrls,
      setLoading,
      upgrade,
      userId,
      tryAgainCount,
      setTryAgainCount,
      currentTime = new Date().toISOString(),
      boundedContext, 
      clipId
    } = this.props
    const isAnonymous = !userId || userId === 'anonymous'
    const isInPromotionWindow = moment(currentTime).isBetween('2021-02-09T07:00:00.000Z', '2021-02-18T07:00:00.000Z')

    const upgradeText = isInPromotionWindow ? 'Get 33% off' : 'Upgrade'

    if (error === Errors.UNAUTHENTICATED) return ModalUnauthenticated(signIn)
    if (error === Errors.FORBIDDEN && isAnonymous) return ModalUnauthenticated(signIn)
    if (error === Errors.FORBIDDEN) return ModalForbidden(() => upgrade(boundedContext, clipId), upgradeText)

    return (
      <ModalGeneric
        retry={() => {
          setLoading(true)
          requestUrls()
        }}
        tryAgainCount={tryAgainCount}
        setTryAgainCount={setTryAgainCount}
      />
    )
  }

  render() {
    const { error } = this.props

    if (!error) return null

    return <div className={css.errorModal}>{this.getErrorMessage()}</div>
  }
}

export default ErrorModal;

// export default connect(
//   (state) => ({
//     error: state.error,
//     clipId: state.clipId,
//     boundedContext: state.boundedContext,
//     userId: state.userId,
//     currentUrlIndex: state.currentUrlIndex,
//     tryAgainCount: state.tryAgainCount,
//   }),
//   (store) => ({
//     setLoading: actions.setLoading,
//     requestUrls: actions.requestUrls,
//     setTryAgainCount: actions.setTryAgainCount,
//   })
// )(ErrorModal)
