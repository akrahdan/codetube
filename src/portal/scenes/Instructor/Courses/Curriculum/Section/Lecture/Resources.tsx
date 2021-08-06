import { useState } from "react";
import cx from 'classnames';
import moment from 'moment'
import * as client from 'filestack-js';
import { selectResources } from "state/course/courseSplice";
import { useCreateResourceMutation, useCreateSectionMutation } from "services/courses";
import { useAppSelector } from "store/hooks";
import { InputFile } from "filestack-js";
import { MediaResponse } from "services/courses";
import { selectLocationPayload } from "state/location/selectors";
import { UploadProgress } from "./UploadProgress";

interface MediaResource {
  type: string
  name: string;
  size: number;
  handle: string;
  url: string;
}
const filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {})
export const Resources = ({ selectResource, toggle, onSuccess }) => {
  const [active, setActive] = useState('downloadable')
  const [createResource] = useCreateResourceMutation()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mediaResources, setMediaResources] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Progress')
  const resources = useAppSelector(selectResources)
  const locationPayload = useAppSelector(selectLocationPayload);
  const onProgress = eve => {
    console.log(eve.totalPercent)
    setProgress(eve.totalPercent)

  }

  const onUpload = async (files, onProgress) => {

    const mediaResponse = Array.from(files).map(item => {
      return item;
    })
    setStatus('Progress')
    setMediaResources(mediaResponse)
    setUploading(true)
    let returnedResources: MediaResponse[];
    filestack.multiupload(files, { onProgress })
      .then(results => {
        results.forEach(async (res, index) => {
          if(res.status == "Failed") {
            console.log(res)
            setError("File failed to upload")
            setStatus('Failed')
            return
          }
          
          const media = {
            name: res.name,
            filetype: res.type,
            key: res.handle,
            size: res.size,
            course: locationPayload.id
          }
          try {
            returnedResources = await createResource(media).unwrap()
            if (index == (results.length - 1)) {
              let successes = results.map(value => {
                let resource = returnedResources.find(item => item.key == value.handle)
                if (resource && resource.id) {
                  return resource.id;
                }
              })
              console.log("onSuccess: ", successes)
              onSuccess(successes)
              setStatus('Success')
              setUploading(false)
            }
          } catch (err) {
            setError(err)
            setStatus('Failed')
            console.log(err)
          }
        })
      }).catch(err => {
        setStatus('Failed')
        console.log(err)
        setError(err)
      })



  }
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
  return (
    <div className="pl10 pr10 pb10">
      <div id="supplementary-asset-creator">
        <div className="nav-container">
          <ul
            data-purpose="supplementary-asset-creator"
            role="tablist"
            className="nav nav-tabs"
          >
            <li role="presentation" className={cx({
              'active': active == 'downloadable'
            })}>
              <a
                onClick={() => setActive('downloadable')}
                id="supplementary-asset-creator-tab-1"
                role="tab"
                aria-controls="supplementary-asset-creator-pane-1"
                aria-selected="true"

              >
                Downloadable File
              </a>
            </li>
            <li role="presentation" className={cx({
              'active': active == 'library'
            })}>
              <a
                onClick={() => setActive('library')}
                id="supplementary-asset-creator-tab-2"
                role="tab"
                aria-controls="supplementary-asset-creator-pane-2"
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
            data-purpose="file-uploader-tab"
            id="supplementary-asset-creator-pane-1"
            aria-labelledby="supplementary-asset-creator-tab-1"
            role="tabpanel"
            aria-hidden="false"
            className={cx("tab-pane fade", {
              'active in': active == 'downloadable'
            })}
          >
            <div>
              {uploading ? <UploadProgress error={error} status={status} progress={progress} mediaResources={mediaResources} toggleUpload={() => setUploading(!uploading)} /> : (<div>
                <div
                  className="file-uploader--file-selector--SGCns"
                  data-purpose="asset-uploader-input"
                >
                  <input
                    name="asset"
                    type="file"
                    multiple
                    onChange={event => onUpload(event.target.files, onProgress)}
                    id="file-upload-10--23"
                    className="sr-only"
                  />
                  <label htmlFor="file-upload-10--23">
                    <span className="input-group">
                      <div className="form-control file-uploader--fake-file-input--1_ohV">
                        No file selected
                      </div>
                      <span className="input-group-btn">
                        <div data-type="button" className="btn btn-default">
                          Select File
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
                    <b>Note</b>: A resource is for any type of document that
                    can be used to help students in the lecture. This file is
                    going to be seen as a lecture extra. Make sure everything
                    is legible and the file size is less than 1 GiB.
                  </div>
                </div>
              </div>)}
            </div>
          </div>
          <div
            data-purpose="library-tab"
            id="supplementary-asset-creator-pane-2"
            aria-labelledby="supplementary-asset-creator-tab-2"
            role="tabpanel"
            aria-hidden="true"
            className={cx("tab-pane fade", {
              'active in': active == 'library'
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
                        <span
                          data-purpose="header-title"
                          className="sortable-header--header--2afzt"
                        >
                          Filename
                        </span>
                        <button
                          data-purpose="sortable-header-button"
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
                        aria-sort="descending"
                        scope="col"
                        className="header active"
                      >
                        <span
                          data-purpose="header-title"
                          className="sortable-header--header--2afzt"
                        >
                          Date
                        </span>
                        <button
                          data-purpose="sortable-header-button"
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
                        <span
                          data-purpose="header-title"
                          className="sortable-header--header--2afzt"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources && resources.map((resource, index) => (
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
                                selectResource(resource)
                                toggle()
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
                    ))}

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
