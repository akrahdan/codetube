import React, { Component } from 'react'
import { clamp } from '../utilities/clamp'
import classNames from 'classnames';
import css from './slider.module.scss';

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = { hovering: false, dragging: false }
  }

  handleStart = (e) => {
    const { onChangeStart, onChange } = this.props

    e && e.preventDefault && e.preventDefault()

    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('touchmove', this.handleDrag)
    document.addEventListener('mouseup', this.handleEnd)
    document.addEventListener('touchend', this.handleEnd)

    const box = this.slider.getBoundingClientRect()
    const ratio = getRatio(box, e)

    this.setState(
      {
        dragging: true,
        hovering: e && e.type === 'mousedown',
      },
      () => {
        onChangeStart && onChangeStart(ratio)

        this.hoverChange(ratio)
      }
    )
  }

  handleEnd = (e) => {
    const { onChangeEnd } = this.props
    const { hovering } = this.state

    e && e.preventDefault && e.preventDefault()

    const box = this.slider.getBoundingClientRect()
    const ratio = getRatio(box, e)

    this.setState(
      {
        dragging: false,
        hovering: e && e.type === 'touchend' ? false : hovering,
      },
      () => {
        onChangeEnd && onChangeEnd(ratio)

        this.hoverChange(ratio)
      }
    )

    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('touchmove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleEnd)
    document.removeEventListener('touchend', this.handleEnd)
  }

  handleDrag = (e) => {
    e.stopPropagation()

    const { onChange } = this.props

    const box = this.slider.getBoundingClientRect()
    let value = getRatio(box, e)

    onChange && onChange(value)

    this.hoverChange(value)
  }

  onMouseEnter = (e) => {
    this.setState({ hovering: true }, this.hoverChange)
  }

  onMouseLeave = (e) => {
    this.setState({ hovering: false }, this.hoverChange)
  }

  onMouseMove = (e) => {
    const box = this.slider.getBoundingClientRect()
    const value = getRatio(box, e)

    this.hoverChange(value)
  }

  handleKeyDown = (e) => {
    const { keyCode } = e
    const { value, onChange, step: passedStep } = this.props
    const min = 0,
      max = 1,
      step = passedStep || 0.1

    switch (keyCode) {
      case 38: // up
      case 39: // right
        e.preventDefault && e.preventDefault()

        onChange && onChange(clamp(value + step, 0, 1))
        break
      case 37: // left
      case 40: // down
        e.preventDefault && e.preventDefault()

        onChange && onChange(clamp(value - step, 0, 1))
        break
    }
  }

  hoverChange = (ratio) => {
    const { onHoverChange } = this.props
    const { hovering, dragging } = this.state

    onHoverChange &&
      onHoverChange({
        ratio: ratio || null,
        active: hovering || dragging,
      })
  }

  cancelEvent = (e) => {
    e.preventDefault()
  }

  renderBackgroundBars = (active, verticalStyle) => {
    const { bars, barClass } = this.props

    if (!bars)
      return (
        <div
          style={verticalStyle}
          className={classNames(css.bar, barClass, css.backgroundFill, { [css.hovering]: active })}
        />
      )

    return bars.map((bar) => (
      <div
        key={bar.key}
        className={classNames(css.bar, bar.fillStyle, barClass, css.fill, { [css.hovering]: active })}
        style={{ ...{ width: `${clamp(bar.value * 100, 0, 100)}%` }, ...verticalStyle }}
      />
    ))
  }

  renderMarkerTicks = (markerClusters, active, styles) => {
    return markerClusters.map((c) => (
      <span
        className={classNames(css['marker-tick'], { [css.hovering]: active })}
        key={c.markers[0].id}
        style={{ ...styles, left: `calc(${c.leftOffset}% + 7px)` }}
      />
    ))
  }

  // prettier-ignore
  render() {
    const { ariaLabel, ariaValueText, className, bars, barClass, fillClass, hovering: hoveringOverride, value, padded, bottom, verticalAlign, markerClusters } = this.props
    const { hovering, dragging } = this.state

    const active = hoveringOverride || (hovering || dragging)

    const clampedValue = clamp((value || 0) * 100, 0, 100)
    const percentageValue = Math.round(clampedValue)

    const verticalStyle = { top: `${verticalAlign ? verticalAlign : 50}%`}
    const fillStyle = { width: `${clampedValue}%` }
    const handleStyle = { left: `${clampedValue}%` }

    return <div 
            className={classNames(className, css.slider, {
              [css.hovering]: active,
              [css.padded]: padded,
              [css.bottom]: bottom,
            })} 
            ref={ref => (this.slider = ref)} 
            onContextMenu={this.cancelEvent} 
            onMouseDown={this.handleStart} 
            onTouchStart={this.handleStart} 
            onMouseMove={this.onMouseMove} 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave}
          >
            {this.props.children}
            {this.renderBackgroundBars(active, verticalStyle)}
          <div className={classNames(css.bar, barClass, fillClass, css.fill, { [css.hovering]: active})} 
            style={{ ...fillStyle, ...verticalStyle }} 
          />
            <span 
              aria-label={ariaLabel} 
              role="slider" 
              aria-valuemin="0" 
              aria-valuemax="100" 
              aria-valuenow={percentageValue} 
              aria-valuetext={ariaValueText} 
              tabIndex="0" 
              onKeyDown={this.handleKeyDown} 
              className={classNames(css.handle,{ [css.hovering]: active })} 
              onContextMenu={this.cancelEvent} 
              ref={ref => (this.handle = ref)} 
              style={{ ...handleStyle, ...verticalStyle }} 
            />
            { markerClusters && this.renderMarkerTicks(markerClusters, active, verticalStyle) }
          </div>
  }
}

function getRatio(boundingRect, event) {
  if (!event) return 0

  const { width: boxWidth, left: x } = boundingRect

  const pageX = event.pageX || (event.touches && event.touches.length > 0 && event.touches[0].pageX) || 0

  const numerator = pageX - x

  return Math.max(Math.min(numerator, boxWidth), 0) / boxWidth
}

export function getPercentage(boundingRect, event) {
  return getRatio(boundingRect, event) * 100
}
