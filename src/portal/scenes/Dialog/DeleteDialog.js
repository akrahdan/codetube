export const DeleteDialog = ({ deleteCallback, cancelDelete, text}) => {
  return (
    <div role="dialog">
      <div className="modal-backdrop fade in" />
      <div
        role="dialog"
        tabIndex={-1}
        className="fade in modal"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content" role="document">
            <div className="modal-header">
              <button onClick={cancelDelete} type="button" className="close">
                <span >×</span>
                <span className="sr-only">Close modal</span>
              </button>
              <h4 id="confirm-title" className="modal-title">
                Please Confirm
              </h4>
            </div>
            <div className="modal-body">
             {text}
            </div>
            <div className="modal-footer">
              <button
                onClick={cancelDelete}
                type="reset"
                className="btn btn-tertiary"
              >
                Cancel
              </button>
              <button
                onClick={deleteCallback}
                
                type="submit"
                className="btn btn-secondary"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
