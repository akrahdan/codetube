import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import css from './overlay.module.css';
import icons from '../icons'
const playbackStatesMap = {
    PLAY: <icons.PlayCircle />,
    PAUSE: <icons.PauseCircle />,
    FWD: <icons.Forward10SecondsCircle />,
    BACK: <icons.Rewind10SecondsCircle />,
  }
  


  export class ActionOverlay extends Component {
    render() {
      const { overlay } = this.props
      if (!overlay) return null
  
      const { icon, key, fade } = overlay
  
      const displayIcon = playbackStatesMap[icon]
  
      return (
        <div key={key} className={classnames(css.actionOverlay, { [css['actionOverlay--fade']]: fade })}>
          <div className={css.icon}>{displayIcon}</div>
        </div>
      )
    }
  }

  export default connect(
    state => ({
      overlay: state.player.overlay,
    }),
  )(ActionOverlay)
  
  