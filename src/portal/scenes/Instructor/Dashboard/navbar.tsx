import { UserDropdown } from "./UserDropdown";
import { selectInstructor } from 'state/instructor/instructorSplice';
import type { Instructor, InstructorResponse } from 'services/courses';
import { useAppSelector } from 'store/hooks';
import { useAlert } from 'react-alert';
import { useInstructor } from "store/useInstructor";
import { useFetchInstructorInfoQuery, useEditInstructorInfoMutation } from 'services/courses';
import { useEffect, useState } from "react";

export const NavBar = () => {

  const { instructor } = useInstructor()
  const [profile, setProfile] = useState<InstructorResponse>(instructor)

  const initialAvatar = (profile: InstructorResponse) => {
    const firstName = profile.first_name;
    const lastName = profile.last_name;
    if(firstName && firstName !== "") {
      return firstName.substr(0,2)
    }
    if(lastName && lastName !== "") {
      return lastName.substr(0,2)
    }
    const user = profile.user;
    if (user.email && user.email !== "") {
      return user.email.substr(0,2)
    }
  }

  useEffect(() => {
     setProfile(instructor)
  }, [instructor])

  if (!profile ) return null;

  return (
    <div
      className="c_header c_header--v6 c_header--desktop c_header--ia c_header--ia-instructor ud-app-loader ud-app-loaded"

    >
      <div
        className="c_header__inner"
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="c_header__left">
          <div className="ud-component--header-v6--mobile-nav-trigger">
            <button
              aria-label="Menu"
              data-purpose="side-menu-opener"
              type="button"
              className="c_header__mobile-bt btn btn-link"
            >
              <span className="cfi cfi-menu" />
            </button>
          </div>
        </div>
        <div className="c_header__mobile-spacer">&nbsp;</div>
        <div className="c_header__right">
          <div className="ud-component--header-v6--instructor-dropdown-button visible-lg-block visible-xl-block">
            <div className="dropdown--open-on-hover dropdown--instructor zero-state dropdown--open-on-hover dropdown">
              <a
                data-purpose="instructor-dropdown"
                href="/"
                rel=" noopener noreferrer"
                target="_self"
                id="header.instructor"
                role="button"
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Student
              </a>
              <ul
                role="menu"
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="header.instructor"
              >
                <li role="presentation">
                  <div className="zero-state__detail">
                    <div data-purpose="safely-set-inner-html:instructor-dropdown-button:detail-safe-html">
                      Switch to the student view here - get back to the courses
                      you’re taking.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="c_activity-notification ud-component--header-v6--notification-dropdown-button visible-lg-block visible-xl-block visible-sm-block visible-md-block">
            <div className="dropdown--open-on-hover dropdown--icon dropdown--notification dropdown--open-on-hover dropdown">
              <a
                href="/instructor/courses"
                rel=" noopener noreferrer"
                target="_self"
                id="header.notifications"
                role="button"
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="fx pos-r text-center">
                  <span className="sr-only">Notifications</span>
                  <span className="dropdown__main-icon cfi cfi-bell-line" />
                  <span aria-label="3 unread notifications" className="badge">
                    3
                  </span>
                </div>
              </a>
              <ul
                role="menu"
                className="hidden dropdown-menu dropdown-menu-right"
                aria-labelledby="header.notifications"
              />
            </div>
          </div>
          <div className="ud-component--header-v6--user-dropdown-button hidden-xs hidden-xxs">
            <span>
              <div className="dropdown--open-on-hover dropdown--user dropdown--open-on-hover dropdown">
                <a
                  data-purpose="user-dropdown"
                  href="/instructor/user/edit-profile/"
                  rel=" noopener noreferrer"
                  target="_self"
                  id="header.profile"
                  role="button"
                  className="dropdown-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                >

                  {profile.avatar ? (<img alt=""  className="user-avatar user-avatar--image"  height={48} src={profile.avatar} width={48} />
                  ) : (<div
                    role="img"
                   
                    className="user-avatar user-avatar--initials"

                    style={{
                      backgroundColor: "rgb(28, 29, 31)",
                      fontSize: "15px",
                      width: "48px",
                    }}
                  >
                    <div className="user-avatar__inner fx-c">
                      <span className="user-initials">{initialAvatar(profile)}</span>
                    </div>
                  </div>)}
                </a>
                <UserDropdown profile={profile} />
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="ud-component--header-v6--mobile-nav" />
      <span className="ud-component--header-v6--view-tracker" />
    </div>
  );
};
