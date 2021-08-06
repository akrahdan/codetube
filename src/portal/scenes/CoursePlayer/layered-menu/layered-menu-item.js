import React from 'react'
import css from './layered-menu.module.scss'
import { CaretLeftIcon, CaretRightIcon, CheckIcon } from '@pluralsight/ps-design-system-icon'

const LayeredMenuItem = (props) => {
  const { label, onClick, direction, isActive, selectedSubItem, ariaLabel } = props
  return (
    <button
      type="button"
      className={css['layered-menu-item']}
      onClick={onClick}
      onTouchEnd={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
    >
      {direction === 'back' && (
        <span style={{ marginLeft: '-7px' }}>
          <CaretLeftIcon />
        </span>
      )}
      <span className={css['layered-menu-item__label']}>{label}</span>
      <span className={css['layered-menu-item__selected-subitem']}>
        <span className={css.ellipsis}>{selectedSubItem}</span>
      </span>
      {direction === 'forward' && <CaretRightIcon className={css['layered-menu-item__icon']} />}
      {isActive && <CheckIcon className={css['layered-menu-item__icon']} />}
    </button>
  )
}

export default LayeredMenuItem
