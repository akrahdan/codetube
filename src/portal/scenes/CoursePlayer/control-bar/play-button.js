import React, { Component } from 'react'
// import { connect } from 'unistore/react'

// import * as actions from '../../actions'
import css from './control-bar.module.scss'

import ControlBarButton from './control-bar-button/control-bar-button'
import Tooltip from '../tooltip/tooltip'
import icons from '../icons'
import { usePlayer } from 'store/usePlayer';
import { play, pause } from 'state/player/playerSlice';
import { useAppDispatch } from 'store/hooks'
export const PlayButton = () => {
  
    const { PauseIcon, PlayIcon } = icons
    const dispatch = useAppDispatch();
    const { player: { playing } } = usePlayer();
  
    

    const button = playing ? <PauseIcon className={css.pause} /> : <PlayIcon className={css.play} />
    const callback = playing ? pause : play
   
    return (
      <Tooltip text={playing ? 'Pause (k)' : 'Play (k)'}>
        <ControlBarButton onAction={() => {
          dispatch(callback())
        }}>{button}</ControlBarButton>
      </Tooltip>
    )
  
}
export default PlayButton;

