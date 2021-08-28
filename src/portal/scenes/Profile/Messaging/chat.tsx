import { useEffect, useState } from "react";
import { Inbox } from "./inbox";
import { MessageThread, useFetchMessageThreadsQuery } from "services/messaging";
import { selectedThreads } from "state/messaging/messagingSlice";
import { useAppSelector } from "store/hooks";

import './chats.scss';
// import { Link } from "react-router-dom";
import Link from 'redux-first-router-link'


export const AllChats = () => {
  const threads = useAppSelector(selectedThreads)
  const { data: query } = useFetchMessageThreadsQuery()
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>()



  useEffect(() => {
    setMessageThreads(threads)
  }, [threads])
  const setupSocket = () => {
    const token = localStorage.getItem('token')

    const socket = new WebSocket(
      (window.location.protocol == 'https:' ? 'wss://' : 'ws://')
      + '127.0.0.1:8000'
      + `/ws/messages/id/?token=${token}`
    );

    socket.onmessage = event => {
      console.log('message', event)
    }
    socket.onopen = e => {
      console.log('open:', e)
    }

    socket.onmessage = event => {
      console.log('message', event)
    }

    socket.onclose = e => {
      console.error('Error: ', e)
    }

    socket.onclose = event => {
      console.log('close', event)
    }
  }


  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div className="ia-responsive-header--container--whwFw">
        <div className="ia-responsive-header--title-dropdown--3N0GS">
          <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
            Messages
          </h1>
          <div className="ia-responsive-header--title-dropdown__dropdown--Kg0Ue" />
        </div>
        <div className="ia-responsive-header--course-dropdown-near-filters--2aYYP" />
        <div className="filter-bar--filters-container--1Hjrm">
          <div className="filter-bar--parent-left-options--30uhR">
            <div className="filter-bar--left-options--3Exs7">
              <div className="checkbox">
                <label >
                  <input name="Unread" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">

                    Unread
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label >
                  <input name="Important" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">

                    Important
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label >
                  <input name="Unanswered" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">

                    Not answered
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label >
                  <input name="Show automated messages" type="checkbox" />
                  <span className="toggle-control-label checkbox-label">

                    Show automated messages
                  </span>
                </label>
              </div>
              <span>
                <span className="description-dropdown--description--28pLr">
                  Sort by:
                </span>
                <div className="dropdown btn-group btn-group-quintinary">
                  <button
                    id="sharing-type"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="text-capitalize dropdown-toggle btn btn-quintinary"
                    style={{ paddingRight: "26px" }}
                  >
                    Newest first
                    <span style={{ position: "absolute", right: "12px" }}>
                      <span className="dropdown-caret udi udi-angle-down" />
                    </span>
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="sharing-type"
                  >
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href=""
                      >
                        Newest first
                      </a>
                    </li>
                    <li role="presentation" className="text-capitalize">
                      <a
                        role="menuitem"
                        tabIndex={-1}
                        href=""
                      >
                        Oldest first
                      </a>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
          <div className="filter-bar--right-cta--zHN_E">
            <Link className="messaging--compose-button--1gXGo btn btn-quaternary" to={"/message/compose"}>
              Compose
            </Link>
          </div>
        </div>
        <div className="hidden filter-bar--filters-expanded--2NXv4">
          <div className="checkbox">
            <label >
              <input name="Unread" type="checkbox" />
              <span className="toggle-control-label checkbox-label">

                Unread
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label >
              <input name="Important" type="checkbox" />
              <span className="toggle-control-label checkbox-label">

                Important
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label >
              <input name="Unanswered" type="checkbox" />
              <span className="toggle-control-label checkbox-label">

                Not answered
              </span>
            </label>
          </div>
          <div className="checkbox">
            <label >
              <input name="Show automated messages" type="checkbox" />
              <span className="toggle-control-label checkbox-label">

                Show automated messages
              </span>
            </label>
          </div>
          <span>
            <span className="description-dropdown--description--28pLr">
              Sort by:
            </span>
            <div className="dropdown btn-group btn-group-quintinary">
              <button
                id="sharing-type"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
                className="text-capitalize dropdown-toggle btn btn-quintinary"
                style={{ paddingRight: "26px" }}
              >
                Newest first
                <span style={{ position: "absolute", right: "12px" }}>
                  <span className="dropdown-caret udi udi-angle-down" />
                </span>
              </button>
              <ul
                role="menu"
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="sharing-type"
              >
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    Newest first
                  </a>
                </li>
                <li role="presentation" className="text-capitalize">
                  <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                    Oldest first
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <Inbox threads={messageThreads}/>
    </div>
  );
};

export default AllChats;
