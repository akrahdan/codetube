import { useEffect, useState } from "react";
import { useInstructor } from "store/useInstructor";
import { InstructorResponse } from "services/courses";
export const Settings = () => {
  const { instructor } = useInstructor()
  const [profile, setProfile] = useState<InstructorResponse>(instructor)

  useEffect(() => {
    setProfile(instructor)
  }, [instructor])
  return (
    <div>
      <div className="sub-header--wrapper--3Vunm">
        <div className="sub-header--main-content--22it3">
          <h2
            data-purpose="page-title"
            className="font-heading-serif-xl sub-header--title--2VD8q"
          >
            Settings
          </h2>
        </div>
        <div className="sub-header--actions--1Nblj">
          <div className="dropdown btn-group btn-group-default">
            <button
              id="dropdown--email-notifications"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              className="email-options--dropdown-button--e63e_ dropdown-toggle btn btn-default"
              style={{ paddingRight: "26px" }}
            >
              Manage Email Notifications
              <span style={{ position: "absolute", right: "12px" }}>
                <span className="dropdown-caret cfi cfi-angle-down" />
              </span>
            </button>
            <ul
              role="menu"
              className="dropdown-menu"
              aria-labelledby="dropdown--email-notifications"
            >
              <li role="presentation">
                <span className="dropdown-menu-link" role="menuitem">
                  <div className="checkbox">
                    <label >
                      <input
                        data-purpose="user-notification-checkbox-daily-discussions-digest"
                        type="checkbox"
                        defaultChecked
                      />
                      <span className="toggle-control-label checkbox-label">
                        Daily Q&amp;A digest
                      </span>
                    </label>
                  </div>
                </span>
              </li>
              <li role="presentation">
                <span className="dropdown-menu-link" role="menuitem">
                  <div className="checkbox">
                    <label >
                      <input
                        data-purpose="user-notification-checkbox-send-asset-ready"
                        type="checkbox"
                        defaultChecked
                      />
                      <span className="toggle-control-label checkbox-label">
                        Lecture ready emails
                      </span>
                    </label>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <span>
          <p>Course Status</p>
          <p>This course is not published on Codefluent.</p>
        </span>
        <div>
          <div className="course-status unpublish-course--button-wrapper--_J7M2">
            <button
              disabled
              type="button"
              className="unpublish-course--button--gJi58 btn btn-sm btn-default"
            >
              Unpublish
            </button>
            <p className="unpublish-course--info--CmEVw">
              New students cannot find your course via search, but existing
              students can still access content.
            </p>
          </div>
          <div className="course-status delete-course--button-wrapper--Dn42x">
            <button
              type="button"
              className="delete-course--button--1gQRN btn btn-sm btn-danger"
            >
              Delete
            </button>
            <p className="delete-course--info--3vg8a">
              We promise students lifetime access, so courses cannot be deleted
              after students have enrolled.
            </p>
          </div>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <div className="form-group">
          <div className="row">
            <div className="col-xs-6">
              <label
                htmlFor="formControlsSelect"
                className="mb20 control-label"
              >
                Enrollment (Privacy)
              </label>
              <div className="form-control-single-select-container">
                <select
                  name="privacy"
                  id="formControlsSelect"
                  className="form-control"
                >
                  <option value="OPTION_PUBLIC">Public</option>
                  <option value="OPTION_PRIVATE_INVITE">
                    Private (Invitation Only)
                  </option>
                  <option value="OPTION_PRIVATE_PASSWORD">
                    Private (Password Protected)
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-8 col-md-6">
              <p className="form-control-static">

                Public courses show up in search results and are available for
                anyone to take on Codefluent.
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-secondary">
            Save
          </button>
        </div>
      </div>
      <div className="main-content--wrap_component--2TEkz">

        <p className="blockLabel">Permissions</p>
        <div className="manage-instructors">
          <div className="table-container table-responsive">
            <table className="v5-table-flat v5-table-flat--compress v5-table-flat--same-height v5-table-flat--no-responsive">
              <thead>
                <tr>
                  <th>Instructor</th>
                  <th>Visible</th>
                  <th>Manage</th>
                  <th>Captions</th>
                  <th>Performance</th>
                  <th>Q&amp;A</th>
                  <th>Assignments</th>
                  <th>Reviews</th>
                  <th aria-label="Delete instructor" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="fx-lc">
                      <span className="ellipsis instructor-row--instructor-row--176Ki">
                        {profile ? profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.user ? profile.email : '' : ''}
                      </span>
                      <span>
                        <span className="label label-default">Owner</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox">
                      <label >
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox disabled">
                      <label >
                        <input type="checkbox" disabled defaultChecked />
                        <span className="toggle-control-label checkbox-label" />
                      </label>
                    </div>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt20">
            <form >
              <div className="form-group">
                <span className="input-group">
                  <input
                    placeholder="Enter an email associated with a Codefluent account"
                    type="text"
                    className="form-control"

                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      disabled
                      className="btn btn-secondary"
                    >
                      Add
                    </button>
                  </span>
                </span>
              </div>
            </form>
          </div>
          <div>
            <button

              type="button"
              className="btn btn-secondary"
            >
              Save
            </button>
          </div>
          <div className="mt20" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
