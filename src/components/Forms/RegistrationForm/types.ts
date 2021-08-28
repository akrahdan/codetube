export type SuccessCallbackProp = {
  redirectTo: string;
  workerSupportApplicant: boolean;
  authenticationToken: string;
};

export type GetAfterLoginPathProps = {
  workerSupportApplicant: boolean;
};

export type RegistrationFormProps = {
  captureMarketingEmail?: boolean;
  currentPage?: string;
  defaultValues?: {
    email?: string;
    password?: string;
  };
  hideRecaptchaInfo?: boolean;
  isStudent?: boolean;
  locationType?: string;
  onFailure?: (errors: string[]) => void;
  onSuccess?: (body: SuccessCallbackProp) => void;
  redirectUrl?: string;
};

export enum UserSubmitKey {
  CODING_REMINDERS_COMMS_TIMEZONE = 'coding_reminders_comms_timezone',
  EMAIL = 'email',
  LOGIN = 'login',
  USERNAME = 'username',
  PASSWORD = 'password',
  PASSWORD1 = 'password1', // pragma: allowlist secret
}

export type UserSubmitValues = Record<UserSubmitKey, string>;

export enum ErrorMessages {
  WEAK = 'Password too weak',
  REQUIRED = "can't be blank",
  LENGTH = 'Password does not meet length requirements',
  VALID_EMAIL = 'Please use a valid email address',
}

export type BaseSubmitValues = {
  authenticity_token: string;
  redirect: string;
  referring_page: string;
  signing_up_from_exercise: string;
  sweet_container: boolean;
};

export type SubmitValues = UserSubmitValues & BaseSubmitValues;

export type SerializedValues = BaseSubmitValues & {
  user: UserSubmitValues;
};
