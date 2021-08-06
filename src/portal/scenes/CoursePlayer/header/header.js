import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { FullscreenState } from '../constants'
import css from './header.module.css'


export function Header({ title = 'Build & Manage Stuff', subtitle, visible, fullscreenState }) {
  const isFullScreen = fullscreenState === FullscreenState.FULLSCREEN
  const showHeader = isFullScreen && (title || subtitle)

  return showHeader ? (
    <div className={classNames(css.wrapper, { [css.hidden]: !visible })}>
      <div className={css.titles}>
        <h2 className={css.title}>{title}</h2>
        <h4 className={css.subtitle}>{subtitle}</h4>
      </div>
    </div>
  ) : null
}

export default connect(
  state => ({
    title: state.title,
    subtitle: state.subtitle,
    visible: state.player.visible,
    fullscreenState: state.player.fullscreenState,
  }),
 null
)(Header)
