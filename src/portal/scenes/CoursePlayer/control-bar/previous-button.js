import React, { Component } from 'react'
import { connect } from 'unistore/react'
import css from './control-bar.module.scss'
import Tooltip from '../tooltip/tooltip'
import ControlBarButton from './control-bar-button/control-bar-button'
import icons from '../icons'
// import * as actions from '../../actions'

export class PreviousButton extends Component {
  render() {
    const { PreviousClipIcon } = icons
    const { hiddenButtons, previousClip, previousCallback = true } = this.props

    return previousCallback ? (
      <Tooltip text="Previous (<)" isFarLeft>
        <ControlBarButton className={css.icon} onAction={previousClip} hidden={hiddenButtons && hiddenButtons.previous}>
          <PreviousClipIcon />
        </ControlBarButton>
      </Tooltip>
    ) : null
  }
}
export default PreviousButton;
// export default connect(
//   state => ({ hiddenButtons: state.hiddenButtons, previousCallback: state.previousCallback }),
//   store => ({
//     previousClip: actions.previousClip,
//   })
// )(PreviousButton)
