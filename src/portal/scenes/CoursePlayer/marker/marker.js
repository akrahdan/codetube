import React, { Component } from 'react'
// import { connect } from 'unistore/react'
// import * as actions from '../../actions'
import css from './marker.module.scss'
import classNames from 'classnames'
import { InteractionModes } from '../constants'
// import * as utils from '../utilities';

export class Marker extends Component {
  handleMarkerClick = (e) => {
    const { markers, markerClick, timeIndex } = this.props
    e.preventDefault()
    e.stopPropagation()
    const markerIds = markers.map((m) => m.id)
    markerClick && markerClick(markerIds, timeIndex)
  }

  render() {
    const { markers, leftOffset, isVisible, timeIndex } = this.props

    const isKeyboardMode = this.props.interactionMode === InteractionModes.KEYBOARD
    const pluralizedLabel = markers.length > 1 ? 'notes' : 'note'
    const ariaLabel = `${markers.length} ${pluralizedLabel} at `

    return (
      <button
        type="button"
        className={classNames(css['marker-button'], {
          [css.visible]: isVisible,
          [css['is-keyboard-mode']]: isKeyboardMode,
        })}
        aria-label={ariaLabel}
        onClick={this.handleMarkerClick}
        style={{ left: `${leftOffset}%` }}
      >
        <svg className={css['marker-button__icon']} viewBox="0 0 24 24">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="2" />
            </filter>
          </defs>
          <g style={{ filter: 'url(#shadow)' }}>
            <g>
              <path d="M4.75 20.86h14.5V7.16l-4.03-4.02H4.75v17.72zM16.02 1.53l4.84 4.83v16.1H3.14V1.54h12.88z" />
              <path d="M6.37 4.75h8.04v1.61H6.37v-1.6zm0 3.22h11.27v1.61H6.36v-1.6zm0 3.23h11.27v1.6H6.36v-1.6zm0 3.21h11.27v1.61H6.36v-1.6zm0 3.23h11.27v1.6H6.36v-1.6z" />
            </g>
          </g>
        </svg>
        <span className={css['marker-button__text']}>{markers.length > 1 ? markers.length : ''}</span>
      </button>
    )
  }
}

export default Marker;
