import { Box, GridForm, Text } from '@codecademy/gamut';
import { delay } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { useMountedState } from 'react-use';
import request from 'superagent';
import { v4 as uuid } from 'uuid';

import { OauthButtonGroup } from 'components/Forms/OauthButtonGroup';
import { RecaptchaWrapper } from 'components/Forms/RecaptchaWrapper';
import { cfdata } from 'libs/cfdata';
// import { pushDataLayerEvent, trackUserClick } from '~/libs/eventTracking';
// import { logger } from '~/libs/logging/logger';
// import { csrf } from '~/libs/superagent-auth';
// import { safeRedirectUrl } from 'libs/url';
import { registerPath } from 'libs/urlHelpers';

import SSOEmailField from '../SSOFormFields/SSOEmailField';
import SSOPasswordField from '../SSOFormFields/SSOPasswordField';
import { useSSoHook } from '../util/useSSOHook';
import { redirectAfterLogin, serializeRegistrationValues } from './helpers';
import styles from './styles/index.module.scss';
import { RegistrationFormProps, SerializedValues, SubmitValues } from './types';
import { extractValidationErrors, VALIDATORS } from './validators';

const registrationEmailField = 'email';
const registrationPasswordField = 'password';

const RecaptchaTermsOfService = () => (
  <Text color="gray-900" as="small">
    By signing up for Codecademy, you agree to Codecademy&apos;s
    <a href="/terms"> Terms of Service</a> &{' '}
    <a href="/policy">Privacy Policy</a>.
  </Text>
);
export const RegistrationSSOForm: React.FC<RegistrationFormProps> = ({
  onSuccess = redirectAfterLogin,
  ...props
}) => {
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

  const submitForm = (recaptchaToken: string) => {
    // setDisabled(true);
    // request
    //   .post(registerPath)
    //   .send({ ...serializedForm, 'g-recaptcha-response': recaptchaToken })
    //   .use(csrf)
    //   .accept('json')
    //   .then(({ body }) => {
    //     pushDataLayerEvent('user_sign_up');
    //     onSuccess(body);
    //   })
    //   .catch((err) => {
    //     setRecaptchaError(
    //       extractValidationErrors(err.response)?.['g-recaptcha-response']
    //     );
    //     setDisabled(false);
    //     resetRecaptcha();
    //   });
  };

  const resetRecaptcha = () => {
    // Reset recaptcha by re-rendering the component
    // using `recaptchaInstanceId` as a key
    // This is more predictable than calling captcha.reset()
    setDisabled(false);
    setRecaptchaInstanceId(uuid());
  };

  const onSubmitInitialize = (values: SubmitValues) => {
    // trackUserClick({ target: 'create_account' });

    setDisabled(true);
    const serializedValues = serializeRegistrationValues(values);
    setSerializedForm(serializedValues);

    if (captcha.current === null) {
      // logger.error({ message: 'captcha on checkoutpage has a null ref' });
      return;
    }
    captcha.current.execute();
    // validate the full form to see if we can submit
    setDisabled(false);
  };

  /**
   * @description
   * This unlocks submit a half second after the first input to prevent against bots - subsequent calls have no effect
   * */
  const onUpdate = () => {
    delay(() => {
      isMounted() && submitLocked && setSubmitLocked(false);
    }, 500);
  };

  const { currentPage, locationType, redirectUrl } = props;
  const signingUpFromExercise = locationType === 'location/EXERCISE';
  // const safeRedirect = redirectUrl && safeRedirectUrl(redirectUrl);
  const {
    showPasswordField,
    setShowPasswordField,
    emailFieldValue,
    setEmailFieldValue,
    handleSetShowPasswordField,
    isSubmitting,
    setIsSubmitting,
  } = useSSoHook();

  const { emailValidation, passwordValidation } = useMemo(
    () => ({
      emailValidation: VALIDATORS.email(setIsSubmitting),
      passwordValidation: VALIDATORS.password(setIsSubmitting),
    }),
    [setIsSubmitting]
  );

  return (
    <div className={styles.registrationContainer}>
      <GridForm
        rowGap={8}
        fields={[
          // {
          //   name: registrationEmailField,
          //   // type: 'custom-group',
          //   // render: SSOEmailField({
          //   //   emailLabel: 'Email',
          //   //   name: registrationEmailField,
          //   //   emailFieldValue,
          //   //   setEmailFieldValue,
          //   //   setShowPasswordField,
          //   //   showPasswordField,
          //   //   onUpdate,
          //   // }),
          //   size: 12,
          //   validation: emailValidation,
          // },
          {
            name: registrationPasswordField,
            type: 'custom-group',
            render: SSOPasswordField({
              name: registrationPasswordField,
              showPasswordField,
              isRegistration: true,
            }),
            size: 12,
            defaultValue: '',
            validation: passwordValidation,
          },
          {
            name: 'referring_page',
            type: 'hidden',
            defaultValue: currentPage,
          },
          // {
          //   name: 'redirect',
          //   type: 'hidden',
          //   defaultValue: safeRedirect,
          // },
          {
            name: 'authenticity_token',
            type: 'hidden',
            defaultValue: cfdata.get('authenticity_token'),
          },
          {
            name: 'coding_reminders_comms_timezone',
            type: 'hidden',
            defaultValue: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          {
            name: 'signing_up_from_exercise',
            type: 'hidden',
            defaultValue: `${signingUpFromExercise}`,
          },
        ]}
        onSubmit={async (values: SubmitValues) =>
          showPasswordField
            ? onSubmitInitialize(values)
            : handleSetShowPasswordField()
        }
        submit={{
          contents: showPasswordField ? 'Sign Up' : 'Continue',
          size: 6,
          type: 'cta',
          disabled:
            !emailFieldValue || isDisabled || submitLocked || isSubmitting,
        }}
        validation="onChange"
      />
      <Box pt={16}>
        {recaptchaError && (
          <div className={styles.recaptchaError} data-testid="recaptcha-error">
            {recaptchaError}
          </div>
        )}
        <RecaptchaWrapper
          key={recaptchaInstanceId}
          publicKey={cfdata.get('recaptcha_key_v2')}
          size="invisible"
          ref={captcha}
          onChange={submitForm}
          onExpired={resetRecaptcha}
        />
      </Box>
      <RecaptchaTermsOfService />
      {/* <OauthButtonGroup signUp urlParams={{ redirect: safeRedirect }} /> */}
    </div>
  );
};
