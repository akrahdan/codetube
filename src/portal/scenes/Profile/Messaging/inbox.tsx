import React, { useEffect, useState, KeyboardEvent, useRef } from "react";
import Link from 'redux-first-router-link';
import { useAppSelector } from "store/hooks";
import { selectLocationPayload } from "state/location/selectors";
import { MessageThread, useFetchThreadDetailQuery } from "services/messaging";
import { MessageListItem } from "./messageListItem";
import classNames from "classnames";
import { MessageDetail } from './MessageDetail'
import { useAuth } from 'store/useAuth';

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftHandleValue,
  convertToRaw,
} from "draft-js";
import "./chats.scss";
import "draft-js/dist/Draft.css";
import "./inboxEditor.scss";

type InboxProps = {
  threads: MessageThread[]
}


export const Inbox: React.FC<InboxProps> = ({ threads }) => {
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: threadQuery } = useFetchThreadDetailQuery(locationPayload.id)
  const [threadMessage, setThreadMessage] = useState<MessageThread>(threadQuery)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [focus, setFocus] = useState(false);
  const { user } = useAuth();
  const ref = useRef(null)

  useEffect(() => {
    setThreadMessage(threadQuery)
  }, [threadQuery])

  useEffect(() => {
   const handleClickOutside = event => {
     if(ref?.current && !ref?.current?.contains(event.target)) {
       setFocus(false)
     }
 
   }
   document.addEventListener('click', handleClickOutside)
   return () => {
     document.removeEventListener('click', handleClickOutside)
   }
  }, [ref])

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };
  const mapKeyToEditorCommand = (e: KeyboardEvent<{}>) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }


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
            <div className="message-thread-list--thread-list__thread-container---OahW">
              {threads?.map(thread => <MessageListItem key={thread?.id} thread={thread} handleThread={setThreadMessage} />)}
            </div>


            {!threads?.length && <div className="message-thread-list--empty-state--37VY0">
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
            </div>}
          </div>
        </div>
        <div className="two-pane--container__right-pane--2xMVx">
          <div
            className="fx-dc h100p message-thread-detail--container--3jDDz"
            tabIndex={0}
            role="button"
          >
            <div className="fx-lc message-thread-detail--thread-header--2p-YK">
              <Link
                className="message-thread-detail--show-in-single-pane--2Se2V"
                to="/instructor/communication/messages/100956182/"
              >
                Back
              </Link>
              <div className="fx-dc fx">
                <div className="fx text-truncate ellipsis p-space-xs">
                  Conversation with {(threadMessage?.first?.pk !== user?.pk) ? threadMessage?.first?.username : threadMessage?.second?.username}
                </div>
                <div className="thread-header__dropdown" />
              </div>
              <div className="message-thread-detail--thread-header__action-button--2HYG_">
                <div className="dropdown dropdown--open-on-hover dropdown--desktop btn-group btn-group-link">
                  <button
                    aria-label="Conversation actions"
                    id="dropdown-thread-actions--18"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    type="button"
                    className="actions-dropdown--options-dropdown--zpA1U dropdown-toggle btn btn-link"
                  >
                    <span className="cfi cfi-ellipsis-v" />
                  </button>
                  <ul
                    role="menu"
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdown-thread-actions--18"
                  >
                    <li role="presentation" >
                      <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                        <span>Mark as unread</span>
                      </a>
                    </li>
                    <li role="presentation" >
                      <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                        <span>Mark as important</span>
                      </a>
                    </li>
                    <li role="presentation" >
                      <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                        <span>Block</span>
                      </a>
                    </li>
                    <li role="presentation" >
                      <a role="menuitem" tabIndex={-1} href="javascript:void(0)">
                        <span>Archive</span>
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        className="dropdown-menu-link"
                        role="menuitem"
                        tabIndex={-1}
                        aria-label="Report abuse"
                        href="javascript:void(0)"
                      >
                        {" "}
                        Report abuse
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="fx preserve-scroll--content--3nogq">
              <div className="fx message-thread-detail--messages--Htree">
                {threadMessage?.messages?.map(mess => <MessageDetail key={mess.id} message={mess} />)}
              </div>

            </div>
            <div className={classNames("reply-form--reply-form--GZtNK", {
              "reply-form--reply-form--content--1eWln": focus
            })}>

              <form >
                <label className="sr-only">Message:</label>
                <div className="fs-exclude form-group">
                  <div className="reply-styling"  ref={ref} onFocus={() => setFocus(true)}>
                    <Editor
                      blockStyleFn={getBlockStyle}
                      
                      customStyleMap={styleMap}
                      editorState={editorState}
                      handleKeyCommand={handleKeyCommand}
                      keyBindingFn={(event) => mapKeyToEditorCommand(event)}
                      onChange={setEditorState}
                      placeholder="Type a  message..."
                      spellCheck={true}
                    />


                    <div
                      className="rt-menu-bar-container"

                    >
                      <div className="rt-menu-bar fx-lt" >
                        <InlineStyleControls
                          editorState={editorState}
                          onToggle={toggleInlineStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reply-form--button-group--FPLMn">
                  <button
                    type="submit"
                    data-purpose="submit-reply-form-btn"
                    disabled
                    className="text-capitalize btn btn-sm btn-primary"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
type StyleButtonProps = {
  onToggle: (style: string) => void,
  style: string,
  active: boolean,
  label: string,
  className: string,
};
const StyleButton: React.FC<StyleButtonProps> = ({
  onToggle,
  style,
  active,
  label,
  className,
}) => {
  return (
    <>
      <button
        title={label}
        onMouseDown={(event) => {
          event.preventDefault();
          onToggle(style);
        }}
        type="button"
        className={classNames("btn btn-link", {
          active: active,
        })}
      >
        <span className={className} />
      </button>
    </>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD", className: "cfi cfi-bold" },
  { label: "Italic", style: "ITALIC", className: "cfi cfi-italic" },
  { label: "Monospace", style: "CODE", className: "cfi cfi-curly-braces" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      <div className="btn-group">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            className={type.className}
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    </div>
  );
}