import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clusterMarkers } from '../marker/marker-clustering'
import { play, pause, seekStart, seekEnd, setTime, seek } from 'state/player/playerSlice'
// import * as actions from '../../actions'
import { formatTime } from '../utilities/format-time'
import css from './progress-bar.module.css'
import { InteractionModes } from '../constants'
import Marker from '../marker/marker'

import Slider from '../slider/slider'

export class ProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = { hovering: false, dragging: false, hoveringTime: null }
  }

  get currentPercentage() {
    const { time, duration } = this.props

    if (duration <= 0) return 0

    return time / (duration-1)
  }

  setTime = ratio => {
    const { setTime, duration } = this.props
    setTime && setTime(Math.floor(ratio * duration))
  }

  handleHoverChange = ({ ratio, active }) => {
    const { duration } = this.props
    const { hoveringPercentage } = this.state

    const value = ratio || hoveringPercentage / 100
    const hoveringTime = formatTime(value * duration)

    this.setState({ hoveringPercentage: value * 100, hovering: active, hoveringTime })
  }

  getClustersWithLeftOffset = markers => {
    const { duration, layout } = this.props

    const clusters = clusterMarkers(markers, duration, layout)
    return clusters.map(c => ({
      ...c,
      leftOffset: Math.floor((c.timeIndex / duration) * 100),
    }))
  }

  renderMarkers = (markers, visible) => {
    const clusters = this.getClustersWithLeftOffset(markers)
    return clusters.map(({ timeIndex, markers, leftOffset }) => {
      return (
        <Marker
          timeIndex={timeIndex}
          markers={markers}
          key={markers[0].id}
          leftOffset={leftOffset}
          isVisible={visible}
        />
      )
    })
  }

  render() {
    const {
      isDragging,
      hovering,
      hoveringPercentage,
      hoveringTime,
      percentage,
      dragging,
      startRatio,
      endRatio,
    } = this.state
    const { visible, setTime, duration, bufferedTime, interactionMode, time, seek, markers } = this.props
    const ariaValueText = `${formatTime(time)} of ${formatTime(duration)}`

    const bars = [
      {
        value: 1,
        fillStyle: css.progressBar,
        key: 'background-bar',
      },
      {
        value: duration ? Math.ceil(bufferedTime) / duration : 0,
        fillStyle: css.bufferedTime,
        key: 'buffering-bar',
      },
    ]

    const active = visible && (hovering || dragging)
    const interactiveHovering =
      (interactionMode === InteractionModes.TOUCH || interactionMode === InteractionModes.KEYBOARD) && visible

    return (
      <div className={classNames(css.progressBarWrapper, { [css.hidden]: !visible })}>
        <div
          style={{ left: `${hoveringPercentage}%` }}
          className={classNames(css.timestamp, {
            [css.timestampFadeIn]: active,
          })}
        >
          {hoveringTime}
        </div>
        {markers && this.renderMarkers(markers, visible)}
        <Slider
          ariaLabel="Seek slider"
          ariaValueText={ariaValueText}
          step={getStep(duration, 3)}
          hovering={interactiveHovering}
          verticalAlign={80}
          className={classNames(css.slider, { [css.hiddenSlider]: !visible })}
          value={this.currentPercentage}
          onChange={ratio => {
            this.setTime(ratio)

            this.setState({ endRatio: ratio })
          }}
          onChangeStart={ratio => {
            const { time: currentTime, onSeekStart, pause, playing } = this.props

            this.setTime(ratio)

            onSeekStart && onSeekStart()
            pause && pause(false)

            this.setState({ dragging: true, startRatio: currentTime / duration, endRatio: ratio, playing })
          }}
          onChangeEnd={() => {
            const { onSeekEnd, play } = this.props
            const { startRatio, endRatio, playing } = this.state

            onSeekEnd && onSeekEnd()

            seek && seek({ startRatio, endRatio })
            playing && play(false)

            this.setState({ dragging: false, startRatio: null, endRatio: null })
          }}
          onHoverChange={this.handleHoverChange}
          bars={bars}
          barClass={css.barClass}
          markerClusters={markers && this.getClustersWithLeftOffset(markers)}
        />
      </div>
    )
  }
}

function getStep(duration, seconds) {
  return seconds / duration
}

export default connect(
  state => ({
    bufferedTime: state.player.bufferedTime,
    duration: state.player.duration,
    time: state.player.time,
    visible: state.player.visible,
    interactionMode: state.player.interactionMode,
    markers: state.player.markers,
    clusterInterval: state.player.clusterInterval,
    layout: state.player.layout,
    playing: state.player.playing
  }),
  dispatch => ({
    setTime: payload => dispatch(setTime(payload)),
    seek: payload => dispatch(seek(payload)),
    onSeekStart: payload => dispatch(seekStart(payload)),
    onSeekEnd: payload => dispatch(seekEnd(payload)),
    pause: (payload) => dispatch(pause(payload)),
    play: (payload) => dispatch(play(payload)),
    setTime: payload => dispatch(setTime(payload)),
   
  })
)(ProgressBar)
