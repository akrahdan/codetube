import {
  Box,
  FormGroup,
  GridFormCustomFieldProps,
  Input,
  Text,
  TextButton,
} from '@codecademy/gamut';
import React from 'react';

import { loginPath } from 'libs/urlHelpers';
// import registrationStrings from '~/localized/registration.json';

import ssoStyles from '../styles/ssoStyles.module.scss';
import { SSOEmailFieldProps } from './types';

export const SSOEmailField = ({
  showPasswordField,
  setShowPasswordField,
  emailFieldValue,
  setEmailFieldValue,
  onUpdate,
  emailLabel,
  name,
}: SSOEmailFieldProps) => ({
  setValue,
  register,
  error,
  field,
}: GridFormCustomFieldProps) => {
  const emailField = register(field.validation);
  let errorMessage: string | React.ReactNode = error;
  if (error === 'is invalid') {
    // errorMessage = registrationStrings.invalidEmail;
  }
  if (error === 'is already taken') {
    errorMessage = (
      <Text>
        {/* {registrationStrings.alreadyTaken} */}
        <a
          className={ssoStyles.loginLink}
          href={`${loginPath}${window.location.search}`}
        >
          {/* {registrationStrings.alreadyTakenLink} */}
        </a>
      </Text>
    );
  }
  return (
    <Box>
      <FormGroup
        ml={4}
        mb={0}
        htmlFor={name}
        label={emailLabel}
        error={errorMessage as string}
      >
        {showPasswordField ? (
          <Box display="flex" alignItems="center" height="2.5rem">
            <input
              name={name}
              ref={emailField}
              value={emailFieldValue}
              type="hidden"
            />
            <Text className={ssoStyles.emailField} textColor="gray-800">
              {emailFieldValue}
            </Text>
            <TextButton
              ml={8}
              padded={false}
              onClick={() => console.log()}
            >
              Edit
            </TextButton>
          </Box>
        ) : (
          <Input
            defaultValue={emailFieldValue}
            name={name}
            htmlFor={name}
            error={Boolean(error)}
            ref={emailField}
            data-testid="email-field"
            onChange={(e) => {
              const value = e?.target.value;
              setValue(value);
              // setEmailFieldValue(value);
              // onUpdate?.();
            }}
          />
        )}
      </FormGroup>
    </Box>
  );
};

export default SSOEmailField;
