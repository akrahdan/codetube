import pluralize from 'pluralize';

import { userAttributes } from 'libs/userAttributes';
import { ContentItem, ContentItemType } from 'typings/entities';
import { BusinessTransactionType, Currency } from 'typings/payment';

import {
  isCareerPathPageRedirect,
  isProMembershipRedirect,
  isSkillPathPageRedirect,
} from './redirectHelpers';

const withLECourseRedirect = (path: string, redirectSlug?: string) => {
  if (!redirectSlug) return path;
  return `${path}?course_redirect=${redirectSlug}`;
};

export const homePath = '/';

export const loginPath = '/login';

export const logoutPath = '/logout';

export const onboardingPath = '/welcome/find-a-course';
export const onboardingFromSignupPath = `${onboardingPath}?fromSignUpPage=true`;

export const logoutPathWithRedirectParams = (redirectPath: string) =>
  `${logoutPath}?redirect=${encodeURIComponent(redirectPath)}`;

export const registerPath = '/register';

export const eventPath = (slug: string) => `/events/${slug}`;
export const eventFromSignupPath = (slug: string) =>
  `${eventPath(slug)}?fromSignUpPage=true`;

export const workerSupportApplicationPath = '/worker-support/apply';
export const workerSupportThankYouPath = '/worker-support/thank-you';

export const profilesPath = (profileIdOrUsername: string) =>
  `/profiles/${profileIdOrUsername}`;

export const profileEditPath = (profileIdOrUsername: string) =>
  `${profilesPath(profileIdOrUsername)}/edit`;

export const certificatesPath = (username: string, containerId: string) =>
  `${profilesPath(username)}/certificates/${containerId}`;

export const achievementsPath = (username: string) =>
  `/users/${username}/achievements`;

export const prodBasePath = 'https://codecademy.com';

const getContentItemTypeRoutePart = (type?: ContentItemType) => {
  return type ? pluralize(`${type}`, 2) : '';
};

export const contentItemResumePath = (
  courseSlug: string,
  contentItem?: ContentItem,
  redirectSlug?: string | undefined,
  anon = false
) => {
  if (!contentItem) return `/courses/${courseSlug}`;

  const resumePath = anon ? '' : '/resume';

  if (contentItem.type === 'lesson') {
    return withLECourseRedirect(
      `/courses/${courseSlug}/lessons/${contentItem.slug}${resumePath}`,
      redirectSlug
    );
  }

  return withLECourseRedirect(
    `/courses/${courseSlug}/${getContentItemTypeRoutePart(contentItem.type)}/${
      contentItem.slug
    }`,
    redirectSlug
  );
};

export const exerciseResumePath = (
  courseSlug: string,
  lessonSlug: string,
  exerciseSlug: string,
  redirectSlug: string
) =>
  withLECourseRedirect(
    `/courses/${courseSlug}/lessons/${lessonSlug}/exercises/${exerciseSlug}`,
    redirectSlug
  );

export const pathResumePath = (pathSlug: string | undefined) => {
  if (!pathSlug) return '/learn/paths';

  return createPathResumePath({
    pathSlug,
  });
};

export const pathModulePath = (
  pathSlug: string,
  trackSlug: string,
  moduleSlug: string
) => {
  return createPathResumePath({
    pathSlug,
    trackSlug,
    moduleSlug,
  });
};

export const pathContentItemPath = (
  pathSlug: string,
  trackSlug: string,
  moduleSlug: string,
  contentItemType: ContentItemType,
  contentItemSlug: string
) => {
  return createPathResumePath({
    pathSlug,
    trackSlug,
    moduleSlug,
    contentItemType,
    contentItemSlug,
  });
};

export type PathResumePathParams = {
  pathSlug: string;
  trackSlug?: string;
  moduleSlug?: string;
  contentItemType?: ContentItemType;
  contentItemSlug?: string;
};

export const createPathResumePath = ({
  pathSlug,
  trackSlug,
  moduleSlug,
  contentItemType,
  contentItemSlug,
}: PathResumePathParams) => {
  const contentItemTypeRoute = getContentItemTypeRoutePart(contentItemType);
  if (
    trackSlug &&
    moduleSlug &&
    contentItemType &&
    contentItemTypeRoute &&
    contentItemSlug
  )
    return `/paths/${pathSlug}/tracks/${trackSlug}/modules/${moduleSlug}/${contentItemTypeRoute}/${contentItemSlug}`;

  if (trackSlug && moduleSlug)
    return `/paths/${pathSlug}/tracks/${trackSlug}/modules/${moduleSlug}`;

  if (trackSlug) return `/paths/${pathSlug}/tracks/${trackSlug}`;

  return `/paths/${pathSlug}`;
};

export const learnCoursePath = (courseSlug: string) => `/learn/${courseSlug}`;
export const learnPathsPath = (pathSlug: string) => `/learn/paths/${pathSlug}`;

export const learnModulePath = (courseSlug: string, moduleSlug: string) =>
  `/learn/${courseSlug}/modules/${moduleSlug}`;

export const cheatsheetPath = ({
  courseSlug,
  moduleSlug,
  pathSlug,
}: {
  courseSlug: string;
  moduleSlug: string;
  pathSlug?: string;
}) => {
  return pathSlug
    ? `/learn/paths/${pathSlug}/tracks/${courseSlug}/modules/${moduleSlug}/cheatsheet`
    : `/learn/${courseSlug}/modules/${moduleSlug}/cheatsheet`;
};

export const smartPracticePath = (
  slug: string,
  contentType: 'path' | 'track'
) => `/smart-practice/${contentType}s/${slug}`;

export const reviewCardPath = (id: string) =>
  `https://author.codecademy.com/review-cards/${id}`;

export const learnPath = () => '/learn';

export const cohortPath = (pathSlug: string) => `/cohorts/${pathSlug}`;

export const coursePracticePath = (trackSlug: string, moduleSlug: string) =>
  `/practice/tracks/${trackSlug}/modules/${moduleSlug}`;

export const pathPracticePath = (
  pathSlug: string,
  trackSlug: string,
  moduleSlug?: string
) => {
  const rootPath = `/practice/paths/${pathSlug}/tracks/${trackSlug}`;
  return moduleSlug ? `${rootPath}/modules/${moduleSlug}` : rootPath;
};

export const challengeProjectPath = (slug: string | undefined) =>
  `/practice/projects/${slug}`;

export const catalogPath = '/catalog';
export const catalogCategoryPath = (section: string, category: string) =>
  `/catalog/${section}/${category}`;

const getTrialModalParams = (
  redirectUrl: string,
  isTrialPlan?: boolean,
  isSignUpPage = false
) => {
  const isAlternativeEntryFromCheckoutFlow =
    (isProMembershipRedirect(redirectUrl) ||
      isCareerPathPageRedirect(redirectUrl) ||
      isSkillPathPageRedirect(redirectUrl)) &&
    !isTrialPlan &&
    !isSignUpPage;

  if (isAlternativeEntryFromCheckoutFlow || isTrialPlan) return '';

  return 'modal=pro-trial-welcome';
};

type PostCheckoutLandingPathParams = {
  fromSignUpPage?: boolean;
  isInOnboardingAllEntryFeature?: boolean;
  isPathRedirect: boolean;
  isTrialPlan?: boolean;
  redirectUrl: string;
};

export const postCheckoutLandingPath = ({
  fromSignUpPage,
  isInOnboardingAllEntryFeature,
  isPathRedirect,
  isTrialPlan,
  redirectUrl,
}: PostCheckoutLandingPathParams): string => {
  if (
    (isInOnboardingAllEntryFeature &&
      !isTrialPlan &&
      (isProMembershipRedirect(redirectUrl) || isPathRedirect)) ||
    fromSignUpPage
  ) {
    // if from the trial registration flow, send to 'Find something to learn' onboarding
    return getOnboardingPath(redirectUrl, isTrialPlan);
  }
  if (isTrialPlan && redirectUrl && isPathRedirect) {
    // if user was directed to checkout from a path landing page, send them back there
    return redirectUrl;
  }
  // default post-checkout landing is dashboard
  return learnPath();
};

export const getOnboardingPath = (
  redirectUrl?: string,
  isTrialPlan?: boolean,
  isSignUpPage = false
) => {
  if (!redirectUrl) return onboardingPath;

  const containsWelcomeUrl = redirectUrl.includes(onboardingPath);
  const trialModalParams = getTrialModalParams(
    redirectUrl,
    isTrialPlan,
    isSignUpPage
  );

  if (containsWelcomeUrl) {
    return trialModalParams
      ? `${onboardingPath}?${trialModalParams}`
      : onboardingPath;
  }

  const redirectUrlArr = redirectUrl.split('?');
  const queryParams =
    redirectUrlArr.length >= 2 ? redirectUrlArr[1].split('&') : [];
  const additionalParams = queryParams
    .filter((elem) => elem !== 'modal=pro-trial-welcome')
    .join('&');
  const fullRedirectUrl = additionalParams
    ? `${redirectUrlArr[0]}?${additionalParams}`
    : redirectUrlArr[0];
  const encodedRedirectUrl = encodeURIComponent(fullRedirectUrl);

  return `${onboardingPath}?${trialModalParams}&redirect_url=${encodedRedirectUrl}`;
};

export const searchPath = (query?: string, page?: number) => {
  if (!query) {
    return '/search';
  }

  const encodedQuery = encodeURIComponent(query);
  return `/search?query=${encodedQuery}${page ? `&page=${page}` : ''}`;
};

export const programResumePath = (program: string) => `/programs/${program}`;

export const programContentPath = (program: string, content: string) =>
  `/programs/${program}/items/${content}`;

export const resetProgressPath = (
  type: 'courses' | 'modules' | 'paths',
  id: string
) => `/reset-progress/${type}/${id}`;

export const pathsBasePath = '/learn/paths';
export const pathSelectorPath = `${pathsBasePath}/new`;
export const skillPathSelectorPath = '/learn/skill-paths/new';
export const choosePathPagePath = (goal: string) =>
  goal === 'skill' ? skillPathSelectorPath : pathSelectorPath;

export const pathPagePath = (pathSlug: string) =>
  `${pathsBasePath}/${pathSlug}`;

export type ProPaymentCompletePathRequest = {
  couponCode?: string | null;
  fromSignUpPage?: boolean;
  planId: string;
  redirectUrl?: string;
  referralErrors?: boolean;
  currency: Currency;
};

export const proPaymentCompletePath = ({
  planId,
  couponCode,
  referralErrors,
  redirectUrl,
  fromSignUpPage,
  currency,
}: ProPaymentCompletePathRequest) => {
  let uri = `/subscriptions/${planId}/paid?couponCode=${couponCode}&redirect_url=${redirectUrl}&currency=${currency}`;
  if (fromSignUpPage) uri += '&fromSignUpPage=true';
  if (referralErrors) uri += '&referral_errors=true';
  return uri;
};

export const proCheckoutPath = ({
  planId ,
  redirectUrl,
  fromSignUpPage,
  discountCode,
  leftHandSide,
  skipOnboarding,
  periods,
  loggedInViaCheckout,
}: {
  planId?: string;
  redirectUrl?: string;
  discountCode?: string;
  fromSignUpPage?: boolean;
  leftHandSide?: string;
  skipOnboarding?: boolean;
  periods?: string;
  loggedInViaCheckout?: boolean;
}) => {
  let url = `/subscriptions/${planId}/checkout?redirect_url=${redirectUrl}`;
  if (fromSignUpPage) url += `&fromSignUpPage=true`;
  if (discountCode) url += `&discountCode=${encodeURIComponent(discountCode)}`;
  if (leftHandSide) url += `&lhs=${leftHandSide}`;
  if (skipOnboarding) url += `&skipOnboarding=true`;
  if (periods) url += `&periods=${periods}`;
  if (loggedInViaCheckout) url += `&logged_in_via_checkout=true`;

  return url;
};



export const upsellBackPath = ({
  isTrialPlan,
  redirectUrl,
  skipOnboarding,
}: {
  isTrialPlan: boolean;
  redirectUrl: string;
  skipOnboarding: boolean;
}) =>
  skipOnboarding
    ? redirectUrl
    : getOnboardingPath(redirectUrl, isTrialPlan, true);

export const accountPath = () => '/account';

export const billingPath = () => '/account/billing';

export const goalSettingsPath = () => '/account/goals_settings';

export const passwordBreachPath = '/account/password?pib=true';

export const emailConfirmationPath = (status?: string) =>
  status ? `/confirm?${status}=true` : '/confirm';

export const emailConfirmationPathWithToken = (token: string) =>
  `/confirm?confirmation_token=${token}`;

export const linkAccountPath = (provider: string) => `/users/auth/${provider}`;

// oauth urls
export const githubAuthenticationUrl = () =>
  '/users/auth/github?scope=public_repo,user:email';

export const googleAuthenticationUrl = () =>
  '/users/auth/google_oauth2?signin=true';

export const facebookAuthenticationUrl = () =>
  '/users/auth/facebook?signin=true';

export const twitterAuthenticationUrl = () => '/users/auth/twitter?signin=true';

export const linkedinAuthenticationUrl = () =>
  '/users/auth/linkedin?signin=true';
// other authentication urls

export const forgotPasswordUrl = () => '/secret/new';

export const resetPasswordUrl = (token: string) =>
  `/secret/edit?reset_password_token=${token}`;

export const proLandingPath = '/pro/membership';

export const studentLandingPath = '/student-center';

export const mobileLandingPagePath = '/mobile-app-download';

// Explore

export const exploreSortingQuizPath = '/explore/sorting-quiz';

// Footer

export const proPauseHelpPageUrl =
  'https://help.codecademy.com/hc/en-us/sections/360002034793-Pause';

export const codecademyGoAppleUrl =
  'https://itunes.apple.com/us/app/codecademy-go/id1376029326?mt=8';

export const codecademyGoGoogleUrl =
  'https://play.google.com/store/apps/details?id=com.ryzac.codecademygo';

export const forumsUrl = 'https://discuss.codecademy.com/';

export const forumAnswerUrl = (questionId: string, answerId: string) =>
  `/forum_questions/${questionId}#${answerId}`;

export const chaptersUrl = 'https://community.codecademy.com/chapters';

// other urls

export const currentUserUrl = '/current-user';

export const timedChallengeEnrollmentUrl = '/timed-challenge-enrollment';
export const timedChallengeEnrollmentEnrollUrl =
  '/timed-challenge-enrollment/enroll';

export const businessContactPath = '/business/contact';

export const teamsQuotePath = 'https://pro.codecademy.com/teams-quote/';

export const articlesPath = '/articles';

export const articlePath = (slug: string) => `${articlesPath}/${slug}`;

export const shareArticlePath = (slug: string) =>
  `${prodBasePath + articlePath(slug)}`;

export const cheatsheetHomePath = '/resources/cheatsheets';

export const cheatsheetsIndexPath = '/resources/cheatsheets/all';

export const subscriptionPausePageUrl = (subscriptionId: string) =>
  `/subscriptions/${subscriptionId}/pause`;

export const helpPath = '/help';

export const subscriptionUpgradePageUrl = `/subscriptions/upgrade`;

export const challengeProjectList =
  'https://discuss.codecademy.com/t/list-of-challenge-projects/505231';

export const whatsNextProUrl = articlePath('whats-next-general');

export const workspacesPath = (username: string) =>
  `/users/${username}/workspaces`;
export const sandboxPath = (id: string) => `/sandboxes/${id}`;

// author urls
export const authorUrl = `https://author.codecademy.com`;
export const authorContentItemUrl = (contentItemId: string) =>
  `${authorUrl}/content-items/${contentItemId}`;
export const authorExerciseUrl = (exerciseId: string) =>
  `${authorUrl}/exercises/${exerciseId}`;
export const authorAssessmentUrl = (assessmentId: string) =>
  `${authorUrl}/assessments/${assessmentId}`;

type PaginationParams = {
  status?: string;
  page: number;
  sort?: string;
  sort_column?: string;
};

// adds pagination params to a fetch url
export const paginationUrl = (
  path: string,
  params: PaginationParams
): string => {
  const urlParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    const value = (params as any)[key]?.toString();
    !!value && urlParams.append(key, value);
  });
  return `${path}?${urlParams.toString()}`;
};
export const createTrialBusinessPlanUrl = `/business/trial`;
export const businessPlansUrl = '/business/plans';
export const fetchBusinessPlansUrl = '/business/plans/fetch_plans';
export const businessPlanUrl = (planId: string) => `/business/plans/${planId}`;
export const businessTrialSignUpUrl = (source: string) =>
  `/business/trial/sign_up?source=${source}`;
export const businessPlanSeatsUrl = (planId: string) =>
  `/business/plans/${planId}/seats`;
export const businessPlanInvitationsUrl = (planId: string) =>
  `/business/plans/${planId}/invitations`;
export const businessSeatsUrl = `/business/seats`;
export const businessSeatUrl = (seatId: string) =>
  `${businessSeatsUrl}/${seatId}`;
export const businessSeatUpdateUrl = (planId: string, seatId: string): string =>
  `${businessPlansUrl}/${planId}/seats/${seatId}`;
export const businessInvitationsUrl = `/business/invitations`;
export const businessBulkInvitationsUrl = `${businessInvitationsUrl}/bulk_create`;
export const businessInvitationUrl = (id: string) =>
  `${businessInvitationsUrl}/${id}`;
export const resendInvitationUrl = (id: string) =>
  `${businessInvitationUrl(id)}/resend`;

export const resendTrialInvitationUrl = `${createTrialBusinessPlanUrl}/resend_invitation`;

export const createRegisterUrlUrl = (id: string) =>
  `${businessInvitationUrl(id)}/register_url`;
export const businessResetPasswordUrl = `/business/reset_password`;
export const searchBusinessPlanUsersUrl = (planId: string, email: string) => {
  const url = `/business/plans/${planId}/search`;
  const urlParams = new URLSearchParams({ email });
  return `${url}?${urlParams.toString()}`;
};
export const createBusinessOrganizationUrl = `/business/organizations`;
export const createBusinessPlanUrl = `/business/plans`;

export const searchBusinessPlanUrl = `/business/plans/search_plans`;

export type BusinessPaymentCompletePathRequest = {
  planId?: string;
  transactionType: BusinessTransactionType;
  planEndDate: string;
  quantity: number;
};

export const businessPaymentCompletePath = ({
  planId,
  planEndDate,
  quantity,
  transactionType,
}: BusinessPaymentCompletePathRequest) => {
  const uri = `/business/plans/${planId}/checkout/confirmation`;
  const params = `?planEndDate=${planEndDate}&seatQuantity=${quantity}&transactionType=${transactionType}`;

  return uri + params;
};

export const businessCheckoutURL = (planId: string, purchaseAction: string) =>
  `/business/plans/${planId}/checkout/${purchaseAction}/purchase`;

export const businessBillingAdminUrl = (planId: string) =>
  `/business/plans/${planId}/billing_admin`;

export const enableBankDebitUrl = `/business/plans/bank_debit`;

export const appendQueryParamsToUrl = (
  url: string,
  queryParams: Record<string, string>
): string => {
  const queryParamEntries = Object.entries(queryParams);
  if (!queryParamEntries.length) return url;

  const hashIndex = url.indexOf('#');
  const hash = hashIndex !== -1 ? url.substr(hashIndex) : '';
  const urlMinusHash = hashIndex !== -1 ? url.substr(0, hashIndex) : url;
  const alreadyHasQueryParams = url.indexOf('?') !== -1;

  const newQueryParams = queryParamEntries
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return (
    urlMinusHash + (alreadyHasQueryParams ? '&' : '?') + newQueryParams + hash
  );
};

export const removeQueryParamsFromUrl = (
  url: string,
  queryParamKeysToRemove: string[]
) => {
  const queryParamStart = url.indexOf('?');
  if (queryParamStart === -1) return url;

  const hashIndex = url.indexOf('#');
  const hash = hashIndex !== -1 ? url.substr(hashIndex) : '';
  const urlMinusHash = hashIndex !== -1 ? url.substr(0, hashIndex) : url;

  const urlBeforeQueryParams = url.substr(0, queryParamStart);
  const queryParamsFromUrl = urlMinusHash.substr(queryParamStart + 1);

  const filteredQueryParams = queryParamsFromUrl
    .split('&')
    .map((keyValuePairAsString) => keyValuePairAsString.split('='))
    .filter(([key]) => !queryParamKeysToRemove.includes(key))
    .map(([key, value]) => (key && value ? `${key}=${value}` : key || value))
    .join('&');

  return (
    urlBeforeQueryParams +
    (filteredQueryParams.length > 0 ? `?${filteredQueryParams}` : '') +
    hash
  );
};
