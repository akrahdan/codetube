import { PersonalInfo } from "./PersonalInfo";
import { PayoutMethod } from "./PayoutMethod";
import { Profile } from "./Profile";
import "./userinfo.scss";
import { useState } from "react";
import classNames from "classnames";
export const PayoutSettings = () => {
  const [active, setActive] = useState("personal");
  return (
    <div className="responsive_container ud-app-loader ud-app-loaded">
      <div id="edit-template">
        <div id="main-section">
          <h2>
            <span className="font-heading-serif-xxl">
              Codefluent Instructor Application
            </span>
          </h2>
          <div className="form-wrapper">
            <div className="mt30 mb60 fx-c">
              <ul className="nav nav-tabs nav-tabs--wizard df">
                <li
                  className={classNames({
                    active: active == "personal",
                  })}
                >
                  <a className="no-hover" onClick={() => setActive("personal")}>
                    Personal Information
                  </a>
                </li>
                <li
                  className={classNames({
                    active: active == "profile",
                  })}
                >
                  <a className="no-hover" onClick={() => setActive("profile")}>
                    Profile Picture
                  </a>
                </li>

                <li
                  className={classNames({
                    active: active == "payout",
                  })}
                >
                  <a className="no-hover" onClick={() => setActive("payout")}>
                    Payout Method
                  </a>
                </li>
              </ul>
            </div>
            <PersonalInfo
              active={active == "personal"}
              next={() => {
                setActive("profile");
              }}
            />
            <Profile
              active={active == "profile"}
              next={() => {
                setActive("payout");
              }}
            />
            <PayoutMethod active={active == "payout"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings;
