import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setActiveMenu } from 'state/player/playerSlice'
import SettingsMenu from '../settings-menu/settings-menu'
import ControlBarButton from './control-bar-button/control-bar-button'
import { Menus } from '../constants'
import Tooltip from '../tooltip/tooltip'
import icons from '../icons'
const { SettingsIcon } = icons



export class SettingsButton extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  toggleMenu = (e) => {
    const { activeMenu, setActiveMenu } = this.props
    activeMenu === Menus.SETTINGS
      ? setActiveMenu && setActiveMenu(Menus.NONE)
      : setActiveMenu && setActiveMenu(Menus.SETTINGS)
  }

  render() {
    const { activeMenu } = this.props
    console.log("ActiveMenu:", activeMenu)
    return (
      <div ref={this.element} onClick={(e) => e.stopPropagation()} onTouchStart={this.cancelAction}>
        <SettingsMenu isActive={activeMenu === Menus.SETTINGS} />
        <Tooltip text="Settings" isDisabled={activeMenu === Menus.SETTINGS}>
          <ControlBarButton
            active={activeMenu === Menus.SETTINGS}
            onAction={this.toggleMenu}
            ariaHaspopup="true"
            ariaOwns="eplayer-settings-menu-flyout"
            ariaExpanded={activeMenu === Menus.SETTINGS}
          >
            <SettingsIcon />
          </ControlBarButton>
        </Tooltip>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    activeMenu: state.player.activeMenu,
  }),
  (dispatch) => ({
    setActiveMenu: payload => dispatch(setActiveMenu(payload)),
  })
)(SettingsButton)
