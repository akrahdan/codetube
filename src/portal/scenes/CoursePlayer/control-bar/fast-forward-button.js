import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { seekEnd, seekStart, fastForward } from 'state/player/playerSlice';
// import * as actions from '../../actions'
import css from './control-bar.module.scss'
import icons from '../icons'
import ControlBarButton from './control-bar-button/control-bar-button'
import Tooltip from '../tooltip/tooltip'

export class FastForwardButton extends Component {
  render() {
    const { Forward10SecondsIcon } = icons
    const { fastForward, onSeekStart, onSeekEnd } = this.props

    const handler = () => {
      onSeekStart && onSeekStart()
      fastForward && fastForward()

      onSeekEnd && onSeekEnd()
    }

    return (
      <Tooltip text="Forward 10 seconds (→)">
        <ControlBarButton onAction={handler}>
          <Forward10SecondsIcon />
        </ControlBarButton>
      </Tooltip>
    )
  }
}


export default connect(
  state => {},
  dispatch => ({
    fastForward: payload => dispatch(fastForward(payload)),
    onSeekStart: payload => dispatch(seekStart(payload)),
    onSeekEnd: payload => dispatch(seekEnd(payload)),
  })
)(FastForwardButton)
