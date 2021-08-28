
export const Inbox = () => {
  return (
    <div className="messaging--messaging-content--1uL6t">
      <div className="fx fx-lt two-pane--container--2Ezpk two-pane--container--left-active--1ya1w">
        <div className="two-pane--container__left-pane--b9d60">
          <div className="message-thread-list--thread-list--2ARNF">
            <form className="message-thread-list--search-bar--3MVkF exitable-search-bar--outer--3CpWB">
              <span className="input-group">
                <input
                  placeholder="Search by keyword, sender name"
                  type="text"
                  id="search-messages"
                  className="exitable-search-bar--search-field--1cErJ form-control"
                  
                />
                <span className="input-group-btn">
                  <button
                    type="submit"
                    aria-label="Search"
                    className="exitable-search-bar--search-button--3ksKn btn btn-default"
                  >
                    <span className="exitable-search-bar--search-icon--5mxlF cfi cfi-search" />
                  </button>
                </span>
              </span>
            </form>
            <div className="message-thread-list--thread-list__thread-container---OahW" />
            <div className="message-thread-list--empty-state--37VY0">
              <div className="text-center w100p">
                <img
                  alt=""
                  width={240}
                  height={180}
                  
                  src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
                  srcSet="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg 1x, https://s.udemycdn.com/communication/empty-mailbox-2x-v2.jpg 2x"
                />
                <h3 className="empty-state--empty-title--27f48">
                  No unread items
                </h3>
                <div className="empty-state--empty-text--2ABCu">
                  You’re all caught up
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="two-pane--container__right-pane--2xMVx" />
      </div>
    </div>
  );
};
