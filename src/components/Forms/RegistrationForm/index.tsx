import { Box, GridForm, Markdown, Text } from '@codecademy/gamut';
import { delay } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { useMountedState } from 'react-use';
import request from 'superagent';
import { v4 as uuid } from 'uuid';
import cookie from 'react-cookies';
import { OauthButtonGroup } from 'components/Forms/OauthButtonGroup';
import { RecaptchaWrapper } from 'components/Forms/RecaptchaWrapper';
import { cfdata } from 'libs/cfdata';
// import { pushDataLayerEvent, trackUserClick } from '~/libs/eventTracking';
// import { logger } from '~/libs/logging/logger';
import { passwordTips } from 'libs/passwordTips';
// import { csrf } from '~/libs/superagent-auth';
// import { safeRedirectUrl } from '~/libs/url';
import { registerPath } from 'libs/urlHelpers';
// import registrationStrings from '~/localized/registration.json';
// import { useFeatureFlag } from 'state/features/hooks';

import { showModal } from 'state/modals/modalSlice';
import { useAppDispatch } from 'store/hooks';
import { redirectAfterLogin, serializeRegistrationValues } from './helpers';
import { RegistrationSSOForm } from './RegistrationSSOForm';
import styles from './styles/index.module.scss';
import {
  RegistrationFormProps,
  SerializedValues,
  SubmitValues,
  UserSubmitKey,
} from './types';
import { extractValidationErrors, VALIDATORS } from './validators';
import { useSignupMutation } from 'services/auth';
import { hideCurrentModal } from 'state/modals/modalSlice';
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess = redirectAfterLogin,
  onFailure,
  ...props
}) => {
  const dispatch = useAppDispatch()
  // const ssoFeatureFlag = useFeatureFlag('enterprise_sso_form');
  const isMounted = useMountedState();
  const [isDisabled, setDisabled] = useState(false);
  const [submitLocked, setSubmitLocked] = useState(true);
  const [recaptchaInstanceId, setRecaptchaInstanceId] = useState(uuid());
  const [
    serializedForm,
    setSerializedForm,
  ] = useState<SerializedValues | null>();
  const [recaptchaError, setRecaptchaError] = useState<string | undefined>();

  const captcha = useRef<RecaptchaWrapper | null>(null);

  const { emailValidation, passwordValidation } = useMemo(
    () => ({
      emailValidation: VALIDATORS.email(),
      passwordValidation: VALIDATORS.password(),
    }),
    []
  );

  // if (ssoFeatureFlag) {
  //   return <RegistrationSSOForm onSuccess={onSuccess} />;
  // }



  const resetRecaptcha = () => {

    setDisabled(false);
    setRecaptchaInstanceId(uuid());
  };

  const [signup] = useSignupMutation()

  const submitForm = async (values) => {
    values.password2 = values.password1
    values.csrfmiddlewaretoken = cookie.load('csrftoken')

    values.csrfmiddlewaretoken = cookie.load('csrftoken');
    try {
      const user = await signup(values).unwrap()
      localStorage.setItem('token', user.token);

      dispatch(hideCurrentModal())
      setDisabled(true);
    }
    catch (err) {
      if (err?.data?.non_field_errors) {
        const errors = err?.data?.non_field_errors;
        onFailure(errors)
      } else if (err?.data?.email) {
        const errors = err?.data?.email;
        onFailure(errors)
      } else if (err?.data?.password) {
        const errors = err?.data?.password;
        onFailure(errors)
      }
    }

  }

  /**
   * @description
   * This unlocks submit a half second after the first input to prevent against bots - subsequent calls have no effect
   * */
  const onUpdate = () => {
    delay(() => isMounted() && submitLocked && setSubmitLocked(false), 500);
  };

  const { currentPage, locationType, redirectUrl } = props;
  const signingUpFromExercise = locationType === 'location/EXERCISE';
  // const safeRedirect = redirectUrl && safeRedirectUrl(redirectUrl);

  return (
    <div className={styles.registrationContainer}>
      <GridForm
        className={styles.loginForm}
        fields={[
          {
            name: UserSubmitKey.EMAIL,
            label: 'Email',
            type: 'email',
            defaultValue: '',
            size: 12,
            onUpdate,

          },

          {
            name: UserSubmitKey.USERNAME,
            label: 'Username',
            type: 'text',
            defaultValue: '',
            size: 12,
            onUpdate,

          },
          {
            name: UserSubmitKey.PASSWORD1,
            label: 'Password',
            type: 'password',
            tooltip: {
              children: <Markdown text={passwordTips} />,
              id: 'password-tooltip',
              alignment: 'bottom-left',
              className: styles.tooltipContainer,
            },
            size: 12,
            onUpdate,
            defaultValue: '',

          },

        ]}
        submit={{
          contents: 'Create Account',
          position: 'stretch',
          theme: 'brand-red',
          size: 12,
          disabled: isDisabled || submitLocked,
        }}
        validation="all"
        onSubmit={submitForm}
      />
      <Box pt={16}>
        {recaptchaError && (
          <div className={styles.recaptchaError} >
            {recaptchaError}
          </div>
        )}

      </Box>
      <Text className={styles.textDisplay} >
        <p className={styles.textCenter}>
          Already have an account?{" "}
          <a className={styles.textLink} onClick={() => dispatch(showModal('login'))}>
            Sign in
          </a>
          .
        </p>
      </Text>

    </div>
  );
};
