import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVolume, toggleMute } from 'state/player/playerSlice'
// import * as actions from '../../actions'
import css from './control-bar.module.scss'
import icons from '../icons'
import ControlBarButton from './control-bar-button/control-bar-button'

export class VolumeButton extends Component {
  renderIcon() {
    const { VolumeHighIcon, VolumeMediumIcon, VolumeLowIcon, VolumeOffIcon } = icons
    const { className, muted, volume } = this.props

    if (muted) {
      return <VolumeOffIcon className={css.volumeOff} />
    }

    if (volume > 0 && volume <= 0.33) return <VolumeLowIcon className={className} />
    if (volume > 0.33 && volume <= 0.66) return <VolumeMediumIcon className={className} />
    if (volume > 0.66 && volume <= 1) return <VolumeHighIcon className={className} />
  }

  render() {
    const { muted } = this.props

    const callback = () => {
      this.props.toggleMute()
    }

    return <ControlBarButton onAction={callback}>{this.renderIcon()}</ControlBarButton>
  }
}

export default connect(
  state => ({ volume: state.player.volume, muted: state.player.muted }),
  dispatch => ({ toggleMute: () => dispatch(toggleMute()) })
)(VolumeButton)
