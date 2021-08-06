import React, { Component } from 'react'
import { connect } from 'unistore/react'

import ControlBarButton from './control-bar-button/control-bar-button'
import icons from '../icons'
// import * as actions from '../../actions'
import Tooltip from '../tooltip/tooltip'

export class NextButton extends Component {
  render() {
    const { NextClipIcon } = icons

    const { hiddenButtons, nextClip, nextCallback = true } = this.props

    return nextCallback ? (
      <Tooltip text="Next (>)">
        <ControlBarButton onAction={nextClip} hidden={hiddenButtons && hiddenButtons.next}>
          <NextClipIcon />
        </ControlBarButton>
      </Tooltip>
    ) : null
  }
}

export default NextButton;

// export default connect(
//   state => ({ hiddenButtons: state.hiddenButtons, nextCallback: state.nextCallback }),
//   store => ({
//     nextClip: actions.nextClip,
//   })
// )(NextButton)
