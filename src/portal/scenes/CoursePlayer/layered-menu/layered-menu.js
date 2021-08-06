import React, { useState } from 'react'
import classNames from 'classnames'
import css from './layered-menu.module.scss'

const LayeredMenu = props => {
  const { id, activeSettingsMenu, isUsingKeyboard } = props

  return (
    <div
      id={id}
      className={classNames(css['layered-menu'], {
        [css['layered-menu--shift-left']]: activeSettingsMenu && activeSettingsMenu.level === 1,
        [css['is-using-keyboard']]: isUsingKeyboard,
      })}
    >
      {props.children}
    </div>
  )
}

export default LayeredMenu
