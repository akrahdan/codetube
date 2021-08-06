import React, { useState } from 'react'
import classNames from 'classnames'
// import { connect } from 'unistore/react'

// import * as actions from '../../actions'
import css from './layered-menu.module.scss'
import { Menus } from '../constants'

const LayeredMenuSubmenu = props => {
  const { id, isActive, ariaLabel } = props

  return (
    <div
      id={id}
      className={classNames(css['layered-menu-submenu'], { [css['layered-menu-submenu--is-active']]: isActive })}
      aria-label={ariaLabel}
    >
      {props.children}
    </div>
  )
}

export default LayeredMenuSubmenu
