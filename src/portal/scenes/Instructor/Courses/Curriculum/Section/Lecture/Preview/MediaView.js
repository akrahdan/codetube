import { useState } from 'react';
import Player from 'react-player';
export const MediaView = ({video_url, media, setToggle }) => {
    const [duration, setDuration] = useState(null)

    const getDuration = (value) => {
      setDuration(value)
    }
    return (
      <div>
           <div
        className="fx pb10 lecture-editor--edit-content__main-asset--30YL0"
        data-purpose="asset-info"
      >
        <div className="fx-lt">
          <div
            className="selected-asset-cards--thumbnail-container--jymMF"
            
          ><Player url={video_url} light onDuration={getDuration} width={'110px'} height={'60px'}/></div>

          <div className="fx pl10">
            <div className="a4 ellipsis">
              {media.name}
            </div>
            <time className="db">{duration}</time>
            <a
              className="db text-nowrap"
              onClick={setToggle}
              data-purpose="edit-content-link"
            >
              <span className="cfi cfi-pencil" />{" "}
              <span className="text-wrap">Edit Content</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="pb10 lecture-editor--lecture-settings--7Lmmh"
        data-purpose="lecture-settings"
      >
        <div className="mb10 text-nowrap">
          <div className="dropdown btn-group btn-group-sm btn-group-secondary">
            <button
              id="preview"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              className="ellipsis dropdown-toggle btn btn-sm btn-secondary"
              style={{ paddingRight: "26px", maxWidth: "128px" }}
            >
              Preview
              <span style={{ position: "absolute", right: "12px" }}>
                <span className="dropdown-caret cfi cfi-angle-down" />
              </span>
            </button>
            <ul
              role="menu"
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="preview"
            >
              <li role="presentation">
                <a
                  data-purpose="preview-as-instructor"
                  href="https://www.udemy.com/course/draft/860998/learn/lecture/27584150/?instructorPreviewMode=instructor_v4"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  tabIndex={-1}
                >
                  As Instructor
                </a>
              </li>
              <li role="presentation">
                <a
                  data-purpose="preview-as-student"
                  href="https://www.udemy.com/course/draft/860998/learn/lecture/27584150/?instructorPreviewMode=student_v4"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  tabIndex={-1}
                >
                  As Student
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-space-xs">
          <span className="mr10">Downloadable:</span>
          <label className="checkbox-slide checkbox-inline">
            <input data-purpose="is-downloadable-toggle" type="checkbox" />
            <span className="toggle-control-label checkbox-label">
              <span className="checkbox-slider" />
            </span>
          </label>
        </div>
      </div>
      </div>
    );
}