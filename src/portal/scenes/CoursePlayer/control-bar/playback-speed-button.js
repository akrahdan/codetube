import classNames from 'classnames'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setActiveMenu } from 'state/player/playerSlice';

import PlaybackSpeedSelector from '../playback-speed-selector/playback-speed-selector'
import ControlBarButton from './control-bar-button/control-bar-button'
import Tooltip from '../tooltip/tooltip'

import css from './control-bar.module.scss'
import buttonCss from './playback-speed-button.module.scss'

import { Menus } from '../constants'

class Button extends Component {
  render() {
    const { playbackSpeed } = this.props

    return (
      <div className={buttonCss.text}>
        <span className="visually-hidden">playback speed: </span>
        {`${playbackSpeed.toFixed(1)}x`}
       
      </div>
    )
  }
}

const ConnectedButton = connect(
  (state) =>({
    playbackSpeed: state.player.playbackSpeed
  })
)(Button);

export class PlaybackSpeedButton extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  toggleMenu = (e) => {
    const { activeMenu, setActiveMenu } = this.props

    activeMenu === Menus.PLAYBACK_SPEED
      ? setActiveMenu && setActiveMenu(Menus.NONE)
      : setActiveMenu && setActiveMenu(Menus.PLAYBACK_SPEED)
  }

  render() {
    const { layout = '720p', activeMenu } = this.props
    
    return (
      <div ref={this.element} onClick={(e) => e.stopPropagation()} onTouchStart={this.cancelAction}>
        <PlaybackSpeedSelector />
        <Tooltip text="Speed" isDisabled={activeMenu === Menus.PLAYBACK_SPEED}>
          <ControlBarButton
            active={activeMenu === Menus.PLAYBACK_SPEED}
            className={classNames(css.controlBarText, buttonCss.playbackSpeed, buttonCss[`layout${layout}`])}
            onAction={this.toggleMenu}
            ariaHaspopup="true"
            ariaOwns="eplayer-speed-selector"
            ariaExpanded={activeMenu === Menus.PLAYBACK_SPEED}
          >
            <ConnectedButton />
          </ControlBarButton>
        </Tooltip>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    layout: state.player.layout,
    activeMenu: state.player.activeMenu,
  }),
  (dispatch) => ({
    setActiveMenu: payload => dispatch(setActiveMenu(payload)),
  })
)(PlaybackSpeedButton)
