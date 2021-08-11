import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { jsx } from 'slate-hyperscript'
import {
  Editor,
  Text,
  Transforms,
  createEditor,
  Descendant,
  Node,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import escapeHtml from 'escape-html'
import { Button, Icon, Toolbar } from './components'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'list-item']

export const RTEditor = ({ handleChange, editorValue }) => {
  const html = editorValue ? new DOMParser().parseFromString(editorValue, 'text/html') : ''
  const initEditValue = html ? deserialize(html.body) : initialValue
  const [value, setValue] = useState<Descendant[]>(initEditValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  
  return (
    <Slate editor={editor} value={value} onChange={value => {
      setValue(value)
      const result = value.map(serialize).join('\n')
      handleChange(result)
    }}>
      <Toolbar className="rt-menu-bar-container">
        <div className="rt-menu-bar fx-lt">
          <div className='btn-group'>
            <MarkButton className="cfi cfi-bold" format="bold" />
            <MarkButton className="cfi cfi-italic" format="italic" />
            <BlockButton format="numbered-list" className="cfi cfi-list-ol" />
            <BlockButton format="bulleted-list" className="cfi cfi-list-ul" />
          </div>
          <div className="fx"></div>
          <div className="btn-group"></div>
        </div>

      </Toolbar>
      <div className="rt-editor rt-editor--empty rt-editor--wysiwyg-mode ">
        <Editable

          className="ProseMirror"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Description goes here"
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </div>

    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}



const Element = ({ attributes, children, element }) => {
  switch (element.type) {

    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>

    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, className }) => {
  const editor = useSlate()
  return (
    <Button
      className='btn btn-link'
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon className={className}></Icon>
    </Button>
  )
}

const MarkButton = ({ format, className }) => {
  const editor = useSlate()
  return (
    <Button
      className="btn btn-link"
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon className={className}></Icon>
    </Button>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: '' },


    ],
  },

]


const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    if (node.italic) {
      string = `<em>${string}</em>`
    }
    return string
  }

  const children = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`

    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}

const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  }

  let children = Array.from(el.childNodes).map(deserialize)

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children)
    case 'BR':
      return '\n'
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'quote' }, children)
    case 'P':
      return jsx('element', { type: 'paragraph' }, children)
    case 'UL':
      return jsx('element', { type: 'bulleted-list' }, children)
    case 'OL':
      return jsx('element', { type: 'numbered-list' }, children)
    case 'LI':
      return jsx('element', { type: 'list-item' }, children)
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children
      )
    default:
      return el.textContent
  }
}

export default RTEditor