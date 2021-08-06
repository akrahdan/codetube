export const UploadProgress = ({ progress, changeUpload }) => {
  return (
    <span className="file-uploader--progressBarWrapper--2lCJU input-group">
      <div className="file-uploader--progressBar--3WNS9 progress">
        <div
          role="progressbar"
          className="progress-bar"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${progress}% `}}
        >
          {`${progress}%`}
        </div>
      </div>
      <span className="input-group-btn">
        <button type="button"
        onClick={changeUpload}
         className="btn btn-default">
          Change
        </button>
      </span>
    </span>
  );
};
