import classNames from 'classnames';
import { useState } from 'react';

import styles from './index.module.css';
export const CaretIcon = ({ toggle}) => {
  

  return (
    <div class={styles.caret_container}>
      <button aria-label="Expand" className={styles.caretButton} >
        <div className={classNames(styles.caret, {
          [styles.caretExpand]: toggle
        })}>
          <div className={styles.caretDown}>
            <svg aria-label="caret down icon" viewBox="0 0 24 24" role="img">
              <path d="M12 15.41l-5-5L8.41 9 12 12.58 15.59 9 17 10.41" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};
