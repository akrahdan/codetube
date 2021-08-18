import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import {

  courseCatalog,

  freeProfile,
  login,
  instructor,
  instructorDashboard,
  logo,
  myHome,
  notifications,

  proLogo,
  proProfile,

  signUp,
  tryProForFree,
  unpausePro,
  upgradeToPro,
  liveClasses,
  projectCatalog,

} from './GlobalHeaderItems';
import { User } from './types';

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    projectCatalog,
    courseCatalog,
  ];

  const rightItems: AppHeaderItem[] = [];
  rightItems.push(instructor)
  renderLogin && rightItems.push(login);
  renderSignUp && rightItems.push(signUp);
  

  return {
    left: leftItems,
    right: rightItems,
  };
};

const anonMobileHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  rightItems.push(instructor)
  renderLogin && rightItems.push(login);
  renderSignUp && rightItems.push(signUp);

  const mainMenuItems: AppHeaderItem[] = [
    projectCatalog,
    courseCatalog,
    signUp,
    login,
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const anonDefaultHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true);
};

export const anonDefaultMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, true);
};

export const anonLandingHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false);
};

export const anonLandingMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false);
};

export const anonLoginHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true);
};

export const anonLoginMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true);
};

export const anonSignupHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false);
};

export const anonSignupMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false);
};

export const freeHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    myHome,
    projectCatalog,
    courseCatalog,
   
  ];

  const rightItems: AppHeaderItem[] = [];
  rightItems.push(instructor)
  renderNotifications && rightItems.push(notifications(renderNotifications));
  rightItems.push(freeProfile(user));
  rightItems.push(
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl)
  );

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const freeMobileHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  rightItems.push(instructor)
  renderNotifications && rightItems.push(notifications(renderNotifications));

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    projectCatalog,
    courseCatalog,
   
    freeProfile(user, true),
  ];

  mainMenuItems.push(
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl)
  );

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const proHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    proLogo,
    myHome,
    projectCatalog,
    courseCatalog,
   
  ];

  const rightItems: AppHeaderItem[] = [];
  if (user.isInstructor) {
    rightItems.push(instructorDashboard)
  } else {
    rightItems.push(instructor)
  }
 
  renderNotifications && rightItems.push(notifications(renderNotifications));
  rightItems.push(proProfile(user));
  user.isPaused && rightItems.push(unpausePro);

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const proMobileHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [proLogo];

  const rightItems: AppHeaderItem[] = [];
  if (user.isInstructor) {
    rightItems.push(instructorDashboard)
  } else {
    rightItems.push(instructor)
  }
  renderNotifications && rightItems.push(notifications(renderNotifications));

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    projectCatalog,
    courseCatalog,
  
    proProfile(user, true),
  ];

  user.isPaused && mainMenuItems.push(unpausePro);

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const loadingHeaderItems: FormattedAppHeaderItems = {
  left: [logo],
  right: [],
};

export const loadingMobileHeaderItems: FormattedMobileAppHeaderItems = {
  left: [logo],
  right: [],
  mainMenu: [],
};
