import React, { Component } from 'react'

import classnames from 'classnames'
import {connect} from 'react-redux';
import { InteractionModes, Menus } from '../constants';
import { setActiveMenu, play, pause } from 'state/player/playerSlice';
import css from './command-layer.module.css'

export class CommandLayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientY: null,
    }
  }

  handleTouchStart(e) {
    e && e.preventDefault()

    const touch = e && e.touches[0]
    touch && this.setState({ clientY: touch.clientY })
  }

  handleTouchEnd(e) {
    const newTouch = e && e.changedTouches[0]
    const offset = newTouch && Math.abs(this.state.clientY - newTouch.clientY)
    const minimumScrollDistance = 50

    if (!offset || offset < minimumScrollDistance) this.handleClick()
    e && e.preventDefault()
  }

  handleClick = e => {
    const { activeMenu, pause, play, playing, visible, setActiveMenu } = this.props

    if (activeMenu !== Menus.NONE) {
      setActiveMenu(Menus.NONE)
    }

    if (visible) {
      playing ? pause(true) : play(true)
    }
  }

  render() {
    return (
      <div
        className={css.commandLayer}
        onClick={this.handleClick}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}
        ref={ref => (this.ref = ref)}
      />
    )
  }
}



export default connect(
  state => ({
    activeMenu: state.player.activeMenu,
    playing: state.player.playing,
    visible: state.player.visible,
  }),
  dispatch => ({
    pause: (payload) => dispatch(pause(payload)),
    play: (payload) => dispatch(play(payload)),
    setActiveMenu: (payload) => dispatch(setActiveMenu(payload)),
   
  })
)(CommandLayer)
