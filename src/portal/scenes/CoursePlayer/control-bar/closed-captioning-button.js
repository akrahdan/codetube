import React, { Component, Fragment } from 'react'
// import { connect } from 'unistore/react'
// import * as actions from '../../actions'

import ControlBarButton from './control-bar-button/control-bar-button'
import css from './control-bar.module.scss'
import buttonCss from './playback-speed-button.module.scss'
import icons from '../icons'
import Tooltip from '../tooltip/tooltip'

export class ClosedCaptioningButton extends Component {
  render() {
    const {
      activeClassName,
      closedCaptioningEnabled,
      versionId,
      activeMenu,
      boundedContext,
      menuType,
      toggleClosedCaptioning,
    } = this.props

    const { ClosedCaptioningIcon, ClosedCaptioningOnIcon } = icons

    const isActive = activeMenu === menuType
    if (!versionId || boundedContext !== 'course') return null //webvtt service requires versionId

    return (
      <Tooltip text="Closed captions (c)">
        <ControlBarButton
          active={isActive}
          activeClassName={activeClassName}
          className={buttonCss}
          onAction={toggleClosedCaptioning}
          tooltip="Closed captioning"
          ariaLabel="closed captions"
          ariaPressed={closedCaptioningEnabled}
        >
          {closedCaptioningEnabled ? <ClosedCaptioningOnIcon /> : <ClosedCaptioningIcon />}
        </ControlBarButton>
      </Tooltip>
    )
  }
}
export default ClosedCaptioningButton;
// export default connect(
//   (state) => ({
//     layout: state.layout,
//     closedCaptioningEnabled: state.closedCaptioningEnabled,
//     activeMenu: state.activeMenu,
//     versionId: state.versionId,
//     boundedContext: state.boundedContext,
//   }),
//   (store) => ({
//     toggleClosedCaptioning: actions.toggleClosedCaptioning,
//   })
// )(ClosedCaptioningButton)
