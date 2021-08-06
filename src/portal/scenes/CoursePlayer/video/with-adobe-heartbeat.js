import React, { Component, Fragment } from 'react'


// import adobe from './VideoHeartbeat.min.js'

// const { MediaHeartbeat, MediaHeartbeatConfig, MediaHeartbeatDelegate } = adobe.va

export default function withAdobeHeartbeat(WrappedComponent) {
  let mediaHeartbeat

  class AdobeHeartbeatWrapper extends Component {
    constructor(props) {
      super(props)

      this.state = {
        seeking: false,
        buffering: false,
        playing: false,
        isInitialized: false,
        sessionStarted: false,
      }
    }

    getAdobeReportSuite = () => {
      const { isStagingEnv } = this.props
      const subdomain = window.location.host.split('.')[0]

      if (subdomain === 'app' || isStagingEnv === false) {
        return 'pluralsight.united.dev'
      }
      return 'pluralsightapptest'
    }

    initMediaHeartbeat = () => {
      const { versions } = this.props

      // var mediaConfig = new MediaHeartbeatConfig()

      // mediaConfig.trackingServer = 'pluralsight.hb.omtrdc.net'
      // mediaConfig.playerName = 'embeddable-player'
      // mediaConfig.channel = 'test-channel'
      // mediaConfig.debugLogging = false
      // mediaConfig.appVersion = versions.VERSION
      // mediaConfig.ssl = true
      // mediaConfig.ovp = 'test-ovp'

      // var mediaDelegate = new MediaHeartbeatDelegate()

      // mediaDelegate.getCurrentPlaybackTime = () => {
      //   const { time } = this.props

      //   return time
      // }

      // const adobeReportSuite = this.getAdobeReportSuite()

      // mediaHeartbeat = new MediaHeartbeat(mediaDelegate, mediaConfig, s_gi(adobeReportSuite))
      this.setState({
        isInitialized: true,
      })
    }

    initHeartbeat = (duration) => {
      if (!window.AppMeasurement) {
        console.warn('AppMeasurement was not found. Please ensure that Adobe Analytics is configured.')
        return
      }

      // if (!this.state.isInitialized) this.initMediaHeartbeat()
      // if (!this.state.sessionStarted) this.trackSessionStart(duration)
    }

    trackSessionStart = (duration) => {
      const { clipId, title } = this.props

      // let mediaObject = MediaHeartbeat.createMediaObject(title, clipId, duration, MediaHeartbeat.StreamType.VOD)
      //mediaHeartbeat && mediaHeartbeat.trackSessionStart(mediaObject, {})
      this.setState({ sessionStarted: true })
    }

    trackSeekComplete = () => {
      this.setState({ seeking: false }, () => {
       // mediaHeartbeat.trackEvent(MediaHeartbeat.Event.SeekComplete)
      })
    }

    trackSeekStart = () => {
      //if (!mediaHeartbeat) this.initHeartbeat()

      const { buffering, seeking } = this.state

      if (buffering && !seeking) {
        this.setState({ buffering: false, seeking: true }, () => {
         // mediaHeartbeat.trackEvent(MediaHeartbeat.Event.BufferComplete)
          //mediaHeartbeat.trackEvent(MediaHeartbeat.Event.SeekStart)
        })
      } else if (!seeking) {
        this.setState({ seeking: true }, () => {
         // mediaHeartbeat.trackEvent(MediaHeartbeat.Event.SeekStart)
        })
      }
    }

    trackBufferComplete = () => {
      const { buffering } = this.state

      if (!buffering) {
        return
      }

      this.setState({ buffering: false }, () => {
       // mediaHeartbeat.trackEvent(MediaHeartbeat.Event.BufferComplete)
      })
    }

    trackBufferStart = () => {
      //if (!mediaHeartbeat) this.initHeartbeat()

      const { buffering, seeking } = this.state

      if (buffering || seeking) {
        return
      }

      this.setState({ buffering: true }, () => {
       // mediaHeartbeat.trackEvent(MediaHeartbeat.Event.BufferStart)
      })
    }

    trackPause = () => {
      const { buffering, seeking, playing } = this.state

      if (!playing) {
        return
      }

      if (buffering || seeking) {
        this.setState({ seeking: false, buffering: false, playing: false }, () => {
          //seeking && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.SeekComplete)

          // && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.BufferComplete)

          //mediaHeartbeat.trackPause()
        })
      } else {
        this.setState({ playing: false }, () => {
         // mediaHeartbeat.trackPause()
        })
      }
    }

    trackPlay = () => {
      //if (!mediaHeartbeat) this.initHeartbeat()

      const { playing } = this.state

      if (!playing) {
        this.setState({ playing: true }, () => {
          //mediaHeartbeat.trackPlay()
        })
      }
    }

    trackComplete = () => {
      if (this.state.sessionStarted) {
        // if (!mediaHeartbeat) this.initHeartbeat()
        // mediaHeartbeat && mediaHeartbeat.trackComplete()
        // mediaHeartbeat && mediaHeartbeat.trackSessionEnd()

        this.setState({ playing: false, sessionStarted: false })
      }
    }

    componentWillUnmount() {
      //mediaHeartbeat && mediaHeartbeat.trackSessionEnd && mediaHeartbeat.trackSessionEnd()
    }

    render() {
      let api = {
        initHeartbeat: this.initHeartbeat,
        trackBufferComplete: this.trackBufferComplete,
        trackBufferStart: this.trackBufferStart,
        trackComplete: this.trackComplete,
        trackPause: this.trackPause,
        trackPlay: this.trackPlay,
        trackSeekComplete: this.trackSeekComplete,
        trackSeekStart: this.trackSeekStart,
      }

      if (!window.AppMeasurement) {
        api = {
          initHeartbeat: this.initHeartbeat,
          trackBufferComplete: () => {},
          trackBufferStart: () => {},
          trackComplete: () => {},
          trackPause: () => {},
          trackPlay: () => {},
          trackSeekComplete: () => {},
          trackSeekStart: () => {},
        }
      }

      return <WrappedComponent adobeHeartbeat={api} />
    }
  }
  return AdobeHeartbeatWrapper;

  // return connect(
  //   state => ({
  //     clipId: state.clipId,
  //     duration: state.duration,
  //     time: state.time,
  //     title: state.title,
  //     versions: state.versions,
  //     isStagingEnv: state.isStagingEnv,
  //   }),
  //   store => ({})
  // )(AdobeHeartbeatWrapper)
}
