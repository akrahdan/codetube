import React, { Component } from 'react'
import { connect } from 'react-redux';
import classNames from 'classnames'
import { setVolume,setVolumeSliderActive, setPreviousVolume} from 'state/player/playerSlice'

import { InteractionModes } from '../../constants'

import css from './volume-slider.module.scss'
import VolumeButton from '../volume-button'
import Slider from '../../slider/slider'
import { VOLUME_STEP } from '../../constants'
import Tooltip from '../../tooltip/tooltip'

export class VolumeSlider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
    }
  }

  handleChange = value => {
    const { setVolume } = this.props

    setVolume && setVolume(value)
  }

  handleChangeStart = value => {
    const { setPreviousVolume, setVolume } = this.props

    this.setState({ dragging: true })

    setVolume && setVolume(value)

    setPreviousVolume && setPreviousVolume(value)
  }

  handleChangeEnd = () => {
    this.setState({ dragging: false })
  }

  setVolumeSliderActive = isActive => {
    return () => this.props.setVolumeSliderActive(isActive)
  }

  render() {
    const { interactionMode, volume, volumeSliderActive = true, muted } = this.props
    const { dragging } = this.state
    const ariaLabel = `Use arrow keys to adjust volume`
   
    const isActive =
      volumeSliderActive ||
      dragging ||
      (interactionMode === InteractionModes.TOUCH || interactionMode === InteractionModes.KEYBOARD)

    return (
      <div
        className={css.volumeSliderWrapper}
        onMouseEnter={this.setVolumeSliderActive(true)}
        onMouseLeave={this.setVolumeSliderActive(false)}
        onFocus={this.setVolumeSliderActive(true)}
        onBlur={this.setVolumeSliderActive(false)}
      >
        <div className={css.sliderIcon}>
          <Tooltip text={muted ? 'Unmute (m)' : 'Mute (m)'}>
            <VolumeButton />
          </Tooltip>
        </div>
        <div className={classNames({ [css.active]: isActive }, css.videoSlider)}>
          <div className={classNames({ [css.active]: isActive }, css.wrapper)}>
            <div className={classNames(css.sliderWrapper)}>
              <Slider
                ariaLabel={ariaLabel}
                step={VOLUME_STEP}
                barClass={css.barClass}
                className={css.slider}
                value={volume}
                onChange={this.handleChange}
                onChangeStart={this.handleChangeStart}
                onChangeEnd={this.handleChangeEnd}
                fillClass={css.fill}
                hovering
                padded
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    volume: state.player.volume,
    volumeSliderActive: state.player.volumeSliderActive,
    interactionMode: state.player.interactionMode,
    muted: state.player.muted,
  }),
  dispatch => ({
    setVolume: payload => dispatch(setVolume(payload)),
    setPreviousVolume: payload => dispatch(setPreviousVolume(payload)),
    setVolumeSliderActive: payload => dispatch(setVolumeSliderActive(payload)),
  })
)(VolumeSlider)
