import React from "react";
import moment from 'moment'
import parse from 'html-react-parser'
import Link from 'redux-first-router-link'
import { Message } from "services/messaging";
import logo from 'static/images/avatar/profile-avatar.png';
import { useFetchUserProfileQuery } from 'services/messaging';


type MessageProps = {
  message: Message
}

export const MessageDetail: React.FC<MessageProps> = ({ message}) => {
  const { data: userQuery } = useFetchUserProfileQuery(message?.user?.pk)
  return (
    <>
      <div className="text-uppercase text-center mt20 mb20 message-thread-detail--date-divider--2eJzy">
       {moment(new Date(message?.timestamp))?.format("MMM DD, YYYY")}
      </div>
      <div className="fx-df message-thread-detail--message-outer--3iE12">
        <Link to={`/user/${message?.user?.username}`} >
          <img
            alt={message?.user?.first_name ? `${message?.user?.first_name} ${message?.user?.last_name}`: message?.user?.email}
            aria-label={message?.user?.first_name ? `${message?.user?.first_name} ${message?.user?.last_name}`: message?.user?.email}
            className="user-avatar user-avatar--image"
            
            height={36}
            width={36}
            src={userQuery?.avatar || logo}
          />
        </Link>
        <div className="fx message-thread-detail--message-content--3TkMw">
          <div className="mb10 message-thread-detail--message-info-bar--2RgoK">
            <Link to={`/user/${message?.user?.username}`} target="_blank" >
              <span className="mr15 message-thread-detail--message-info-bar__name--24jIB">
              {message?.user?.first_name ? `${message?.user?.first_name} ${message?.user?.last_name}`: message?.user?.email}
              </span>
            </Link>
            
            {<span>{moment(new Date(message?.timestamp))?.format("hh:mm a")}</span>}
          </div>
          <div className="fs-exclude">
            <div>
              {parse(message?.message)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
