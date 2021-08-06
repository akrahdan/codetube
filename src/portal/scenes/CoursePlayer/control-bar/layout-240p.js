import React, { Component } from 'react'
import css from './control-bar.module.scss'
import NextButton from './next-button'
import PlayButton from './play-button'
import FullscreenButton from './fullscreen-button'
import TimeDisplay from './time-display'
import VolumeButton from './volume-button'
import ClosedCaptioningButton from './closed-captioning-button'
import SettingsButton from './settings-button'

export class Layout240p extends Component {
  render() {
    return (
      <div className={css.layout240}>
        <PlayButton />
        <NextButton />
        <VolumeButton />
        <TimeDisplay />

        <div className={css.middle} />
        <ClosedCaptioningButton />
        <SettingsButton />
        <FullscreenButton />
      </div>
    )
  }
}
