import { debounce, isArray, isEmpty, mapValues } from 'lodash';
import request from 'superagent';

import { csrf } from 'libs/superagent-auth';

import { ErrorMessages, UserSubmitKey } from './types';

type ServerError = keyof typeof SERVER_ERRORS;
interface ValidationResponse extends request.Response {
  body: {
    errors?: Record<string, ServerError | ServerError[]> | undefined;
  };
}

type disabledHook = (value: boolean) => void;

const SERVER_ERRORS = {
  weak: ErrorMessages.WEAK,
  breach: ErrorMessages.WEAK, // Standard breach error message is confusing for new account creation
  required: ErrorMessages.REQUIRED,
  length: ErrorMessages.LENGTH,
  invalid: ErrorMessages.VALID_EMAIL,
};

export const extractValidationErrors = ({
  body: { errors },
}: ValidationResponse): Record<string, string> | null => {
  if (!errors || isEmpty(Object.values(errors))) return null;
  return mapValues(errors, (error) =>
    isArray(error) ? SERVER_ERRORS[error[0]] : SERVER_ERRORS[error] || error
  );
};

const createServerValidator = (
  key: UserSubmitKey,
  setIsSubmitting?: disabledHook
) => {
  let currentInput: string;
  const validator = debounce(
    (input: string, resolve: (error: string | undefined) => void) =>
      request
        .post('/register/validate')
        .send({ user: { [key]: input } })
        .use(csrf)
        .accept('json')
        .then(() => resolve(undefined))
        .catch((err) =>
          resolve(
            currentInput === input
              ? extractValidationErrors(err.response)?.[key]
              : undefined
          )
        ),
    250,
    { leading: true, trailing: true }
  );

  return async (input: string) => {
    currentInput = input;
    setIsSubmitting?.(true);
    const res = await new Promise<string | undefined>((resolve) => {
      validator(input, resolve);
    });
    setIsSubmitting?.(false);
    return res;
  };
};

export const VALIDATORS = {
  [UserSubmitKey.EMAIL]: (setIsSubmitting?: disabledHook) => ({
    required: ErrorMessages.REQUIRED,
    pattern: {
      value: /^[^@\s]+@[^@\s\.]+\.[^@\s]{2,}$/,
      message: ErrorMessages.VALID_EMAIL,
    },
    validate: createServerValidator(UserSubmitKey.EMAIL, setIsSubmitting),
  }),
  [UserSubmitKey.PASSWORD]: (setIsSubmitting?: disabledHook) => ({
    required: ErrorMessages.REQUIRED,
    minLength: {
      value: 6,
      message: ErrorMessages.LENGTH,
    },
    maxLength: {
      value: 128,
      message: ErrorMessages.LENGTH,
    },
    validate: createServerValidator(UserSubmitKey.PASSWORD, setIsSubmitting),
  }),
};
