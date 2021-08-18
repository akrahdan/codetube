import { Box } from '@codecademy/gamut';
import type {

  AppHeaderClickHandler,
  GlobalHeaderProps,
} from 'components/gamut-overrides';
import { AnimatePresence, motion, MotionProps, Variants } from 'framer-motion';
import React, { useState } from 'react';

import { Search } from './Search';
import { MobileSearchBar } from './Search/MobileSearchBar';
import { SearchButton } from './Search/SearchButton';
import cookie from 'react-cookies';
import { store } from 'store';

import { Logout, useLogoutMutation } from 'services/auth';
import { LogoutResponse } from 'services/auth';
import { showModal } from 'state/modals/modalSlice';
import { useAuth, useAvatar } from 'store/useAuth';
import { useInstructor } from 'store/useInstructor';
import { useHistory } from 'react-router';

const AnimatedPopoverVariants: Variants = {
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const animatedPopoverProps: MotionProps = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: AnimatedPopoverVariants,
};

export const useAppHeaderProps = () => {




  const [isSearchVisible, setSearchVisible] = useState(false);
  // const { data: currentUser } = useGetCurrentUserQuery()
  const { user: currentUser } = useAuth()
  const { avatar } = useAvatar()
  const { instructor } = useInstructor()
  console.log("Current: ", instructor)
  const { push } = useHistory();
  const [logout, { data: logoutResponse }] = useLogoutMutation()

  if (logoutResponse && logoutResponse.detail) {
    localStorage.clear()
  }

  const [isMobileNotificationsOpen, setIsMobileNotificationsOpen] = useState(
    false
  );

  const toggleSearch = () => {

    setSearchVisible(!isSearchVisible);
  };

  const toggleMobileNotifications = () => {

    setIsMobileNotificationsOpen(!isMobileNotificationsOpen);
  };

  const handleClick: AppHeaderClickHandler = async (event, item) => {

    if (item.id === "instructor") {
      if (currentUser && currentUser.email) {
        window.location.replace('/course/create/')
      } else {
        store.dispatch(showModal('login'))
      }

    }

    if (item.id == "login" || item.id == "signup") {
      store.dispatch(showModal(item.id))
    }
    if (item.id == "log-out") {
      logout().
        then((res: { data: LogoutResponse }) => {
          if (res.data.detail) {
            localStorage.clear()
          }
        })

    }

  };



  const headerProps: GlobalHeaderProps = currentUser ? {
    type: 'pro',
    action: handleClick,
    user: {
      avatar: avatar,
      displayName: currentUser.first_name ? `${currentUser.first_name} ${currentUser.last_name}` : currentUser.email,
      isInstructor: instructor && !!instructor.id

    },
    search: {
      onEnable: () => console.log(),
      onSearch: (query: string) => <SearchButton toggleSearch={toggleSearch} />,
      onTrackingClick: (target: string) => console.log()

    },
    
    className: 'header--header--3sK1h'

  } : {
    type: 'anon',


    action: handleClick,
    search: {
      onEnable: () => console.log(),
      onSearch: (query: string) => <SearchButton toggleSearch={toggleSearch} />,
      onTrackingClick: (target: string) => console.log()

    },
    className: 'header--header--3sK1h'
  };



  const search = (
    <Box position="relative" zIndex={15}>
      {isSearchVisible && (
        <AnimatePresence>
          <motion.div key="search" {...animatedPopoverProps}>

          </motion.div>
          )
        </AnimatePresence>
      )}
      {isMobileNotificationsOpen && (
        <Box display={{ _: 'block', md: 'none' }} >
          <AnimatePresence>
            <motion.div
              key="mobile notifications"
              {...animatedPopoverProps}
              data-testid="header-mobile-notifications-dropdown"
            >

            </motion.div>
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );

  return [headerProps, search] as const;
};
