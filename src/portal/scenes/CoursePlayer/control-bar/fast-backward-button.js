import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { seekEnd, seekStart, fastRewind } from 'state/player/playerSlice'
// import * as actions from '../../actions'
import css from './control-bar.module.scss'
import icons from '../icons'
import ControlBarButton from './control-bar-button/control-bar-button'
import Tooltip from '../tooltip/tooltip'

export class FastBackwardButton extends Component {
  render() {
    const { Rewind10SecondsIcon } = icons
    const { fastRewind, onSeekStart, onSeekEnd } = this.props

    const handler = () => {
      onSeekStart && onSeekStart()
      fastRewind && fastRewind()

      onSeekEnd && onSeekEnd()
    }

    return (
      <Tooltip text="Back 10 seconds (←)">
        <ControlBarButton onAction={handler}>
          <Rewind10SecondsIcon />
        </ControlBarButton>
      </Tooltip>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    fastRewind: payload => dispatch(fastRewind(payload)),
    onSeekStart: payload => dispatch(seekStart(payload)),
    onSeekEnd: payload => dispatch(seekEnd(payload)),
   
  })
)(FastBackwardButton)
