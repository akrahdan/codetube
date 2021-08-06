import React, { Component } from 'react'
import css from './control-bar.module.scss'

// import ClosedCaptioningButton from './closed-captioning-button'

import FullscreenButton from './fullscreen-button'
import PlaybackSpeedButton from './playback-speed-button'
import NextButton from './next-button'
import PlayButton from './play-button'
import SettingsButton from './settings-button'
import TimeDisplay from './time-display'
import VolumeSlider from './volume-slider/volume-slider'
import ClosedCaptioningButton from './closed-captioning-button'

export class Layout360p extends Component {
  render() {
    return (
      <div className={css.layout360}>
        <PlayButton />
        <NextButton />
        <VolumeSlider />
        <TimeDisplay />
        <div className={css.middle} />
        <ClosedCaptioningButton />
        {false && <PlaybackSpeedButton />}
        <SettingsButton />
        <FullscreenButton />
      </div>
    )
  }
}
