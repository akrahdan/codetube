import React from "react";
import { MessageThread } from "services/messaging";
import Link from 'redux-first-router-link';
import parse from 'html-react-parser'
import moment from 'moment'
import { useFetchUserProfileQuery } from 'services/messaging';
import logo from 'static/images/avatar/profile-avatar.png';
type MessageProps = {
  thread: MessageThread,
  handleThread: (thread: MessageThread) => void,
}
export const MessageListItem: React.FC<MessageProps> = ({ thread, handleThread }) => {

  const { data: Query } = useFetchUserProfileQuery(thread?.second?.pk)
  return (
    <Link to={`/messages/thread/${thread?.id}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleThread(thread)}
        className="user-communication-card--communication-card--2NvmY user-communication-card--active--1OYZO"
      >
        <div className="user-communication-card--communication-card__container--39pYc">
          <div className="user-communication-card--communication-card__container__user-info--gQNAt">
            <div className="user-communication-card--user-initials--23nJ_">
              <img
                alt={thread?.second?.first_name ? `${thread?.second?.first_name} ${thread?.second?.last_name}` : thread?.second?.username}
                aria-label={thread?.second?.first_name ? `${thread?.second?.first_name} ${thread?.second?.last_name}` : thread?.second?.username}
                className="user-avatar user-avatar--image"
                
                height={36}
                width={36}
                src={Query?.avatar || logo}
              />
            </div>
          </div>
          <div className="user-communication-card--communication-card__content--3Bkns">
            <div className="user-communication-card--communication-card__content__top--3UkfK">
              <div className="fs-exclude user-communication-card--communication-card__content__top__left--Vi2k0">
                <p className="user-communication-card--communication-card__content__top__left__message--1fNfH">
                 {thread?.messages?.length ? parse(thread?.messages[0]?.message) : ''}
                </p>
              </div>
              <div
                className="unread-indicator--outer--RADfz"
                role="button"
                tabIndex={-1}
              >
                <div className="tooltip-container">
                  <div className="unread-indicator--thread-status--3YhQS unread-indicator--thread-status--read--3mSey" />
                  <div
                    id="tooltip-thread-status--15"
                    role="tooltip"
                    className="with-chevron tooltip left"
                  >
                    <div className="tooltip-arrow" />
                    <div className="tooltip-inner">
                      <div >mark as unread</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-communication-card--communication-card__content__bottom--2bCEd">
              <p className="user-communication-card--communication-card__content__bottom__name--3F4ch">
                {thread?.second?.first_name ? `${thread?.second?.first_name} ${thread?.second?.last_name}` : thread?.second?.username}
              </p>
              <p className="user-communication-card--communication-card__content__bottom__time--1_iYP">
               {moment(thread?.messages[0]?.timestamp)?.fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
