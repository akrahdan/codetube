import React, { Component } from 'react'
import css from './control-bar.module.scss'

import FastForwardButton from './fast-forward-button'
import FastBackwardButton from './fast-backward-button'
import FullscreenButton from './fullscreen-button'
import PlaybackSpeedButton from './playback-speed-button'
import NextButton from './next-button'
import PlayButton from './play-button'
import PreviousButton from './previous-button'
import SettingsButton from './settings-button'
import TimeDisplay from './time-display'
import VolumeSlider from './volume-slider/volume-slider'
import ClosedCaptioningButton from './closed-captioning-button'

export class Layout720p extends Component {
  render() {
    return (
      <div className={css.layout720}>
        <PreviousButton />
        <PlayButton />
        <NextButton />
        <FastBackwardButton />
        <FastForwardButton />
        <VolumeSlider />
        <TimeDisplay />

        <div className={css.middle} />

        <ClosedCaptioningButton />
        <PlaybackSpeedButton />
        <SettingsButton />
        <FullscreenButton />
      </div>
    )
  }
}
