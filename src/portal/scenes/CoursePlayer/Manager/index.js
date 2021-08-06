import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { isFullscreen } from '../fullscreen-helper'
import { FullscreenState, InteractionModes, TOUCH_TIMEOUT_DURATION, MOUSE_TIMEOUT_DURATION } from '../constants'
import { hideUI, showUI, setInteractionMode, setFullscreen } from 'state/player/playerSlice'
import { initMousetrap, resetMoustrap } from '../keyboard/shortcut-keys'
import { registerDefaultShortcuts } from '../keyboard/register-shortcuts'

import css from './styles.module.css'

export class Manager extends Component {
  constructor(props) {
    super(props)
    this.mainRef = React.createRef()
  }

  componentDidMount() {
    const { keyboardShortcutsEnabled } = this.props
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange)
    initMousetrap(this.mainRef.current)
    if (keyboardShortcutsEnabled !== false) registerDefaultShortcuts(this.props, this.handleGetClip)
    this.updateMediaUI()
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange)
    resetMoustrap()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyboardShortcutsEnabled === nextProps.keyboardShortcutsEnabled) return
    if (nextProps.keyboardShortcutsEnabled !== false) registerDefaultShortcuts(this.props, this.handleGetClip)
    if (nextProps.keyboardShortcutsEnabled == false) resetMoustrap()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title || prevProps.playing !== this.props.playing) this.updateMediaUI()
  }

  updateMediaUI = () => {
    if (!navigator || !navigator.mediaSession) return
    const { title, playing } = this.props
    navigator.mediaSession.playbackState = playing ? 'playing' : 'paused'
    navigator.mediaSession.metadata = new window.MediaMetadata({ title })
  }

  handleGetClip = () => ({ clipId: this.props.clipId || null })

  handleFullscreenChange = () => {
    const { setFullscreen } = this.props

    const fullscreenState = isFullscreen() ? FullscreenState.FULLSCREEN : FullscreenState.NORMAL

    setFullscreen && setFullscreen(fullscreenState)
  }

  handleMouseMove = (e) => {
    const { setInteractionMode } = this.props

    setInteractionMode(InteractionModes.MOUSE)

    this.showUI()

    this.hideUITimeout && clearTimeout(this.hideUITimeout)

    this.hideUITimeout = setTimeout(this.hideUI, MOUSE_TIMEOUT_DURATION)
  }

  handleMouseEnter = (e) => {
    const { setInteractionMode } = this.props

    setInteractionMode(InteractionModes.MOUSE)

    this.showUI()
  }

  handleMouseDown = (e) => {
    const { activeMenu, setInteractionMode } = this.props

    setInteractionMode(InteractionModes.MOUSE)

    this.showUI()
  }

  handleTouchStart = (e) => {
    const { activeMenu, setInteractionMode } = this.props

    this.cancelEvent(e)

    setInteractionMode(InteractionModes.TOUCH)

    this.showUI()

    this.hideUITimeout && clearTimeout(this.hideUITimeout)

    this.hideUITimeout = setTimeout(this.hideUI, TOUCH_TIMEOUT_DURATION)
  }

  handleKeyUp = (e) => {
    const { setInteractionMode } = this.props

    setInteractionMode(InteractionModes.KEYBOARD)
  }

  cancelEvent = (e) => {
    e && e.preventDefault()
  }

  showUI = () => {
    const { showUI } = this.props

    showUI && showUI()
  }

  hideUI = () => {
    const { hideUI, activeMenu } = this.props

    if (!activeMenu) {
      hideUI && hideUI()
    }
  }

  handleBlur = (e) => {
    const { interactionMode } = this.props

    const target = e.relatedTarget || document.activeElement

    if (interactionMode === InteractionModes.KEYBOARD && !this.mainRef.current.contains(target)) {
      this.hideUI()
    }
  }

  render() {
    const { children, visible } = this.props

    return (
      <div
        tabIndex="-1"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.hideUI}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchEnd={this.cancelEvent}
        onTouchStart={this.handleTouchStart}
        onFocus={this.showUI}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        className={classnames(css.manager, { [css.hidden]: !visible })}
        ref={this.mainRef}
      >
        {children}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    clipId: state.clipId,
    title: state.title,
    playing: state.player.playing,
    activeMenu: state.player.activeMenu,
    interactionMode: state.player.interactionMode,
    visible: state.player.visible,
    registeredShortcuts: state.registeredShortcuts,
    hiddenButtons: state.hiddenButtons,
    keyboardShortcutsEnabled: state.keyboardShortcutsEnabled,
  }),
  dispatch => ({
    hideUI: () => dispatch(hideUI()),
    showUI: () => dispatch(showUI()),
    setInteractionMode: (payload) => dispatch(setInteractionMode(payload)),
    setFullscreen: (payload) => dispatch(setFullscreen(payload)),
  })
)(Manager)
