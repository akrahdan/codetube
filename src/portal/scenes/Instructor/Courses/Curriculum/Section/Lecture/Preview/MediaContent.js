import moment from 'moment';
export const MediaContent = ({ media, seToggle }) => {
  return (
    <div className="fx pb10 lecture-editor--edit-content__main-asset--30YL0">
      <div>
        <div className="fx">
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
                  <div>{media.name}</div>
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
                  <div>{moment().format('L')}</div>
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
  );
};
