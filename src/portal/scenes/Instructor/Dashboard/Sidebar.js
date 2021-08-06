import classNames from "classnames";
import { NavLink } from "redux-first-router-link";
import { setCurrentPath } from "state/instructor/instructorSplice";
import { useAppDispatch } from "store/hooks";

import logo from "static/images/brand/logo/cflogo.svg";
import { useState } from "react";
import { useHistory } from "react-router";
import React from "react";
import * as paths from "portal/state/location/paths";
export const Sidebar = ({ sideOpen, perfOpen }) => {
  const [toggle, setToggle] = React.useState(false);
  const [active, setActive] = useState("/instructor/courses");
  const [sideActive, setSideActive] = useState(paths.Qa);
  const [perfActive, setPerfActive] = useState(paths.Overview);
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  return (
    <div
      onMouseOver={() => setToggle(false)}
      className={classNames("side-nav--side-nav--3Arp5", {
        "side-nav--side-nav-open--1zqDo": sideOpen || perfOpen,
      })}
    >
      <div className="side-nav--side-nav-inner--1ndT2">
        <div
          className={classNames("side-nav--primary-menu--2GcVo", {
            "side-nav--no-expand--176de": toggle,
          })}
        >
          <div className="nav-container">
            <ul className="nav nav-pills nav-stacked">
              <li className={classNames("side-nav--logo-menu-item--3ODgF")}>
                <a href="#">
                  <img alt="codefluent" width={91} height={34} src={logo} />
                </a>
              </li>
              <li
                className={classNames("side-nav--nav-button--1zEvP", {
                  "side-nav--active--2qr2l": active == paths.Courses,
                })}
              >
                <NavLink
                  to="/instructor/courses"
                  onClick={(event) => {
                    // event.preventDefault();
                    setToggle(!toggle);
                    setActive(event.currentTarget.getAttribute("href"));

                    // dispatch(
                    //   setCurrentPath(event.currentTarget.getAttribute("href"))
                    // );
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="udlite-icon udlite-icon-medium side-nav--icon--3_8ka"
                  >
                    <use xlinkHref="#icon-video">
                      <svg id="icon-video" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 00-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7l7 4z"></path>
                      </svg>
                    </use>
                  </svg>
                  <span className="side-nav--title--1Fgkc">Courses</span>
                </NavLink>
              </li>
              <li className={classNames("side-nav--nav-button--1zEvP", {
                  "side-nav--active--2qr2l": active == paths.Qa,
                })}>
                <NavLink
                  
                  
                  to="/instructor/communication/qa"
                  onClick={(event) => {
                    //event.preventDefault();
                    //push(event.currentTarget.getAttribute("href"))
                    //setActive()
                    setToggle(!toggle);
                    setActive(event.currentTarget.getAttribute("href"))
                    // dispatch(
                    //   setCurrentPath(event.currentTarget.getAttribute("href"))
                    // );
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="udlite-icon udlite-icon-medium side-nav--icon--3_8ka"
                  >
                    <use xlinkHref="#icon-message">
                      <svg id="icon-message" viewBox="0 0 24 24">
                        <path d="M20 2a2 2 0 012 2v12a2 2 0 01-2 2H6l-4 4V4a2 2 0 012-2h16M4 4v13.17L5.17 16H20V4H4m2 3h12v2H6V7m0 4h9v2H6v-2z"></path>
                      </svg>
                    </use>
                  </svg>
                  <span className="side-nav--title--1Fgkc">Communication</span>
                </NavLink>
              </li>
              <li className={classNames("side-nav--nav-button--1zEvP", {
                  "side-nav--active--2qr2l": active == paths.Overview,
                })}>
                <NavLink
                  activeClassName={"side-nav--active--2qr2l"}
                  isActive={() => active == "/instructor/performance/overview"}
                  onClick={(event) => {
                    //event.preventDefault();
                    //push(event.currentTarget.getAttribute("href"))
                    setToggle(!toggle);
                    setActive(event.currentTarget.getAttribute("href"))
                    // dispatch(
                    //   setCurrentPath(event.currentTarget.getAttribute("href"))
                    // );
                  }}
                  to="/instructor/performance/overview"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="udlite-icon udlite-icon-medium side-nav--icon--3_8ka"
                  >
                    <use xlinkHref="#icon-bar-chart">
                      <svg id="icon-bar-chart" viewBox="0 0 24 24">
                        <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"></path>
                      </svg>
                    </use>
                  </svg>
                  <span className="side-nav--title--1Fgkc">Performance</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {perfOpen && (
          <div className="nav-container">
            <ul
              role="navigation"
              className="side-nav--secondary-menu--gAOh0 nav nav-pills nav-stacked"
            >
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': perfActive == paths.Overview
                })}
              >
                <NavLink
                  onClick={(event) => {
                    //event.preventDefault();
                    setToggle(!toggle);
                    setPerfActive(paths.Overview)
                    // dispatch(
                    //   setCurrentPath(event.currentTarget.getAttribute("href"))
                    // );
                  }}
                  
                  to="/instructor/performance/overview"
                >
                  Overview{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': perfActive == paths.Students
                })}
              >
                <NavLink
                  onClick={(event) => {
                   
                    setToggle(!toggle);
                    setPerfActive(paths.Students)
                  }}
                  
                  to="/instructor/performance/students"
                >
                  Students{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': perfActive == paths.Reviews
                })}
              >
                <NavLink
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setPerfActive(paths.Reviews)
                    dispatch(
                      setCurrentPath(event.currentTarget.getAttribute("href"))
                    );
                  }}
                  data-resource="reviews"
                  href="/instructor/performance/reviews"
                >
                  Reviews{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': perfActive == paths.Engagement
                })}
              >
                <NavLink
                  onClick={(event) => {
                   
                    setToggle(!toggle);
                    setPerfActive(paths.Engagement)
                  }}
                 
                  to="/instructor/performance/engagement"
                >
                  Course engagement{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': perfActive == paths.Traffic
                })}
              >
                <NavLink
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setPerfActive(paths.Traffic)
                   
                  }}
                  
                  to="/instructor/performance/conversion"
                >
                  Traffic &amp; conversion{" "}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {sideOpen && (
          <div className="nav-container">
            <ul
              role="navigation"
              className="side-nav--secondary-menu--gAOh0 nav nav-pills nav-stacked"
            >
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': sideActive == paths.Qa
                })}
              >
                <NavLink
                  
                  to="/instructor/communication/qa"
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setSideActive(paths.Qa)
                    
                  }}
                >
                  Q&amp;A{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': sideActive == paths.Messages
                })}
              >
                <NavLink
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setSideActive(paths.Messages)
                  }}
                  data-resource="messages"
                  to="/instructor/communication/messages"
                >
                  Messages{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': sideActive == paths.Assignments
                })}
              >
                <NavLink
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setSideActive(paths.Assignments)
                  }}
                 
                  to="/instructor/communication/assignments"
                >
                  Assignments{" "}
                </NavLink>
              </li>
              <li
                role="presentation"
                className={classNames("side-nav--subnav-button--3MQwM", {
                    'side-nav--active--2qr2l active': sideActive == paths.Announcements
                })}
              >
                <NavLink
                  onClick={(event) => {
                    
                    setToggle(!toggle);
                    setSideActive(paths.Announcements)
                  }}
                  data-resource="announcements"
                  to="/instructor/communication/announcements"
                >
                  Announcements{" "}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
