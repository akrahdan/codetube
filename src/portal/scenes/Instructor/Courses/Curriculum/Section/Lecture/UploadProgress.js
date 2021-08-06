import moment from "moment";
import { useState } from "react";
import { UploadError } from "./UploadError";
export const UploadProgress = ({
  progress,
  mediaResources,
  error,
  status,
  toggleUpload,
}) => {
  const [errorMessage, setErrorMessage] = useState(error);
  const validateFileType = (fileItem) => {
    var fileType = fileItem.type; // image/png image/jpeg
    var rootType = fileType.split("/")[0];
    switch (rootType) {
      case "image":
        return "File";
      default:
        return "Video";
    }
  };

  return (
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
          {mediaResources &&
            mediaResources.length &&
            mediaResources.map((resource, index) => (
              <tr key={index} className="asset-table--asset-row--36BEz">
                <td data-responsive-text="Filename" valign="center">
                  <div>{resource.name}</div>
                </td>
                <td data-responsive-text="Type" valign="center">
                  <div>{validateFileType(resource)}</div>
                </td>
                <td valign="center">
                  <div className="asset-table--asset-status--11R9h">
                    {status == "Progress" ? (
                      <div className="progress-sm progress">
                        <div
                          role="progressbar"
                          className="progress-bar"
                          aria-valuenow={9}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: `${progress}%` }}
                        >
                          {progress}%
                        </div>
                      </div>
                    ) : (
                      status
                    )}
                  </div>
                </td>
                <td data-responsive-text="Date" valign="center">
                  <div>{moment(new Date()).format("MM/DD/YYYY")}</div>
                </td>
                <td valign="center">
                  <div className="asset-table--action-buttons--3agUO">
                    <button
                      onClick={() => {
                        setErrorMessage(null);
                        toggleUpload();
                      }}
                      data-purpose="delete-asset-button"
                      type="button"
                      className="btn btn-xs btn-tertiary"
                    >
                      <span className="cfi cfi-close" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          {errorMessage && <UploadError error={errorMessage} />}
        </tbody>
      </table>
    </div>
  );
};
