import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux';



import { formatTime } from '../utilities/format-time'
import css from './control-bar.module.scss'

export class TimeDisplay extends Component {
  render() {
    const { duration, time } = this.props
    const numerator = formatTime(time)
    const [numeratorMinutes, numeratorSeconds] = numerator.split(':')
    const denominator = formatTime(duration)
    const [denominatorMinutes, denominatorSeconds] = denominator.split(':')

    return (
      <span
        className={css.controlBarText}
        aria-label={`${numeratorMinutes} minutes and ${numeratorSeconds} of ${denominatorMinutes} minutes and ${denominatorSeconds} seconds`}
      >
        <strong>{numerator}</strong>
        <span style={{ fontWeight: '200' }}> / {denominator}</span>
      </span>
    )
  }
}

export default connect(
  state => ({
    duration: state.player.duration,
    time: state.player.time,
  }),
  null
)(TimeDisplay)
