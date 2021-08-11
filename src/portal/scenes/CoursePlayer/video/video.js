import React, { Component } from 'react'
import { connect } from 'react-redux';

import {play, pause, setVolume, setDuration,setTime, ready, seekEnd, seekStart,
     registerPlayer, setBufferedTime,setMediaType, setOverlay, setBuffering, setFullscreen, setLoading, setAutoplay, setPlaying, setCurrentResolution, setPreferredResolutions, setSupportedResolutions } from 'state/player/playerSlice';
import css from './video.module.css'


import { DefaultResolutions } from '../constants'

// import withAdobeHeartbeat from './with-adobe-heartbeat'


import { FullscreenState, HLS_SDK_URL, HLS_SDK_URL_SAFARI, MediaTypes } from '../constants'
import { getSDK } from '../utilities/get-sdk';
import { throttle } from '../utilities/throttle';
// import { sendPlaySuccessEvent } from '../../analytics/player-events'
import { mapHlsError, mapGenericVideoError } from '../utilities/video-error'
import { Truncate } from '@codecademy/gamut';

const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i
const initialState = {
  isPlaying: false,
  reportedVolume: null,
  reportedPlaybackRate: 1,
  isBuffering: false,
  canPlay: false,
  ready: true,
}

export class Video extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      clipId: props.clipId,
      onReady: this.newReadyPromise(),
      hlsPlaying: false,
      videoSrc: null,
    }

    this.element = React.createRef()
  }

  newReadyPromise = () => {
    return new Promise((resolve) => {
      this.ready = () => {
        this.setState({ ready: true }, () => {
          resolve()
        })
      }
    })
  }

  isSafari = () => navigator.vendor.match(/apple/i)

  componentDidMount() {
    const {
      playing,
      volume,
      muted,
      playbackRate,
      time,
      closedCaptioningEnabled,
      closedCaptioningLanguage,
      mediaType,
      currentResolution,
      userAutoplaySetting,
      setClipProgress,
    } = this.props
    this.throttledSetClipProgress = throttle(setClipProgress, 1000)
    const src = this.getSrc(this.props)

   

    if (muted || volume !== null) {
      volume && this.setVolume(muted ? 0 : volume)
    }

    if (playbackRate) {
      this.setPlaybackRate(playbackRate)
    }

    if (time) {
      this.seekTo(time)
    }

    if (closedCaptioningEnabled) {
      this.toggleCaptions(closedCaptioningLanguage)
    }

    if ( src) {
      this.maybeStartHls(src, mediaType)
    }
    this.onMediaTypeChange(mediaType)
  }

  componentWillUnmount() {
    this.destroyHls()
    clearTimeout(this.progressTimeout)
  }

  maybeStartHls(source, mediaType) {
    const { setMediaType } = this.props
    const { hlsPlaying } = this.state
    const isHlsSource = this.isHlsSource(source)
    const shouldPlayHls = mediaType === MediaTypes.HLS && isHlsSource

    if (hlsPlaying) this.destroyHls()

    if (shouldPlayHls) {
      this.startHls(source)
    }

    if (mediaType === MediaTypes.HLS && !shouldPlayHls) {
      setMediaType && setMediaType(MediaTypes.MP4)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      adobeHeartbeat,
      clipId,
      closedCaptioningEnabled,
      closedCaptioningLanguage,
      currentUrlIndex,
      mediaType,
      currentResolution,
      setClosedCaptioningCueList,
    } = this.props
    const { reportedPlaybackRate, reportedVolume, ready, isPlaying, hlsPlaying } = this.state

    const newSource = this.getSrc(nextProps)

    // Handle URL change
    const sourceDidChange =
      currentUrlIndex !== nextProps.currentUrlIndex ||
      clipId !== nextProps.clipId ||
      mediaType !== nextProps.mediaType ||
      this.getSrc(this.props) !== newSource

    const captionsDidChange =
      nextProps.closedCaptioningEnabled !== closedCaptioningEnabled ||
      nextProps.closedCaptioningLanguage !== closedCaptioningLanguage

    const resolutionDidChange = nextProps.currentResolution !== currentResolution

    const mediaTypeDidChange = mediaType && mediaType !== nextProps.mediaType

    if (mediaTypeDidChange) this.onMediaTypeChange(nextProps.mediaType)

    if (sourceDidChange && newSource) {
      setClosedCaptioningCueList && setClosedCaptioningCueList(null)
      this.maybeStartHls(newSource, mediaType)
    }

    if (sourceDidChange && ready) {
      this.setState(
        {
          onReady: this.newReadyPromise(),
          ready: false,
          reportedVolume: null,
          reportedPlaybackRate: null,
          isPlaying: null,
        },
        () => {
          adobeHeartbeat && adobeHeartbeat.trackComplete()
        }
      )
    }
   
    if (!ready) {
      return
    }
  
    // Handle playing change
    if (nextProps.playing && !isPlaying) {
       
      this.play(true)
    }
    if (!nextProps.playing && isPlaying) {
      this.pause(true)
    }

    // Handle volume change
    if (nextProps.volume !== null || nextProps.muted) {
      if (!nextProps.muted) {
        if (nextProps.volume !== reportedVolume) {
          this.setVolume(nextProps.volume)
        }
      }

      if (nextProps.muted && reportedVolume !== 0) {
        this.setVolume(0)
      }
    }

  
    if (nextProps.playbackRate !== reportedPlaybackRate) {
      this.setPlaybackRate(nextProps.playbackRate)
    }

    // Handle time change
    const timeDelta = Math.abs(nextProps.time - this.getPlayedSeconds())
    
    if (timeDelta >= 1) {
      this.seekTo(nextProps.time)
    }

    if (captionsDidChange) {
      this.toggleCaptions(nextProps.closedCaptioningLanguage)
    }

    if (resolutionDidChange && hlsPlaying) this.onHlsLevelChange(nextProps.currentResolution)
  }

  isHlsSource = (source) => HLS_EXTENSIONS.test(source)

  destroyHls = () => {
    this.setState({ hlsPlaying: false })
    this.hls && this.hls.destroy()
  }

  startHls = async (source) => {
    const {
      setSupportedResolutions,
      setMediaType,
      setCurrentResolution,
      preferredResolutions,
      currentResolution,
      time,
    } = this.props
    const sdkUrl = this.isSafari() ? HLS_SDK_URL_SAFARI : HLS_SDK_URL //https://github.com/video-dev/hls.js/issues/1543
    const Hls = await getSDK(sdkUrl, 'Hls')
    if (!Hls.isSupported()) return setMediaType && setMediaType(MediaTypes.MP4)
    this.Hls = Hls

    this.hls = new Hls({ autoStartLoad: false })
    this.hls.loadSource(source)

    const videoElement = document.getElementById('video-element')
    this.hls.attachMedia(videoElement)

    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      this.hls.startLoad(time || 0)
      const autoLevel = { height: 'Auto', index: -1 }
      const supportedResolutions = data.levels.map((r) => ({
        width: r.width,
        height: r.height,
        index: data.levels.indexOf(r),
      }))
      setSupportedResolutions && setSupportedResolutions(supportedResolutions.concat(autoLevel))

      const preferredResolution = preferredResolutions.hls ? preferredResolutions.hls : null
      const newResolution =
        preferredResolution &&
        supportedResolutions.find(
          (r) => preferredResolution.width === r.width && preferredResolution.height === r.height
        )

      if (!newResolution) {
        setCurrentResolution && setCurrentResolution(autoLevel)
        return
      }

      this.hls && (this.hls.currentLevel = newResolution.index)
      const resolutionShouldChange = newResolution !== currentResolution
      resolutionShouldChange && setCurrentResolution && setCurrentResolution(newResolution)
    })
    this.hls.on(Hls.Events.ERROR, this.handleHlsError.bind(this))
    this.hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
      this.setState({ hlsPlaying: true })
    })
  }

  onHlsLevelChange = ({ height, index }) => {
    const { currentResolution, setCurrentResolution } = this.props

    if (height === currentResolution.height) {
      return
    }
    this.hls && (this.hls.currentLevel = index)
    setCurrentResolution && setCurrentResolution({ height, index })
  }

  requestNewUrls = () => {
    const { setLoading, requestUrls } = this.props
    requestUrls && requestUrls(true)
    setLoading && setLoading(true)
  }

  onMediaTypeChange = (newMediaType) => {
    const { setSupportedResolutions, setCurrentResolution, preferredResolutions } = this.props
    console.log("Mediatype: ", newMediaType)
    if (newMediaType !== MediaTypes.HLS) {
      setSupportedResolutions && setSupportedResolutions(DefaultResolutions[newMediaType])

      const resolution = preferredResolutions && preferredResolutions[newMediaType]
      setCurrentResolution && setCurrentResolution(resolution)
    }

    if (newMediaType === MediaTypes.WEBM || newMediaType === MediaTypes.MP4) {
      this.requestNewUrls()
    }
  }

  iosEndFullscreen = () => {
    this.props.setFullscreen(FullscreenState.NORMAL)
  }

  connectIosFullscreenExit() {
    const { onReady } = this.state
    onReady.then(() => {
      const { current: player } = this.element
      if (player.webkitExitFullscreen) {
        player.addEventListener('webkitendfullscreen', this.iosEndFullscreen, false)
      }
    })
  }

  //#region Player API
  play() {
    const { onReady } = this.state

    onReady.then(() => {
    //   const { adobeHeartbeat, clipId, title } = this.props
      const { current: player } = this.element

      if (player) {
        const promise = player.play()

        // adobeHeartbeat && adobeHeartbeat.trackPlay()

        if (promise) {
          promise.catch((e) => {
            const { onError, pause } = this.props
            pause && pause(false)

            onError && onError(e)
          })
        }
      }
    })
  }

  pause() {
    const { onReady } = this.state
    const { adobeHeartbeat, onPause } = this.props

    onReady.then(() => {
      const { current: player } = this.element

      player && player.pause()

    //   adobeHeartbeat && adobeHeartbeat.trackPause()

      onPause && onPause()
    })
  }

  setVolume = (percent) => {
    const { onReady } = this.state

    onReady.then(() => {
      const { current: player } = this.element
      player && percent === 0 ? (player.muted = true) : (player.muted = false) // player.volume is read only on mobile iOS
      player && isFinite(percent) && (player.volume = percent)
    })
  }

  setPlaybackRate = (rate) => {
    const { onReady } = this.state

    onReady.then(() => {
      const { current: player } = this.element

      player && (player.playbackRate = rate)
    })
  }

  onCaptionUpdate = (e) => {
    e.currentTarget.activeCues && this.props.setClosedCaptioningCueList(e.currentTarget.activeCues)
  }

  toggleCaptions = (language) => {
    const { onReady } = this.state

    onReady.then(() => {
      const { current: player } = this.element

      player &&
        [...player.textTracks].forEach((track) => {
          if (track.mode === 'showing' && track.language !== language.code) track.mode = 'disabled'

          if (track.language === language.code) {
            track.oncuechange = this.onCaptionUpdate
            track.mode = 'hidden'
          } else {
            track.oncuechange = null
          }
        })
    })
  }

  seekTo = (amount) => {
    const { onReady } = this.state

    onReady.then(() => {
      const { current: player } = this.element

      player && (player.currentTime = amount)
    })
  }

  getDuration() {
    const { current: player } = this.element

    return player ? player.duration : 0
  }

  getPlayedSeconds() {
    const { current: player } = this.element

    return player ? player.currentTime : 0
  }

  getSecondsLoaded() {
    const { current: player } = this.element

    if (!player) {
      return 0
    }

    const bufferedLength = player.buffered.length

    if (bufferedLength === 0) return 0

    let maxBuffered = 0,
      currentBuffered
    for (let i = 0; i < bufferedLength; i++) {
      currentBuffered = player.buffered.end(i)
      maxBuffered = currentBuffered > maxBuffered ? currentBuffered : maxBuffered
    }

    return maxBuffered
  }
  //#endregion

  onRateChange = (rate) => {
    const { current: player } = this.element

    player && this.setState({ reportedPlaybackRate: player.playbackRate })
  }

  onVolumeChange = (rate) => {
    const { current: player } = this.element

    player && this.setState({ reportedVolume: player.volume })
  }

  onPlay = () => {
    const { setPlaying } = this.props
    // const { isStagingEnv, urls, currentUrlIndex, userId } = this.props
    this.setState({ isPlaying: true })
    // const currentUrl = urls[currentUrlIndex || 0]
    // // sendPlaySuccessEvent(currentUrl, isStagingEnv, userId)
    setPlaying && setPlaying(true)
    this.updateProgress()
  }

  onPause = () => {
    const { setPlaying } = this.props
    this.setState({ isPlaying: false })
    setPlaying && setPlaying(false)
  }

  onCanPlay = () => {
    const { setBuffering, buffering, loading, setLoading, adobeHeartbeat } = this.props

    this.setState({ canPlay: true })
    if (loading) setLoading && setLoading(false)

    if (buffering) {
      setBuffering && setBuffering(false)
      //adobeHeartbeat && adobeHeartbeat.trackBufferComplete()
    }
  }

  onLoadedData = () => {
    const { setBuffering, buffering, setOverlay, adobeHeartbeat } = this.props
    const { onReady } = this.state

    if (!buffering) {
      this.setState({ isBuffering: true })
      setBuffering && setBuffering(true)
    }

    setOverlay && setOverlay(null)

    onReady.then(() => {
      const { current: player } = this.element
      //adobeHeartbeat && adobeHeartbeat.initHeartbeat(player.duration)
    })
  }

  onEnded = (e) => {
    // const { adobeHeartbeat, clipCompletedCallback, end, nextCallback, pause, userAutoplaySetting, clipId } = this.props

    // end && end()

    pause && pause(false)

    // adobeHeartbeat && adobeHeartbeat.trackComplete()

    // clipCompletedCallback && clipCompletedCallback(e)

    // userAutoplaySetting && nextCallback && nextCallback(e)
  }

  renderTrack(language) {
    // const { clipId, versionId } = this.props
    // return (
    //   <track
    //     key={language.code}
    //     label={language.name}
    //     kind="captions"
    //     srcLang={language.code}
    //     src={""}
    //   />
    // )
  }

  updateTracks = (videoElement) => {
    // const { closedCaptioningLanguage, closedCaptioningEnabled, setClosedCaptioningCueList } = this.props
    // const tracks = videoElement && videoElement.textTracks

    // tracks &&
    //   Object.values(tracks).forEach((track) => {
    //     const isActive = closedCaptioningEnabled && track.language === closedCaptioningLanguage.code

    //     if (isActive) {
    //       track.mode = 'hidden'
    //       videoElement.textTracks[0].mode = 'hidden' // Firefox
    //       track.oncuechange = (e) => {
    //         e.currentTarget.activeCues && setClosedCaptioningCueList(e.currentTarget.activeCues)
    //       }
    //     } else {
    //       track.mode = 'disabled'
    //     }
    //   })
  }

  onLoadedMetadata = () => {
    const { ready, registerPlayer } = this.props
    this.ready()

    const duration = this.getDuration()
    ready && ready(duration)

    const videoElement = document.getElementById('video-element')
    registerPlayer && registerPlayer(videoElement)
    // this.updateTracks(videoElement)
  }

  getSrc = ({ currentUrlIndex, currentUrl }) => {
    // return currentUrlIndex !== null && urls && urls.length > 0 ? urls[currentUrlIndex].url : null
    let source = currentUrl
    return source;
  }

  onSeeking = () => {
    // const { adobeHeartbeat } = this.props

    // adobeHeartbeat && adobeHeartbeat.trackSeekStart()
  }

  onSeeked = () => {
    // const { adobeHeartbeat } = this.props

    // adobeHeartbeat && adobeHeartbeat.trackSeekComplete()
  }

  updateProgress = () => {
    const { clipId, setTime, playing } = this.props
    
    if (!playing) return

    const reportedTime = this.getPlayedSeconds()
    setTime && setTime(reportedTime)
    // reportedTime > 0 && this.throttledSetClipProgress({clipId, videoSecondsWatched: reportedTime })

    this.progressTimeout = setTimeout(this.updateProgress, 50)
  }

  onProgress = () => {
    const { setBufferedTime } = this.props
    const bufferedTime = this.getSecondsLoaded()

    setBufferedTime && setBufferedTime(bufferedTime)
  }

  handleHlsError(event, data) {
    // const { onVideoError } = this.props
    // if (data.fatal) {
    //   switch (data.type) {
    //     case this.Hls.ErrorTypes.MEDIA_ERROR:
    //       this.hls.recoverMediaError()
    //       break
    //     default:
    //       this.destroyHls()
    //       onVideoError && onVideoError(mapHlsError(data), 'handleHlsError')
    //       break
    //   }
    // }
  }

  onWaiting = () => {
    const { adobeHeartbeat, setBuffering } = this.props
    //adobeHeartbeat && adobeHeartbeat.trackBufferStart()
    setBuffering && setBuffering(true)
  }

  render() {
    // const { onVideoError, versionId, closedCaptioningLanguage, mediaType } = this.props
    const { playbackRate, mediaType,supportedResolutions , buffering, loading} = this.props;
    

    let source = this.getSrc(this.props)
    //let source = "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4";

    if (!source) {
      return <div className={css.video} />
    }

    if (mediaType === MediaTypes.HLS) source = undefined
   
    return (
      <video
        id="video-element"
        key={source}
        className={css.video}
        ref={this.element}
        src={source}
        preload="auto"
        playsInline
        autoPlay
        controls={false}
        loop={false}
        onLoadedMetadata={this.onLoadedMetadata}
        onLoadedData={this.onLoadedData}
        onCanPlay={this.onCanPlay}
        onPlay={this.onPlay}
        onSeeking={this.onSeeking}
        onSeeked={this.onSeeked}
        onPause={this.onPause}
        // onEnded={this.onEnded}
        onVolumeChange={this.onVolumeChange}
        onRateChange={this.onRateChange}
        onWaiting={this.onWaiting}
        onProgress={this.onProgress}
        // onError={(e) => {
        //   const { current: player } = this.element
        //   onVideoError && onVideoError(mapGenericVideoError(player.error), 'videoElement.onError')
        // }}
      >
        {/* {closedCaptioningLanguage && versionId && this.renderTrack(closedCaptioningLanguage)} */}
      </video>
    )
  }
}

const mapStateToProps = state => ({
    playing: state.player.playing,
    playbackRate: state.player.playbackSpeed,
    volume: state.player.volume,
    buffering: state.player.buffering,
    loading: state.player.loading,
    muted: state.player.muted,
    time: state.player.time,
    currentUrl: state.player.currentUrl,
    mediaType: state.player.mediaType,
    overlay: state.player.overlay,
    currentResolution: state.player.currentResolution,
    supportedResolutions: state.player.supportedResolutions,
    preferredResolutions: state.player.preferredResolutions,

})

const mapDispatchToProps = dispatch => ({
    setVolume: payload => dispatch(setVolume(payload)),
    setDuration: payload => dispatch(setVolume(payload)),
    setTime: payload => dispatch(setTime(payload)),
    setBufferedTime: payload => dispatch(setBufferedTime(payload)),
    ready: payload => dispatch(ready(payload)),
    seekEnd: payload => dispatch(seekEnd(payload)),
    seekStart: payload => dispatch(seekStart(payload)),
    play: payload => dispatch(play(payload)),
    pause: payload => dispatch(pause(payload)),
    setBufferedTime: payload => dispatch(setBufferedTime(payload)),
    setBuffering: payload => dispatch(setBuffering(payload)),
    setOverlay: payload => dispatch(setOverlay(payload)),
    setFullscreen: payload => dispatch(setFullscreen(payload)),
    setLoading: payload => dispatch(setLoading(payload)),
    setPlaying: payload => dispatch(setPlaying(payload)),
    setAutoplay: payload => dispatch(setAutoplay(payload)),
    setMediaType: payload => dispatch(setMediaType(payload)),
    setCurrentResolution: payload => dispatch(setCurrentResolution(payload)),
    setPreferredResolutions: payload => dispatch(setPreferredResolutions(payload)),
    setSupportedResolutions: payload => dispatch(setSupportedResolutions(payload)),

   

})

export default connect(mapStateToProps, mapDispatchToProps)(Video);

// export default withAdobeHeartbeat(
//   connect(
//     (state) => ({
//       userAutoplaySetting: state.userAutoplaySetting,
//       buffering: state.buffering,
//       clipCompletedCallback: state.clipCompletedCallback,
//       clipId: state.clipId,
//       versionId: state.versionId,
//       closedCaptioningEnabled: state.closedCaptioningEnabled,
//       closedCaptioningLanguage: state.closedCaptioningLanguage,
//       currentResolution: state.currentResolution,
//       currentUrlIndex: state.currentUrlIndex,
//       loading: state.loading,
//       muted: state.muted,
//       nextCallback: state.nextCallback,
//       resolution: state.resolutionValue,
//       playbackRate: state.playbackSpeed,
//       playing: state.playing,
//       poster: state.poster,
//       time: state.time,
//       title: state.title,
//       urls: state.urls,
//       userId: state.userId,
//       version: state.versions ? state.versions.VERSION : '0.0.0',
//       volume: state.volume,
//       mediaType: state.mediaType,
//       preferredResolutions: state.preferredResolutions,
//       overlay: state.overlay,
//       isStagingEnv: state.isStagingEnv,
//       autoPlay: state.autoPlay,
//     }),
//     (store) => ({
//       registerPlayer: actions.registerPlayer,
//       seekStart: actions.seekStart,
//       onVideoError: actions.onVideoError,
//       setBuffering: actions.setBuffering,
//       setLoading: actions.setLoading,
//       setMediaType: actions.setMediaType,
//       setLoading: actions.setLoading,
//       setCurrentResolution: actions.setCurrentResolution,
//       setSupportedResolutions: actions.setSupportedResolutions,
//       requestUrls: actions.requestUrls,
//       end: actions.end,
//       ready: actions.ready,
//       pause: actions.pause,
//       play: actions.play,
//       setClosedCaptioningCueList: actions.setClosedCaptioningCueList,
//       setFullscreen: actions.setFullscreen,
//       setOverlay: actions.setOverlay,
//       setClipProgress: actions.setClipProgress,
//       setPlaying: actions.setPlaying,
//       setBufferedTime: actions.setBufferedTime,
//       setDuration: actions.setDuration,
//       setTime: actions.setTime,
//     })
//   )(Video)
// )
