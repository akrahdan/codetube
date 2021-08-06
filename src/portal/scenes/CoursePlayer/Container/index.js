import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactResizeDetector, { withResizeDetector} from 'react-resize-detector'
import css from './container.module.css'
import { setContainerSize as setContainer } from 'state/player/playerSlice'
import { isIE } from '../utilities/is-ie';
import { FullscreenState } from '../constants'
import { setFullscreen, isFullscreen, collapseFullscreen } from '../fullscreen-helper'

const resize = container => (width, height) => {
  
  const {
    props: { setContainerSize },
  } = container
  setContainerSize({ width, height })
}

export class Container extends Component {
  constructor(props) {
    super(props)

    this.resize = resize(this)
  }
  
  resizeContainer = (width, height) => {
    this.props.setContainerSize({width, height})
  }
  updateFullscreenState(fullscreenState) {
    const container = this.content
    const videoElement = document.getElementById('video-element')

    if (fullscreenState === FullscreenState.FULLSCREEN && !isFullscreen()) {
      setFullscreen(container, videoElement)
    } else {
      collapseFullscreen(videoElement)
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentFullscreenState = this.props.fullscreenState
    const nextFullscreenState = nextProps.fullscreenState

    if (currentFullscreenState === nextFullscreenState) {
      return
    }

    this.updateFullscreenState(nextFullscreenState)

    return nextProps
  }

  render() {
    let { containerSize, interactionMode, playerSize, refreshRate, fullscreenState } = this.props
    
    return [
      <ReactResizeDetector
        key={'resize detector'}
        handleWidth
        handleHeight
        onResize={this.resize}
        refreshMode="throttle"
        refreshRate={refreshRate || 15}
      />,
      <div
        key="container"
        className={css.container}
        style={fullscreenState === FullscreenState.FULLSCREEN ? { ...containerSize } : {}}
        ref={el => (this.element = el)}
        interaction-mode={interactionMode}
        is-ie={`${isIE()}`}
      >
        <div className={css.content} style={fullscreenState === FullscreenState.NORMAL ? { ...playerSize } : { width: '100%', height: '100%' }} ref={el => (this.content = el)}>
          {this.props.children}
        </div>
      </div>,
    ]
  }
}

export default  connect(
  state => ({
    containerSize: state.player.containerSize,
    breakpoint: state.player.breakpoint,
    interactionMode: state.player.interactionMode,
    playerSize: state.player.playerSize,
    fullscreenState: state.player.fullscreenState,
  }),
  dispatch => ({
    setContainerSize: (size) => dispatch(setContainer(size)),
  })
)(Container)