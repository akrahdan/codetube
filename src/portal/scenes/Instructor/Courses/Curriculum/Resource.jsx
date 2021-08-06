export const Resource = () => {
  return (
    <div className="fx-lt fxwrap db-sm lecture-editor--edit-content__row--3z9s2">
      <div
        className="fx pb10 lecture-editor--edit-content__main-asset--30YL0"
        data-purpose="asset-info"
      >
        <div data-purpose="single-asset-table">
          <div className="fx" data-purpose="asset-table">
            <table className="v5-table-flat v5-table-flat--compress asset-table--asset-table--1FB3C data-table--sorting-table--Fr9kd">
              <caption className="sr-only">
                Library <br />{" "}
              </caption>
              <thead>
                <tr>
                  <th
                    role="columnheader"
                    aria-sort="none"
                    scope="col"
                    className="header"
                  >
                    <span
                      data-purpose="header-title"
                      className="sortable-header--header--2afzt"
                    >
                      Filename
                    </span>
                  </th>
                  <th
                    role="columnheader"
                    aria-sort="none"
                    scope="col"
                    className="header"
                  >
                    <span
                      data-purpose="header-title"
                      className="sortable-header--header--2afzt"
                    >
                      Type
                    </span>
                  </th>
                  <th
                    role="columnheader"
                    aria-sort="none"
                    scope="col"
                    className="header"
                  >
                    <span
                      data-purpose="header-title"
                      className="sortable-header--header--2afzt"
                    >
                      Status
                    </span>
                  </th>
                  <th
                    role="columnheader"
                    aria-sort="none"
                    scope="col"
                    className="header"
                  >
                    <span
                      data-purpose="header-title"
                      className="sortable-header--header--2afzt"
                    >
                      Date
                    </span>
                  </th>
                  <th
                    role="columnheader"
                    aria-sort="none"
                    scope="col"
                    className="header"
                  >
                    <span
                      data-purpose="header-title"
                      className="sortable-header--header--2afzt"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="asset-table--asset-row--36BEz">
                  <td data-responsive-text="Filename" valign="center">
                    <div>3___setup_subdomain_nameservers_in_route_53.mp4</div>
                  </td>
                  <td data-responsive-text="Type" valign="center">
                    <div>Video</div>
                  </td>
                  <td data-responsive-text="Status" valign="center">
                    <div className="text-secondary asset-table--asset-status--11R9h">
                      Processing
                    </div>
                  </td>
                  <td data-responsive-text="Date" valign="center">
                    <div>07/18/2021</div>
                  </td>
                  <td valign="center">
                    <div className="asset-table--action-buttons--3agUO">
                      <button
                        data-purpose="replace-btn"
                        type="button"
                        className="btn btn-xs btn-tertiary"
                      >
                        Replace
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div
              className="mt10 mb10"
              data-purpose="safely-set-inner-html:asset-uploader:note"
            >
              <b>Note:</b> This video is still being processed. We will send you
              an email when it is ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
