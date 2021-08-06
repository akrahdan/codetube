import classNames from "classnames";
import { useEffect, useState } from "react";
import { selectResources } from "state/course/courseSplice";
import { useUploadLectureVideoMutation } from "services/courses";
import moment from 'moment';
import type { MediaRequest, MediaResponse } from "services/courses";
import { useAppSelector } from "store/hooks";
import { selectLocationPayload } from "state/location/selectors";
import * as client from 'filestack-js';
import { UploadProgress } from "./UploadProgress";
const filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {})

const validateFileType = (fileItem) => {
  var fileType = fileItem.filetype; // image/png image/jpeg
  var rootType = fileType.split("/")[0];
  switch (rootType) {
    case "image":
      return 'File';
    default:
      return 'Video';
  }
}
export const UploadVideo = ({ onSuccess, lecture }) => {
  const [active, setActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mediaResources, setMediaResources] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const [files, setFiles] = useState(null)
  const locationPayload = useAppSelector(selectLocationPayload);
  const resources = useAppSelector(selectResources)
  const [uploadLectureVideo] = useUploadLectureVideoMutation()


  const onProgress = eve => {
    console.log(eve.totalPercent)
    setProgress(eve.totalPercent)

  }
  const onUpload = (files, { onProgress }) => {
    const obj = {
      name: files.name,
      type: files.type

    }
    setMediaResources([obj])
    setStatus('Progress')
    setUploading(true)
    filestack.upload(files, { onProgress })
      .then(async (res) => {
        if (res.status == "Failed") {
          setError('Your file upload failed')
          setStatus('Failed')
        }
        console.log(res)
        const media = {
          name: res.name,
          filetype: res.type,
          key: res.handle,
          size: res.size,
          course: locationPayload.id
        }
        try {
          const result = await uploadLectureVideo(media).unwrap();
          const obj = { ...result, url: res.url }
          onSuccess(obj)
          setStatus('Success')
          setUploading(false)
        } catch (err) {
          console.log('Error: ', err)
          setError(err)
          setStatus('Failed')

        }
      })
      .catch(err => {
        console.log('Error: ', err)
        setError(err.status)
        setStatus('Failed')
      })
  }

  useEffect(() => {
    setError(null)
    setStatus(null)
    if (files) {
      onUpload(files, { onProgress })
    }
  }, [files])

  return (
    <div className="pl10 pr10 pb10">
      <div id="media-asset-creator">
        <div className="nav-container">
          <ul
            data-purpose="video-asset-creator"
            role="tablist"
            className="nav nav-tabs"
          >
            <li role="presentation" className={classNames({
              'active': !active
            })}>
              <a
                id="media-asset-creator-tab-1"
                role="tab"
                onClick={() => setActive(!active)}
                aria-controls="media-asset-creator-pane-1"
                aria-selected="true"

              >
                Upload Video
              </a>
            </li>
            <li role="presentation" className={classNames({
              'active': active
            })}>
              <a
                id="media-asset-creator-tab-2"
                role="tab"
                onClick={() => setActive(!active)}
                aria-controls="media-asset-creator-pane-2"
                aria-selected="false"

                tabIndex={-1}
              >
                Add from library
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div
            id="media-asset-creator-pane-1"
            aria-labelledby="media-asset-creator-tab-1"
            role="tabpanel"
            aria-hidden="false"
            className={classNames("tab-pane  fade in", {
              'active': !active
            })}
          >
            <div>
              {uploading ? <UploadProgress error={error} status={status} progress={progress} mediaResources={mediaResources} toggleUpload={() => setUploading(!uploading)} /> : (<div>
                <div
                  className="file-uploader--file-selector--SGCns"
                  data-purpose="asset-uploader-input"
                >
                  <input
                    name={`assert-${lecture.id}`}
                    accept=".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv"
                    type="file"
                    onChange={event => setFiles(event.target.files[0])}
                    id={`file-upload-${lecture.id}`}
                    className="sr-only"
                  />
                  <label htmlFor={`file-upload-${lecture.id}`}>
                    <span className="input-group">
                      <div className="form-control file-uploader--fake-file-input--1_ohV">
                        No file selected
                      </div>
                      <span className="input-group-btn">
                        <div className="btn btn-default">
                          Select Video
                        </div>
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <div
                    className="mt10 mb10"
                    data-purpose="safely-set-inner-html:asset-uploader:note"
                  >
                    <b>Note</b>: All files should be at least 720p and less than
                    4.0 GB.
                  </div>
                </div>
              </div>)}

            </div>
          </div>
          <div
            id="media-asset-creator-pane-2"
            aria-labelledby="media-asset-creator-tab-2"
            role="tabpanel"
            aria-hidden="true"
            className={classNames("tab-pane  fade in", {
              'active': active
            })}
          >
            <div>
              <form >
                <div className="asset-library--search-box--2e_tN form-group form-group-sm">
                  <span className="input-group">
                    <input
                      placeholder="Search files by name"
                      data-purpose="search-box"
                      type="text"
                      className="form-control"
                    />
                    <span className="input-group-btn">
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                      >
                        <span className="cfi cfi-search" />
                      </button>
                    </span>
                  </span>
                </div>
              </form>
              <div className="fx" data-purpose="asset-table">
                <table className="v5-table-flat v5-table-flat--compress asset-table--asset-table--1FB3C data-table--sorting-table--Fr9kd">
                  <caption className="sr-only">
                    Library <br /> Sort descending by Date
                  </caption>
                  <thead>
                    <tr>
                      <th
                        role="columnheader"
                        aria-sort="none"
                        scope="col"
                        className="header"
                      >
                        <span className="sortable-header--header--2afzt">
                          Filename
                        </span>
                        <button
                          type="button"
                          className="btn btn-xs btn-tertiary"
                        >
                          <span className="cfi-small cfi cfi-sort" />
                          <span className="sr-only">
                            Sort ascending by Filename
                          </span>
                        </button>
                      </th>
                      <th
                        role="columnheader"
                        aria-sort="none"
                        scope="col"
                        className="header"
                      >
                        <span className="sortable-header--header--2afzt">
                          Type
                        </span>
                      </th>
                      <th
                        role="columnheader"
                        aria-sort="none"
                        scope="col"
                        className="header"
                      >
                        <span className="sortable-header--header--2afzt">
                          Status
                        </span>
                      </th>
                      <th
                        role="columnheader"
                        aria-sort="descending"
                        scope="col"
                        className="header active"
                      >
                        <span className="sortable-header--header--2afzt">
                          Date
                        </span>
                        <button
                          type="button"
                          className="btn btn-xs btn-tertiary"
                        >
                          <span className="cfi-small cfi cfi-sort-desc" />
                          <span className="sr-only">
                            Sort ascending by Date
                          </span>
                        </button>
                      </th>
                      <th
                        role="columnheader"
                        aria-sort="none"
                        scope="col"
                        className="header"
                      >
                        <span className="sortable-header--header--2afzt" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources && resources.map((resource, index) => {
                      if (validateFileType(resource) == 'Video') {
                        return (
                          <tr key={index} className="asset-table--asset-row--36BEz">
                            <td data-valign="center">
                              <div>{resource.name}</div>
                            </td>
                            <td data-responsive-text="Type" data-valign="center">
                              <div>{validateFileType(resource)}</div>
                            </td>
                            <td data-responsive-text="Status" data-valign="center">
                              <div className="text-success asset-table--asset-status--11R9h">
                                Success
                              </div>
                            </td>
                            <td data-responsive-text="Date" data-valign="center">
                              <div>{moment(resource.timestamp).format("MM/DD/YYYY")}</div>
                            </td>
                            <td data-valign="center">
                              <div className="asset-table--action-buttons--3agUO">
                                <button
                                  onClick={() => {
                                    onSuccess(resource)

                                  }

                                  }
                                  type="button"
                                  className="btn btn-xs btn-tertiary"
                                >
                                  Select
                                </button>
                                <button

                                  type="button"
                                  className="btn btn-xs btn-tertiary"
                                >
                                  <span className="cfi cfi-trash" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <div
                className="pagination-container hidden"
                data-purpose="pagination-container"
              >
                <ul className="pager">
                  <li className="disabled previous">
                    <a
                      href="/instructor/course/4199184/manage/curriculum"
                      tabIndex={-1}
                      style={{ pointerEvents: "none" }}
                    >
                      <span className="cfi cfi-previous" />
                    </a>
                  </li>
                  <li className="disabled next">
                    <a
                      href="/instructor/course/4199184/manage/curriculum?p=2"
                      tabIndex={-1}
                      style={{ pointerEvents: "none" }}
                    >
                      <span className="cfi cfi-next" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
