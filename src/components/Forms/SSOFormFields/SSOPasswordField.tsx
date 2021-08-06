import {
  Box,
  FormGroup,
  GridFormCustomFieldProps,
  Input,
} from '@codecademy/gamut';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { passwordTips } from 'libs/passwordTips';
// import registrationStrings from '~/localized/registration.json';

import ssoStyles from '../styles/ssoStyles.module.scss';
import { SSOPasswordFieldProps } from './types';

export const SSOPasswordField = ({
  showPasswordField,
  name,
  isRegistration,
}: SSOPasswordFieldProps) => ({
  setValue,
  register,
  field,
  error,
}: GridFormCustomFieldProps) => {
  let errorMessage = error;
  if (error === "can't be blank") {
    // errorMessage = registrationStrings.createAPassword;
  }
  if (error === 'is not long enough') {
    // errorMessage = registrationStrings.passwordTooShort;
  }
  return (
    <Box>
      <AnimatePresence>
        {showPasswordField && (
          <motion.div
            initial={{ overflow: 'hidden', opacity: 0, height: 0 }}
            animate={{ overflow: 'visible', opacity: 1, height: 'auto' }}
            exit={{ overflow: 'hidden', opacity: 0, height: 0 }}
          >
            <FormGroup
              mb={0}
              htmlFor={name}
              label={"Password"}
              disabled={!showPasswordField}
              ml={4}
              error={showPasswordField && errorMessage}
              tooltip={
                isRegistration
                  ? {
                      children: passwordTips,
                      id: 'password-tips',
                      alignment: 'bottom-left',
                      className: ssoStyles.passwordTipsPopOver,
                    }
                  : undefined
              }
            >
              <Input
                {...register(name)}
                disabled={!showPasswordField}
                type="password"
                autoComplete="on"
                error={Boolean(error)}
                htmlFor={name}
                ref={register(showPasswordField && field.validation)}
                name={name}
                onChange={(event) =>
                  setValue(showPasswordField && event.target.value)
                }
              />
            </FormGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SSOPasswordField;
