import React, { useState } from 'react'
import classNames from 'classnames'

import css from './layered-menu.module.scss'

const LayeredMenuContainer = props => {
  const { height, hidden } = props

  return (
    <div
      className={classNames(css['layered-menu-container'], { [css.hidden]: hidden })}
      style={{
        height: `${height}px`,
      }}
      aria-hidden={hidden}
    >
      {props.children}
    </div>
  )
}

export default LayeredMenuContainer
