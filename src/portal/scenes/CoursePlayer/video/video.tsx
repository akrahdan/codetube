import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { updateVideoViews } from "services/courses";
import { AppDispatch, RootState, store } from 'store';
import {
  play,
  pause,
  setVolume,
  setDuration,
  setTime,
  ready,
  seekEnd,
  seekStart,
  registerPlayer,
  setBufferedTime,
  setMediaType,
  setOverlay,
  setBuffering,
  setFullscreen,
  setLoading,
  setAutoplay,
  setPlaying,
  setCurrentResolution,
  setPreferredResolutions,
  setSupportedResolutions,
  setClipProgress,
  setCurrentUrl,
  setClipId,
  setSubtitle,
  setCurrentLecture
} from "state/player/playerSlice";
import css from "./video.module.css";

import { DefaultResolutions } from "../constants";

// import withAdobeHeartbeat from './with-adobe-heartbeat'

import {
  FullscreenState,
  HLS_SDK_URL,
  HLS_SDK_URL_SAFARI,
  MediaTypes,
} from "../constants";
import { getSDK } from "../utilities/get-sdk";
import { throttle } from "../utilities/throttle";
// import { sendPlaySuccessEvent } from '../../analytics/player-events'
import { mapHlsError, mapGenericVideoError } from "../utilities/video-error";
import { Truncate } from "@codecademy/gamut";
import { connected } from "process";

const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
const initialState = {
  isPlaying: false,
  reportedVolume: null,
  reportedPlaybackRate: 1,
  isBuffering: false,
  canPlay: false,
  ready: true,
};

const mapState = (state: RootState, ownProps: RouteComponentProps<{ id: string }>) => ({
  playing: state.player.playing,
  playbackRate: state.player.playbackSpeed,
  volume: state.player.volume,
  buffering: state.player.buffering,
  views: state.player.views,
  route: ownProps.history,
  currentLecture: state.player.currentLecture,
  loading: state.player.loading,
  course: state.player.course,
  clipId: state.player.clipId,
  muted: state.player.muted,
  time: state.player.time,
  currentUrl: state.player.currentUrl,
  mediaType: state.player.mediaType,
  overlay: state.player.overlay,
  currentResolution: state.player.currentResolution,
  supportedResolutions: state.player.supportedResolutions,
  preferredResolutions: state.player.preferredResolutions,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setVolume: (payload) => dispatch(setVolume(payload)),
  setDuration: (payload) => dispatch(setVolume(payload)),
  setTime: (payload) => dispatch(setTime(payload)),
  setBufferedTime: (payload) => dispatch(setBufferedTime(payload)),
  ready: (payload) => dispatch(ready(payload)),
  seekEnd: (payload) => dispatch(seekEnd()),
  setNextUrl: (payload) => dispatch(setCurrentUrl(payload)),
  seekStart: (payload) => dispatch(seekStart()),
  play: (payload) => dispatch(play(payload)),
  pause: (payload) => dispatch(pause(payload)),
  setCurrentLecture: (payload) => dispatch(setCurrentLecture(payload)),
  setClipId: (payload) => dispatch(setClipId(payload)),
  setSubtitle: (payload) => dispatch(setSubtitle(payload)),
  setBuffering: (payload) => dispatch(setBuffering(payload)),
  setOverlay: (payload) => dispatch(setOverlay(payload)),
  setFullscreen: (payload) => dispatch(setFullscreen(payload)),
  setLoading: (payload) => dispatch(setLoading(payload)),
  setPlaying: (payload) => dispatch(setPlaying(payload)),
  setClipProgress: (payload) => dispatch(setClipProgress(payload)),
  setAutoplay: (payload) => dispatch(setAutoplay(payload)),
  setMediaType: (payload) => dispatch(setMediaType(payload)),
  setCurrentResolution: (payload) => dispatch(setCurrentResolution(payload)),
  setPreferredResolutions: (payload) =>
    dispatch(setPreferredResolutions(payload)),
  setSupportedResolutions: (payload) =>
    dispatch(setSupportedResolutions(payload)),
});


const connector = connect(mapState, mapDispatch);
type VideoProps = ConnectedProps<typeof connector> & RouteComponentProps;

export class Video extends Component<VideoProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      clipId: props.clipId,
      onReady: this.newReadyPromise(),
      hlsPlaying: false,
      videoSrc: null,
    };

    this.element = React.createRef();
  }

  newReadyPromise = () => {
    return new Promise((resolve) => {
      this.ready = () => {
        this.setState({ ready: true }, () => {
          resolve();
        });
      };
    });
  };

  isSafari = () => navigator.vendor.match(/apple/i);

  componentDidMount() {
    const {
      playing,
      volume,
      muted,
      playbackRate,
      time,
     
      mediaType,
      currentResolution,
   
      setClipProgress,
    } = this.props;
    this.throttledSetClipProgress = throttle(setClipProgress, 1000);
    const src = this.getSrc(this.props);

    if (muted || volume !== null) {
      volume && this.setVolume(muted ? 0 : volume);
    }

    if (playbackRate) {
      this.setPlaybackRate(playbackRate);
    }

    if (time) {
      this.seekTo(time);
    }

    

    if (src) {
      this.maybeStartHls(src, mediaType);
    }
    this.onMediaTypeChange(mediaType);
  }

  componentWillUnmount() {
    this.destroyHls();
    clearTimeout(this.progressTimeout);
  }

  maybeStartHls(source, mediaType) {
    const { setMediaType } = this.props;
    const { hlsPlaying } = this.state;
    const isHlsSource = this.isHlsSource(source);
    const shouldPlayHls = mediaType === MediaTypes.HLS && isHlsSource;

    if (hlsPlaying) this.destroyHls();

    if (shouldPlayHls) {
      this.startHls(source);
    }

    if (mediaType === MediaTypes.HLS && !shouldPlayHls) {
      setMediaType && setMediaType(MediaTypes.MP4);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
     
      clipId,
     
      mediaType,
      currentResolution,
 
    } = this.props;
    const {
      reportedPlaybackRate,
      reportedVolume,
      ready,
      isPlaying,
      hlsPlaying,
    } = this.state;

    const newSource = this.getSrc(nextProps);

    // Handle URL change
    const sourceDidChange = clipId !== nextProps.clipId ||
      mediaType !== nextProps.mediaType ||
      this.getSrc(this.props) !== newSource;

  

    const resolutionDidChange =
      nextProps.currentResolution !== currentResolution;

    const mediaTypeDidChange = mediaType && mediaType !== nextProps.mediaType;

    if (mediaTypeDidChange) this.onMediaTypeChange(nextProps.mediaType);

    if (sourceDidChange && newSource) {
     
      this.maybeStartHls(newSource, mediaType);
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
        
        }
      );
    }

    if (!ready) {
      return;
    }

    // Handle playing change
    if (nextProps.playing && !isPlaying) {
      this.play(true);
    }
    if (!nextProps.playing && isPlaying) {
      this.pause(true);
    }

    // Handle volume change
    if (nextProps.volume !== null || nextProps.muted) {
      if (!nextProps.muted) {
        if (nextProps.volume !== reportedVolume) {
          this.setVolume(nextProps.volume);
        }
      }

      if (nextProps.muted && reportedVolume !== 0) {
        this.setVolume(0);
      }
    }

    if (nextProps.playbackRate !== reportedPlaybackRate) {
      this.setPlaybackRate(nextProps.playbackRate);
    }

    // Handle time change
    const timeDelta = Math.abs(nextProps.time - this.getPlayedSeconds());

    if (timeDelta >= 1) {
      this.seekTo(nextProps.time);
    }

    

    if (resolutionDidChange && hlsPlaying)
      this.onHlsLevelChange(nextProps.currentResolution);
  }

  isHlsSource = (source) => HLS_EXTENSIONS.test(source);

  destroyHls = () => {
    this.setState({ hlsPlaying: false });
    this.hls && this.hls.destroy();
  };

  startHls = async (source) => {
    const {
      setSupportedResolutions,
      setMediaType,
      setCurrentResolution,
      preferredResolutions,
      currentResolution,
      time,
    } = this.props;
    const sdkUrl = this.isSafari() ? HLS_SDK_URL_SAFARI : HLS_SDK_URL; //https://github.com/video-dev/hls.js/issues/1543
    const Hls = await getSDK(sdkUrl, "Hls");
    if (!Hls.isSupported()) return setMediaType && setMediaType(MediaTypes.MP4);
    this.Hls = Hls;

    this.hls = new Hls({ autoStartLoad: false });
    this.hls.loadSource(source);

    const videoElement = document.getElementById("video-element");
    this.hls.attachMedia(videoElement);

    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      this.hls.startLoad(time || 0);
      const autoLevel = { height: "Auto", index: -1 };
      const supportedResolutions = data.levels.map((r) => ({
        width: r.width,
        height: r.height,
        index: data.levels.indexOf(r),
      }));
      setSupportedResolutions &&
        setSupportedResolutions(supportedResolutions.concat(autoLevel));

      const preferredResolution = preferredResolutions.hls
        ? preferredResolutions.hls
        : null;
      const newResolution =
        preferredResolution &&
        supportedResolutions.find(
          (r) =>
            preferredResolution.width === r.width &&
            preferredResolution.height === r.height
        );

      if (!newResolution) {
        setCurrentResolution && setCurrentResolution(autoLevel);
        return;
      }

      this.hls && (this.hls.currentLevel = newResolution.index);
      const resolutionShouldChange = newResolution !== currentResolution;
      resolutionShouldChange &&
        setCurrentResolution &&
        setCurrentResolution(newResolution);
    });
    this.hls.on(Hls.Events.ERROR, this.handleHlsError.bind(this));
    this.hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
      this.setState({ hlsPlaying: true });
    });
  };

  onHlsLevelChange = ({ height, index }) => {
    const { currentResolution, setCurrentResolution } = this.props;

    if (height === currentResolution.height) {
      return;
    }
    this.hls && (this.hls.currentLevel = index);
    setCurrentResolution && setCurrentResolution({ height, index });
  };

  requestNewUrls = () => {
    const { setLoading } = this.props;
    setLoading && setLoading(true);
  };

  onMediaTypeChange = (newMediaType) => {
    const {
      setSupportedResolutions,
      setCurrentResolution,
      preferredResolutions,
    } = this.props;
    console.log("Mediatype: ", newMediaType);
    if (newMediaType !== MediaTypes.HLS) {
      setSupportedResolutions &&
        setSupportedResolutions(DefaultResolutions[newMediaType]);

      const resolution =
        preferredResolutions && preferredResolutions[newMediaType];
      setCurrentResolution && setCurrentResolution(resolution);
    }

    if (newMediaType === MediaTypes.WEBM || newMediaType === MediaTypes.MP4) {
      this.requestNewUrls();
    }
  };

  iosEndFullscreen = () => {
    this.props.setFullscreen(FullscreenState.NORMAL);
  };

  connectIosFullscreenExit() {
    const { onReady } = this.state;
    onReady.then(() => {
      const { current: player } = this.element;
      if (player.webkitExitFullscreen) {
        player.addEventListener(
          "webkitendfullscreen",
          this.iosEndFullscreen,
          false
        );
      }
    });
  }

  //#region Player API
  play() {
    const { onReady } = this.state;

    onReady.then(() => {
      //   const { adobeHeartbeat, clipId, title } = this.props
      const { current: player } = this.element;

      if (player) {
        const promise = player.play();

        // adobeHeartbeat && adobeHeartbeat.trackPlay()

        if (promise) {
          promise.catch((e) => {
            const { pause } = this.props;
            pause && pause(false);

           
          });
        }
      }
    });
  }

  pause() {
    const { onReady } = this.state;
   
    onReady.then(() => {
      const { current: player } = this.element;

      player && player.pause();

    });
  }

  setVolume = (percent) => {
    const { onReady } = this.state;

    onReady.then(() => {
      const { current: player } = this.element;
      player && percent === 0 ? (player.muted = true) : (player.muted = false); // player.volume is read only on mobile iOS
      player && isFinite(percent) && (player.volume = percent);
    });
  };

  setPlaybackRate = (rate) => {
    const { onReady } = this.state;

    onReady.then(() => {
      const { current: player } = this.element;

      player && (player.playbackRate = rate);
    });
  };

  onCaptionUpdate = (e) => {
    
  };

  toggleCaptions = (language) => {
    const { onReady } = this.state;

    onReady.then(() => {
      const { current: player } = this.element;

      player &&
        [...player.textTracks].forEach((track) => {
          if (track.mode === "showing" && track.language !== language.code)
            track.mode = "disabled";

          if (track.language === language.code) {
            track.oncuechange = this.onCaptionUpdate;
            track.mode = "hidden";
          } else {
            track.oncuechange = null;
          }
        });
    });
  };

  seekTo = (amount) => {
    const { onReady } = this.state;

    onReady.then(() => {
      const { current: player } = this.element;

      player && (player.currentTime = amount);
    });
  };

  getDuration() {
    const { current: player } = this.element;

    return player ? player.duration : 0;
  }

  getPlayedSeconds() {
    const { current: player } = this.element;

    return player ? player.currentTime : 0;
  }

  getSecondsLoaded() {
    const { current: player } = this.element;

    if (!player) {
      return 0;
    }

    const bufferedLength = player.buffered.length;

    if (bufferedLength === 0) return 0;

    let maxBuffered = 0,
      currentBuffered;
    for (let i = 0; i < bufferedLength; i++) {
      currentBuffered = player.buffered.end(i);
      maxBuffered =
        currentBuffered > maxBuffered ? currentBuffered : maxBuffered;
    }

    return maxBuffered;
  }
  //#endregion

  onRateChange = (rate) => {
    const { current: player } = this.element;

    player && this.setState({ reportedPlaybackRate: player.playbackRate });
  };

  onVolumeChange = (rate) => {
    const { current: player } = this.element;

    player && this.setState({ reportedVolume: player.volume });
  };

  onPlay = () => {
    const { setPlaying } = this.props;
    // const { isStagingEnv, urls, currentUrlIndex, userId } = this.props
    this.setState({ isPlaying: true });
    // const currentUrl = urls[currentUrlIndex || 0]
    // // sendPlaySuccessEvent(currentUrl, isStagingEnv, userId)
    setPlaying && setPlaying(true);
    this.updateProgress();
  };

  onPause = () => {
    const { setPlaying } = this.props;
    this.setState({ isPlaying: false });
    setPlaying && setPlaying(false);
  };

  onCanPlay = () => {
    const { setBuffering, buffering, loading, setLoading } =
      this.props;

    this.setState({ canPlay: true });
    if (loading) setLoading && setLoading(false);

    if (buffering) {
      setBuffering && setBuffering(false);
      //adobeHeartbeat && adobeHeartbeat.trackBufferComplete()
    }
  };

  onLoadedData = () => {
    const { setBuffering, buffering, setOverlay } = this.props;
    const { onReady } = this.state;

    if (!buffering) {
      this.setState({ isBuffering: true });
      setBuffering && setBuffering(true);
    }

    setOverlay && setOverlay(null);

    onReady.then(() => {
      const { current: player } = this.element;
      //adobeHeartbeat && adobeHeartbeat.initHeartbeat(player.duration)
    });
  };

  onEnded = (e) => {
    const {
     
      pause,
     
      clipId,
      time,
      currentLecture,
      views,
      course,
      route,
      setCurrentLecture,
      setNextUrl,
      setClipId,
      setSubtitle,
      history
    } = this.props;

    // end && end()

    pause && pause(false);
    console.log('History', history)
    // adobeHeartbeat && adobeHeartbeat.trackComplete()
    if (views && views.length) {
      const view = views.find((view) => view.lecture == currentLecture?.id);
      view && store.dispatch(updateVideoViews.initiate({
        id: view.id,
        lecture: currentLecture?.id,
        complete: true,
        progress: time,
      }));
      const lectures = course && course.sections?.flatMap(sec => sec.lectures)
      
      if (lectures && lectures.length) {
        const currentUrlIndex = lectures?.findIndex(lec => lec.id == currentLecture?.id)
        if(currentUrlIndex < (lectures.length - 1)) {
          const nextLectureIndex = currentUrlIndex + 1
          const lecture = lectures[nextLectureIndex]
          
          history?.push({
            search: "?" + new URLSearchParams({ clipid: lecture?.video.key })
          });
          lecture && setNextUrl(lecture.video_url)
          lecture && setCurrentLecture(lecture)
          lecture && setSubtitle(lecture?.title)
          lecture && setClipId(lecture?.video.key)
          
        } else {
          const lecture = lectures[0]
          history?.push({
            search: "?" + new URLSearchParams({ clipid: lecture?.video.key })
          });
          lecture && setNextUrl(lecture.video_url)
          lecture && setCurrentLecture(lecture)
          lecture && setSubtitle(lecture?.title)
          lecture && setClipId(lecture?.video.key)
        }
        
      }
    }

 
  };

  renderTrack(language) {
 
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
  };

  onLoadedMetadata = () => {
    const { ready, registerPlayer } = this.props;
    this.ready();

    const duration = this.getDuration();
    ready && ready(duration);

    const videoElement = document.getElementById("video-element");
    registerPlayer && registerPlayer(videoElement);
    // this.updateTracks(videoElement)
  };

  getSrc = ({  currentUrl } : VideoProps) => {
    // return currentUrlIndex !== null && urls && urls.length > 0 ? urls[currentUrlIndex].url : null
    let source = currentUrl;
    return source;
  };

  onSeeking = () => {
    // const { adobeHeartbeat } = this.props
    // adobeHeartbeat && adobeHeartbeat.trackSeekStart()
  };

  onSeeked = () => {
    // const { adobeHeartbeat } = this.props
    // adobeHeartbeat && adobeHeartbeat.trackSeekComplete()
  };

  updateProgress = () => {
    const { clipId, setTime, playing } = this.props;

    if (!playing) return;

    const reportedTime = this.getPlayedSeconds();
    setTime && setTime(reportedTime);
    reportedTime > 0 &&
      this.throttledSetClipProgress({
        clipId,
        videoSecondsWatched: reportedTime,
      });

    this.progressTimeout = setTimeout(this.updateProgress, 50);
  };

  onProgress = () => {
    const { setBufferedTime } = this.props;
    const bufferedTime = this.getSecondsLoaded();

    setBufferedTime && setBufferedTime(bufferedTime);
  };

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
    const {  setBuffering } = this.props;
    //adobeHeartbeat && adobeHeartbeat.trackBufferStart()
    setBuffering && setBuffering(true);
  };

  render() {
    // const { onVideoError, versionId, closedCaptioningLanguage, mediaType } = this.props
    const {
      playbackRate,
      mediaType,
      supportedResolutions,
      buffering,
      loading,
    } = this.props;

    let source = this.getSrc(this.props);
    //let source = "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4";

    if (!source) {
      return <div className={css.video} />;
    }

    if (mediaType === MediaTypes.HLS) source = undefined;

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
        onEnded={this.onEnded}
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
    );
  }
}


export default connector(withRouter((Video)));


