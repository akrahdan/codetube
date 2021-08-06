import { omit, pick } from 'lodash';

import { isProMembershipRedirect } from 'libs/redirectHelpers';
import { safeRedirectUrl } from 'libs/url';
import {
  learnPath,
  onboardingFromSignupPath,
  workerSupportApplicationPath,
} from 'libs/urlHelpers';

import {
  GetAfterLoginPathProps,
  SubmitValues,
  SuccessCallbackProp,
  UserSubmitKey,
} from './types';

export const getAfterLoginPath = ({
  workerSupportApplicant,
}: GetAfterLoginPathProps) => {
  if (workerSupportApplicant) {
    return workerSupportApplicationPath;
  }
  return onboardingFromSignupPath;
};

export const redirectAfterLogin = ({
  redirectTo,
  workerSupportApplicant,
}: SuccessCallbackProp) => {
  if (!isProMembershipRedirect(redirectTo)) {
    window.location.assign(
      safeRedirectUrl(
        getAfterLoginPath({
          workerSupportApplicant,
        })
      )
    );
    return;
  }

  window.location.assign(safeRedirectUrl(redirectTo || learnPath()));
};

const userKeys = Object.values(UserSubmitKey);

export const serializeRegistrationValues = (values: SubmitValues) => ({
  ...omit(values, userKeys),
  user: pick(values, userKeys),
});
