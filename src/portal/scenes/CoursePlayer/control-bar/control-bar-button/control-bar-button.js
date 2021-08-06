import React, { Component } from 'react'
import classnames from 'classnames'

import css from './control-bar-button.module.css'

export class ControlBarButton extends Component {
  constructor() {
    super()
    this.state = {
      hovering: true,
    }
  }

  handleMouseEnter = () => {
    this.setState({ hovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovering: false })
  }

  handleAction = (e) => {
    const { onAction } = this.props
    
    onAction && onAction(e)
  }

  cancelEvent = (e) => {
    e && e.preventDefault && e.preventDefault()
  }

  render() {
    const {
      active,
      ariaLabel,
      activeClassName,
      className,
      hidden,
      ariaPressed,
      ariaHaspopup,
      ariaOwns,
      ariaExpanded,
    } = this.props
    const { hovering } = this.state

    const isActive = hovering || active

    // prettier-ignore
    return !hidden ? (
      <div className={classnames(className, css.wrapper)}>
        <button
          is-control-bar-button="true"
          className={classnames(css.icon, { [activeClassName]: isActive })}
          active={isActive ? 'true' : null}
          onFocus={this.handleMouseEnter}
          onBlur={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleAction}
          onTouchStart={this.handleAction}
          onTouchEnd={this.cancelEvent}
          aria-label={ariaLabel}
          aria-pressed={ariaPressed}
          aria-haspopup={ariaHaspopup}
          aria-owns={ariaOwns}
          aria-expanded={ariaExpanded}
        >
          {this.props.children}
        </button>
      </div>
    ) : null
  }
}

export default ControlBarButton
