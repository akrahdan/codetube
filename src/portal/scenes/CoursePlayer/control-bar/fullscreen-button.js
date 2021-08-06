import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// import * as actions from '../../actions'
import css from './control-bar.module.scss'
import { toggleFullscreen } from 'state/player/playerSlice'
import icons from '../icons'
import { FullscreenState } from '../constants'
import ControlBarButton from './control-bar-button/control-bar-button'
import Tooltip from '../tooltip/tooltip'

export class FullscreenButton extends Component {
  render() {
    const { FullscreenIcon, FullscreenExitIcon } = icons
    const { fullscreenState, toggleFullscreen } = this.props

    const button =
      fullscreenState === FullscreenState.NORMAL ? (
        <FullscreenIcon className={classNames(css.fullscreen)} />
      ) : (
        <FullscreenExitIcon className={classNames(css.fullscreenexit)} />
      )

    return (
      <Tooltip text="Fullscreen (f)" isFarRight>
        <ControlBarButton onAction={toggleFullscreen}>{button}</ControlBarButton>
      </Tooltip>
    )
  }
}

export default connect(
  state => ({ fullscreenState: state.player.fullscreenState }),
  dispatch => ({ toggleFullscreen: () => dispatch(toggleFullscreen())})
)(FullscreenButton)
