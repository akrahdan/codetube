import { useState } from "react";
import classNames from "classnames";
import { BasicInfo } from "./BasicInfo";
import { Picture } from "./Picture";
import { useInstructor } from "store/useInstructor";
import { InstructorResponse } from "services/courses";

export const InstructorProfile = () => {
  const [active, setActive ] = useState('basicInfo')
  
  return (
    <div className="responsive_container ">
      <div>
        <div>
          <h1
            className="udlite-heading-serif-xxl sub-header--title--1CSOo"
            data-purpose="page-title"
          >
            Profile &amp; settings
          </h1>
          <div className="nav-container">
            <ul className="nav-slide sub-header--nav--1hT_o nav nav-tabs">
              <li role="presentation" className={classNames({
                active: active == "basicInfo"
              })}>
                <a onClick={event => {
                  event.preventDefault()
                  setActive("basicInfo")
                }}>
                Profile
                </a>
              </li>
              <li role="presentation" className={classNames({
                active: active == "picture"
              })} >
                <a onClick={event => {
                  event.preventDefault()
                  setActive("picture")
                }}>Profile picture</a>
              </li>
              <BasicInfo active= {active == "basicInfo"} />
              <Picture active= {active == "picture"} />
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default InstructorProfile;
