import classnames from 'classnames'
import React from 'react'

import css from './icons.module.css'

export default class SVGWrapper extends React.Component {
  render() {
    const { className, fillClassName, iconType, width, title, viewBoxHeight = 512, viewBoxWidth = 512, style } = this.props

    return (
      <span className={classnames(css.root, { [css[iconType]]: !!iconType }, className)} style={style}>
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} role="img" aria-label={title} focusable="false">
          <title>{title}</title>

          <g className={classnames(css.fill, fillClassName)}>{this.props.children}</g>
        </svg>
      </span>
    )
  }
}