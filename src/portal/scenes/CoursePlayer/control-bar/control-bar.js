import React, { Component } from 'react'

import classNames from 'classnames'
import { connect} from 'react-redux';
import { setActiveMenu } from 'state/player/playerSlice';
import css from './control-bar.module.scss'


import { InteractionModes, Menus } from '../constants'

import { Layout240p } from './layout-240p'
import { Layout360p } from './layout-360p'
import { Layout480p } from './layout-480p'
import { Layout720p } from './layout-720p'

export class ControlBar extends Component {
  constructor(props) {
    super(props)
    this.controlBar = React.createRef()
  }

  get isMenuOpen() {
    return this.props.activeMenu !== Menus.NONE
  }

  get isKeyboardMode() {
    return this.props.interactionMode === InteractionModes.KEYBOARD
  }

  handleAction = () => {
    if (this.isMenuOpen) {
      this.closeMenu()
    }
  }

  handleFocus = e => {
    const isControlBarButton = this.isControlBarButton(e.target)

    if (isControlBarButton && this.isMenuOpen && this.isKeyboardMode) {
      this.closeMenu()
    }
  }

  isControlBarButton(el) {
    return el.getAttribute('is-control-bar-button')
  }

  closeMenu() {
    // this.props.setActiveMenu(Menus.NONE)
  }

  renderLayout(layout) {
    switch (layout) {
      case '120p':
      case '240p':
        return <Layout240p />
      case '360p':
        return <Layout360p />
      case '480p':
        return <Layout480p />
      case '720p':
      case '1080p':
        return <Layout720p />
      default:
        return null
        // return <Layout720p />
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = e => {
    if (this.controlBar && this.controlBar.current.contains(e.target)) {
      return
    }
    this.closeMenu()
  }

  render() {
    const { activeMenu, layout = '720p', visible, volumeSliderActive } = this.props
    
    return (
      <div
        className={classNames(css.controlBar, {
          [css.hidden]: !visible,
          [css.volumeSliderActive]: volumeSliderActive,
        })}
        onTouchStart={this.handleAction}
        onClick={this.handleAction}
        onFocus={this.handleFocus}
        layout={layout}
        ref={this.controlBar}
      >
        <div className={css.layout}>{this.renderLayout(layout)}</div>
      </div>
    )
  }
}


export default connect(
  state => ({
    activeMenu: state.player.activeMenu,
    interactionMode: state.player.interactionMode,
    layout: state.player.layout,
    visible: state.player.visible,
    volumeSliderActive: state.player.volumeSliderActive,
  }),
  dispatch => ({
    setActiveMenu: payload => dispatch(setActiveMenu(payload)),
  })
)(ControlBar)
