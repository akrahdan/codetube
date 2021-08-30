import { Box, GridForm, Markdown, Text } from '@codecademy/gamut';
import { delay } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { useMountedState } from 'react-use';

import { v4 as uuid } from 'uuid';

import cookie from 'react-cookies';

import { RecaptchaWrapper } from 'components/Forms/RecaptchaWrapper';


import { passwordTips } from 'libs/passwordTips';
import { setCredentials } from 'state/auth/authSlice';


import { hideCurrentModal, showModal } from 'state/modals/modalSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useLoginMutation, useGetCurrentUserQuery, getCurrentUser } from 'services/auth';
import { redirectAfterLogin, serializeRegistrationValues } from './helpers';

import styles from './styles/index.module.scss';
import {
  RegistrationFormProps,
  SerializedValues,
  SubmitValues,
  UserSubmitKey,
} from './types';
import { extractValidationErrors, VALIDATORS } from './validators';

export const SigninForm: React.FC<RegistrationFormProps> = ({
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


  
  const [login, { data, error}] = useLoginMutation()
  

  const onUpdate = () => {
    delay(() => isMounted() && submitLocked && setSubmitLocked(false), 500);
  };

  const submitForm = async (values) => {
    try {
      values.csrfmiddlewaretoken = cookie.load('csrftoken');
      const user = await login(values).unwrap()
      localStorage.setItem('token', user.token);
      dispatch(setCredentials(user))
      dispatch(getCurrentUser.initiate())
      dispatch(hideCurrentModal())
      
      

    } catch (err) {
      if(err?.data?.non_field_errors) {
        const errors = err?.data?.non_field_errors;
        onFailure(errors)
      } else if(err?.data?.email) {
        const errors = err?.data?.email;
        onFailure(errors)
      }
      
      
    }
    
  }

  

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
            name: UserSubmitKey.PASSWORD,
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
          contents: 'Log In',
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
        {/* <RecaptchaWrapper
          key={recaptchaInstanceId}
          publicKey={''}
          size="invisible"
          ref={captcha}
          onChange={submitForm}
          onExpired={resetRecaptcha}
        /> */}
      </Box>
      <Text className={styles.textDisplay} >
        <p className={styles.textCenter}>
          Need an account?{" "}
          <a className={styles.textLink} onClick={() => dispatch(showModal('signup'))}>
            Sign up
          </a>
          .
        </p>
      </Text>

    </div>
  );
};
