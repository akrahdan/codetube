import React from 'react'
import classnames from 'classnames'
import css from './tooltip.module.css'

const Tooltip = props => {
  const { isFarRight, text =  'Previous (<)', isFarLeft = true, isDisabled } = props
  
  return (
    <div
      data-text={text}
      className={classnames(
        css['has-tooltip'],
        { [css['is-far-left']]: isFarLeft },
        { [css['is-far-right']]: isFarRight },
        { [css['is-disabled']]: isDisabled }
      )}
    >
      {props.children}
    </div>
  )
}

export default Tooltip
