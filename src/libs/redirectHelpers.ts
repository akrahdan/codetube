const existingCareerPaths = new Set([
  'web-development',
  'data-science',
  'code-foundations',
  'computer-science',
]);

export const isValidPortalRedirect = (redirectUrl?: string) =>
  !!redirectUrl &&
  (redirectUrl.includes('courses') ||
    redirectUrl.includes('paths') ||
    redirectUrl.includes('learn') ||
    redirectUrl.includes('catalog'));

export const isProMembershipRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return (
    (redirectValues[0] === 'pro' || redirectValues[1] === 'pro') &&
    (redirectValues[1].split('?')[0] === 'membership' ||
      redirectValues[2].split('?')[0] === 'membership')
  );
};

export const isCareerPathPageRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return (
    isValidPortalRedirect(redirectUrl) &&
    redirectValues[1] === 'learn' &&
    redirectValues[2] === 'paths' &&
    existingCareerPaths.has(redirectValues[3])
  );
};

export const isSkillPathPageRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return (
    isValidPortalRedirect(redirectUrl) &&
    redirectValues[1] === 'learn' &&
    redirectValues[2] === 'paths' &&
    !existingCareerPaths.has(redirectValues[3])
  );
};

export const isHomePageRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('?')[0].split('/');
  return (
    redirectUrl === '' ||
    redirectUrl[1] === '' ||
    redirectValues[1] === 'register' ||
    redirectValues[1] === 'login'
  );
};

export const isCoursePageRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return (
    isValidPortalRedirect(redirectUrl) &&
    redirectValues[1] === 'learn' &&
    !isCareerPathPageRedirect(redirectUrl) &&
    !isSkillPathPageRedirect(redirectUrl)
  );
};

export const isLeRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return isValidPortalRedirect(redirectUrl) && redirectValues[1] === 'courses';
};

export const isAltEntryPointRedirect = (redirectUrl: string) => {
  return (
    isCareerPathPageRedirect(redirectUrl) ||
    isCoursePageRedirect(redirectUrl) ||
    isLeRedirect(redirectUrl)
  );
};

export const isCatalogPageRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return isValidPortalRedirect(redirectUrl) && redirectValues[1] === 'catalog';
};

const isJobsPageRedict = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return redirectValues[1] === 'about' && redirectValues[2] === 'careers';
};

const isTermsOfServiceRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return redirectValues[1] === 'terms';
};

const isPrivacyPolicyRedirect = (redirectUrl: string) => {
  const redirectValues = redirectUrl.split('/');
  return redirectValues[1] === 'policy';
};

export const isValidRecommendationLocation = (redirectUrl: string) =>
  !!redirectUrl &&
  (isCareerPathPageRedirect(redirectUrl) ||
    isCoursePageRedirect(redirectUrl) ||
    isLeRedirect(redirectUrl));

export const getRedirectSlug = (redirectUrl: string) => {
  const redirectValues: any = !!redirectUrl && redirectUrl.split('/');
  const slug = isLeRedirect(redirectUrl)
    ? redirectUrl.split('/')[2]
    : redirectValues[redirectValues.length - 1];
  return isValidRecommendationLocation(redirectUrl) && slug;
};

export const getEntryPoint = (redirectUrl: string) => {
  if (isHomePageRedirect(redirectUrl)) {
    return 'home_page';
  }
  if (isCareerPathPageRedirect(redirectUrl)) {
    return 'careerpath_page';
  }
  if (isSkillPathPageRedirect(redirectUrl)) {
    return 'skillpath_page';
  }
  if (isCoursePageRedirect(redirectUrl)) {
    return 'course_page';
  }
  if (isLeRedirect(redirectUrl)) {
    return 'learning_environment';
  }
  if (isCatalogPageRedirect(redirectUrl)) {
    return 'catalog';
  }
  if (isJobsPageRedict(redirectUrl)) {
    return 'jobs_page';
  }
  if (isPrivacyPolicyRedirect(redirectUrl)) {
    return 'privacy_policy_page';
  }
  if (isTermsOfServiceRedirect(redirectUrl)) {
    return 'terms_of_service_page';
  }
  if (isProMembershipRedirect(redirectUrl)) {
    return 'pro_membership_page';
  }
  return undefined;
};
