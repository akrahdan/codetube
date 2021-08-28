import { Component, useEffect, useState, KeyboardEvent } from "react";
import Link from 'redux-first-router-link'
import { stateToHTML } from 'draft-js-export-html'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, DraftHandleValue, convertToRaw } from 'draft-js';

import 'draft-js/dist/Draft.css';
import "./editor.scss";
import classNames from "classnames";

export const ComposeMessage = ({ sideNavToggle, perfNavToggle }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    sideNavToggle(true)
    perfNavToggle(false)
  })

  const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return "not-handled"
  }
  const mapKeyToEditorCommand = (e: KeyboardEvent<{}>) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
     
    }
    return getDefaultKeyBinding(e)

  }
  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }
  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle
    ));
  }

  let className = 'RichEditor-editor';
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  useEffect(() => {
    console.log(stateToHTML(editorState?.getCurrentContent()))
  }, [editorState])

  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div>
        <Link to={"/instructor/communication/messages"} className="pull-right btn btn-quaternary">
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
                <div className="autosuggest--container--1d8Hx">
                  <input
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-owns="react-autowhatever-1"
                    aria-expanded="false"
                    aria-haspopup="false"
                    data-purpose="autosuggest-input"
                    placeholder="Type a user's name"
                    type="text"
                    className="autosuggest--input--1umnQ form-control"

                  />
                  <div
                    id="react-autowhatever-1"
                    className="autosuggest--suggestionsContainer--1KTdR"
                  />
                </div>
              </div>
            </div>
            <form className="mt10">

              <div className="RichEditor-root">

                <InlineStyleControls
                  editorState={editorState}
                  onToggle={toggleInlineStyle}
                />
                <div className={className} >
                  <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={(event) => mapKeyToEditorCommand(event)}
                    onChange={setEditorState}
                    placeholder="Tell a story..."

                    spellCheck={true}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="udlite-btn udlite-btn-medium udlite-btn-primary udlite-heading-sm udlite-btn-disabled pull-right"
                disabled
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
type StyleButtonProps = {
  onToggle: (style: string) => void,
  style: string,
  active: boolean,
  label: string,
  className: string
}
const StyleButton: React.FC<StyleButtonProps> = ({ onToggle, style, active, label, className }) => {


  return (
    <>
      <button title={label} onMouseDown={(event) => {
        event.preventDefault();
        onToggle(style)
      }} type="button" className={classNames("btn btn-link", {
        'active': active
      })}>
        <span className={className} />
      </button>
    </>
  );

}



var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', className: "cfi cfi-bold" },
  { label: 'Italic', style: 'ITALIC', className: "cfi cfi-italic" },
  { label: 'Monospace', style: 'CODE', className: "cfi cfi-curly-braces" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      <div className="btn-group">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            className={type.className}
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>

    </div>
  );
};

