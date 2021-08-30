import { Component, useEffect, useState, KeyboardEvent } from "react";
import Link from "redux-first-router-link";
import { stateToHTML } from "draft-js-export-html";
import Autosuggest from "react-autosuggest";
import { defaultTheme } from "react-autosuggest/dist/theme";
import algoliasearch from "algoliasearch/lite";
import { MessageThread, useCreateMessageMutation } from "services/messaging";
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
import "./editor.scss";
import classNames from "classnames";


const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);


type Suggestion = {
  first_name: string,
  last_name: string,
  user: string,
  avatar: string,
  id: number
}


export const ComposeMessage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestion, setSuggestion] = useState<Suggestion>()
  const [suggestionValue, setSuggestionValue] = useState("");
  const [ createMessage ] = useCreateMessageMutation()

  const getSuggestions = async (query: string) => {
    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) return [];
    const results = await searchClient
      .initIndex("instructor_index")
      .search(inputValue);
    const suggestions = results.hits.map((hit) => {
      return hit;
    });

    const courseSuggestions = [...suggestions];
    return courseSuggestions;
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div className="df">
        <div className="autosuggest--image-container--5Ocvs">
          <img
            alt={suggestion?.user}
            aria-label={suggestion?.user}
            className="user-avatar user-avatar--image"

            height={24}
            width={24}
            src={suggestion?.avatar}
          />
        </div>
        <div className="autosuggest--user-info-container--1U4O7">
          <div
            className="autosuggest--user-name--ll2kZ"

          >
            {`${suggestion?.first_name} ${suggestion?.last_name}`}
          </div>
        </div>
      </div>
    );
  };

  const theme = {
    ...defaultTheme,
    container: "autosuggest--container--1d8Hx",
    itemsContainer: "autosuggest--suggestionsContainer--1KTdR",
    containerOpen: "autosuggest--containerOpen--2m7Zl",
    item: "autosuggest-theme--suggestion--Ut3Fu",
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then((results) => {
      const fetchedResults = results.map(res => {
        const item = {
          first_name: res['first_name'],
          last_name: res['last_name'],
          avatar: res['avatar'],
          user: res['user'],
          id: res['id'],
        }
        return item
      })

      setSuggestions(fetchedResults)
    });
  };
  const handleSuggestionChange = (event, { newValue, method }) => {
    setSuggestionValue(newValue);
  };

  const suggestInputProps = {
    placeholder: "Type instructor's name",
    value: suggestionValue,
    className: "form-control",
    onChange: handleSuggestionChange,
  };

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
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div>
        <Link to={"/messages"} className="pull-right btn btn-quaternary">
          Cancel
        </Link>
        <h1 className="udlite-heading-serif-xxl messaging--header--10SGL">
          new message
        </h1>
        <div>
          <div className="new-thread-route--message-thread__create--H4smB">
            <div className="fx-lc">
              <span className="mr20">To:</span>
              <div className="fx">
                <Autosuggest
                  suggestions={suggestions}
                  renderSuggestion={renderSuggestion}
                  inputProps={suggestInputProps}
                  theme={theme}
                  onSuggestionSelected={(event, { suggestion }) => {
                    setSuggestion(suggestion)
                  }}
                  onSuggestionsClearRequested={() => {
                    setSuggestions([]);
                  }}
                  getSuggestionValue={(suggestion) => {
                    if (suggestion.isAddNew) return suggestionValue;
                    return `${suggestion?.first_name} ${suggestion?.last_name} `;
                  }}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                />
              </div>
            </div>
            <form className="mt10" onSubmit={event => {
              event.preventDefault();
              if (editorState?.getCurrentContent()?.hasText()) {
                const message = stateToHTML(editorState?.getCurrentContent())
                createMessage({
                  message,
                  username: suggestion.user
                }).then((res: { data: MessageThread[]}) => {
                  if(res?.data) {
                    window.location.replace('/messages')
                  }
                })
              }

            }}>

              <div className="RichEditor-root">
                <InlineStyleControls
                  editorState={editorState}
                  onToggle={toggleInlineStyle}
                />
                <div className={className}>
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
                </div>
              </div>
              <button
                type="submit"

                className={classNames("udlite-btn udlite-btn-medium udlite-btn-primary udlite-heading-sm pull-right", {
                  'udlite-btn-disabled': !editorState?.getCurrentContent()?.hasText()
                })}
                disabled={!editorState?.getCurrentContent()?.hasText()}
                tabIndex={-1}
              >
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessage;

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
};
