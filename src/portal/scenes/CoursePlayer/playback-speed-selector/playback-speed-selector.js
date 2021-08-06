import classNames from 'classnames'
import React, { Component, createRef } from 'react'
// import { connect } from 'unistore/react';
import { connect} from 'react-redux';
import { setPlaybackSpeed, setActiveMenu } from 'state/player/playerSlice';

// import * as actions from '../../actions'
import css from './playback-speed-selector.module.scss'

import { InteractionModes, Menus, PlaybackSpeedStops as stops } from '../constants'
import { valuesIn } from 'lodash';

export class PlaybackSpeedSelector extends Component {
  constructor(props) {
    super(props)

    this.state = { localPlaybackSpeed: props.playbackSpeed || 1 }
    this.menuRef = createRef()
    this.trapTabs = this.trapTabs.bind(this)
    this.stopRefs = {}
    stops.forEach((stop, i) => {
      this.stopRefs[stop] = {
        ref: createRef(),
        index: i,
        speed: stop,
      }
    })
  }

  get isKeyboardMode() {
    return this.props.interactionMode === InteractionModes.KEYBOARD
  }

  trapTabs(e) {
    if (e.which === 27) this.closeMenu()
    if (e.which === 9) {
      const currentFocus = document.activeElement
      const focusableChildren = Array.from(
        this.menuRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), object, embed, *[tabindex], *[contenteditable]'
        )
      )
      const focusableCount = focusableChildren.length

      const focusedIndex = focusableChildren.indexOf(currentFocus)
      if (e.shiftKey) {
        if (focusedIndex === 0) {
          e.preventDefault()
          focusableChildren[focusableCount - 1].focus()
        }
      } else {
        if (focusedIndex === focusableCount - 1) {
          e.preventDefault()
          focusableChildren[0].focus()
        }
      }
    }
  }

  componentDidUpdate({ activeMenu: prevActiveMenu }) {
    const { playbackSpeed, activeMenu } = this.props

    const menuChanged = activeMenu !== prevActiveMenu
    const playbackSpeedMenuOpened = menuChanged && activeMenu === Menus.PLAYBACK_SPEED

    if (playbackSpeedMenuOpened) {
      this.focusOnButtonByPlaybackSpeed(playbackSpeed)
    }
  }

  focusOnButtonByPlaybackSpeed(playbackSpeed) {
    const button = this.container.querySelector(`[speed="${playbackSpeed}"] button`)
    button && button.focus()
  }

  setLocalPlaybackSpeed = (i) => {
    return () => this.setState({ localPlaybackSpeed: i })
  }

  handleKeyDown = (e) => {
    const { keyCode } = e
    const currentSpeed = this.state.localPlaybackSpeed

    // Right
    if (keyCode === 39) {
      e.preventDefault && e.preventDefault()
      const currentIndex = this.stopRefs[currentSpeed].index
      const nextStopIndex = currentIndex < stops.length - 1 ? currentIndex + 1 : 0
      const nextStop = stops[nextStopIndex]
      const nextStopRef = this.stopRefs[nextStop]
      nextStopRef.ref.current.focus()
      this.setPlaybackSpeed(nextStopRef.speed)
    }

    // Left
    if (keyCode === 37) {
      e.preventDefault && e.preventDefault()
      const currentIndex = this.stopRefs[currentSpeed].index
      const prevStopIndex = currentIndex > 0 ? currentIndex - 1 : stops.length - 1
      const prevStop = stops[prevStopIndex]
      const prevStopRef = this.stopRefs[prevStop]
      prevStopRef.ref.current.focus()
      this.setPlaybackSpeed(prevStopRef.speed)
    }
  }

  setPlaybackSpeed = (i, onSpeedChanged) => {
    return () => {
      this.setState({ localPlaybackSpeed: i })
      this.props.setPlaybackSpeed(i)
      onSpeedChanged && onSpeedChanged()
    }
  }

  closeMenu = () => {
    if (this.isKeyboardMode) {
      this.props.setActiveMenu(Menus.NONE)
      this.focusPreviousButton()
    }
  }

  focusPreviousButton() {
    const prevSibling = this.container.previousElementSibling
    const button = prevSibling && prevSibling.querySelector('button')

    button && button.focus()
  }

  render() {
    const { activeMenu, className, setActiveMenu } = this.props
    const { localPlaybackSpeed } = this.state

    return (
      <div
        id="eplayer-speed-selector"
        className={classNames(css.container, className, {
          [css.hidden]: activeMenu !== Menus.PLAYBACK_SPEED,
        })}
        aria-hidden={activeMenu !== Menus.PLAYBACK_SPEED}
        ref={(ref) => (this.container = ref)}
      >
        <div className={css.title} aria-label={`current speed: ${localPlaybackSpeed}`}>
          <div className={css['title__content']} data-widest="Speed: 2.0x">
            Speed: {localPlaybackSpeed.toFixed(1)}x
          </div>
        </div>
        <div
          ref={this.menuRef}
          tabIndex="-1"
          onKeyDown={(e) => {
            this.trapTabs(e)
            this.handleKeyDown(e)
          }}
        >
          <ol className={css.slider} onClick={this.handleChange} aria-label="set playback speed">
            {this.getSliderItems(localPlaybackSpeed)}
          </ol>
        </div>
      </div>
    )
  }

  getSliderItems = (playbackSpeed) => {
    return stops.reduce((items, i) => {
      let className = css.equalTo
      if (i < playbackSpeed) {
        className = css.lessThan
      } else if (i > playbackSpeed) {
        className = css.greaterThan
      }

      return items.concat(
        <li
          className={className}
          key={i}
          speed={i}
          onMouseOver={this.setLocalPlaybackSpeed(i)}
          onFocus={this.setLocalPlaybackSpeed(i)}
          onClick={this.setPlaybackSpeed(i, this.closeMenu)}
          onTouchStart={this.setPlaybackSpeed(i, this.closeMenu)}
        >
          <button
            type="button"
            className={css.button}
            aria-label={`${i}`}
            tabIndex="0"
            id={`playback-speed-option-${i}`}
            ref={this.stopRefs[i].ref}
          >
            speed {i}x
          </button>
        </li>
      )
    }, [])
  }
}

export default connect(
  (state) => ({
    playbackSpeed: state.player.playbackSpeed,
    activeMenu: state.player.activeMenu,
  }),
  (dispatch) => ({
    setPlaybackSpeed: payload => dispatch(setPlaybackSpeed(payload)),
    setActiveMenu: payload => dispatch(setActiveMenu(payload)),
  })
)(PlaybackSpeedSelector);
// export default connect(
//   (state) => ({
//     interactionMode: state.interactionMode,
//     activeMenu: state.activeMenu,
//     playbackSpeed: state.playbackSpeed,
//   }),
//   (store) => ({
//     setActiveMenu: actions.setActiveMenu,
//     setPlaybackSpeed: actions.setPlaybackSpeed,
//   })
// )(PlaybackSpeedSelector)
