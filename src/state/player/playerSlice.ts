import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import { StringChain, stubFalse, without } from "lodash";
import { AppThunk, RootState } from "store";
import { clamp } from "portal/scenes/CoursePlayer/utilities/clamp";
import {
  InteractionModes,
  Defaults,
  FullscreenState,
  DefaultResolutions
} from "portal/scenes/CoursePlayer/constants";
import { buildClipProgress } from "portal/scenes/CoursePlayer/utilities/sync-clip-progress";
import { calculateAspectRatio } from "portal/scenes/CoursePlayer/utilities/aspect-ratio";
import { findBreakpoint } from "portal/scenes/CoursePlayer/utilities/find-breakpoint";
import { selectVideoFormat } from "portal/scenes/CoursePlayer/utilities/video-format-support";
import { CoursePlayerResponse, CourseResponse, coursesApi } from "services/courses";
import { Url } from "url";

const validModes = Object.values(InteractionModes);
const mediaType = selectVideoFormat()
console.log("VideoFormat: ", DefaultResolutions[mediaType][0])
function includes(modes, mode) {
  return !!~modes.indexOf(mode);
}

export interface PlayerState {
  playing: boolean;
  currentUrl: string;
  currentUrlIndex: number;
  course: CoursePlayerResponse
  playbackSpeed: number;
  activeMenu: string;
  volumeSliderActive: boolean;
  volume: number;
  muted: boolean;
  previousVolume: number;
  interactionMode: string;
  resolution: ResolutionH;
  time: number;
  bufferedTime: number;
  duration: number;
  playheadStart: number;
  overlay: Overlay;
  videoPlayer: any;
  seekedEvent: Event;
  seekingEvent: Event;
  visible: boolean;
  fullscreenState: string;
  clipProgress: number;
  buffering: boolean;
  containerSize: ContainerSize;
  breakpoint: ContainerSize;
  playerSize: ContainerSize;
  layout: string;
  loading: boolean;
  userAutoplaySetting: boolean;
  preferredResolutions: any;
  currentResolution: any;
  supportedResolutions: Resolution[],
  mediaType: string,
  settings: any
}

export interface Overlay {
  icon: string;
  key: number;
  fade: boolean;
}

interface ContainerSize {
  width: number;
  height: number;
}

interface ResolutionH {
  width: number;
  height: number;
  index: number;
}
interface Resolution {
    width?: string;
    height: string;
    index: number;
  }

export const initialState: PlayerState = {
  playing: false,
  playbackSpeed: 1.0,
  activeMenu: null,
  volumeSliderActive: false,
  course: null,
  muted: false,
  currentUrl: null,
  currentUrlIndex: 0,
  previousVolume: null,

  time: 0,
  duration: 0,
  bufferedTime: 0,
  playheadStart: 0,
  overlay: null,
  videoPlayer: null,
  seekedEvent: null,
  seekingEvent: null,

  clipProgress: 0,
  buffering: false,
  containerSize: null,
  breakpoint: null,
  playerSize: null,
  layout: null,
  loading: false,
  userAutoplaySetting: false,
  ...Defaults,
  currentResolution: DefaultResolutions[mediaType][0],
  supportedResolutions: null,
  mediaType,
  settings: null
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<boolean>) => {
      const icon = "PLAY";

      if (action.payload) {
        state.overlay = { icon, key: Math.random(), fade: true };
        console.log("Play: ", state.overlay)
      }
      state.playing = true;
      state.playheadStart = state.time;
    },

    pause: (state, action: PayloadAction<boolean>) => {
      const icon = "PAUSE";

      if (action.payload) {
        state.overlay = { icon, key: Math.random(), fade: true };
        console.log("Pause: ", state.overlay)
      }
      state.playing = false;
      state.playheadStart = state.time;
    },

    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },

    setCurrentUrl: (state, action: PayloadAction<string>) => {
     state.currentUrl = action.payload
    },

    setCurrentUrlIndex: (state, action: PayloadAction<number>) => {
      state.currentUrlIndex = action.payload
     },

    setPlaying: (state, action: PayloadAction<boolean>) => {
        state.playing = action.payload;
    },

    syncSettings: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },

    setMediaType: (state, action: PayloadAction<string>) => {
      state.mediaType = action.payload;
  },

    setPreferredResolutions: (state, action: PayloadAction<any>) => {
        state.preferredResolutions = action.payload;
    },

    setCurrentResolution: (state, action: PayloadAction<any>) => {
        state.currentResolution = action.payload;
    },

    setSupportedResolutions: (state, action: PayloadAction<Resolution[]>) => {
        state.supportedResolutions = action.payload;
    },

    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    setVolumeSliderActive: (state, action: PayloadAction<boolean>) => {
      state.volumeSliderActive = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      const clamped = clamp(action.payload, 0, 1);
      const muted = clamped === 0;
      state.volume = clamped;
      state.muted = muted;
    },
    setPreviousVolume: (state, action: PayloadAction<number>) => {
      const clamped = clamp(action.payload, 0, 1);
      const muted = clamped === 0;
      state.volume = clamped;
      state.muted = muted;
    },
    setInteractionMode: (state, action: PayloadAction<string>) => {
      if (!includes(validModes, action.payload)) {
        throw new Error(
          `${action.payload} not in valid list: ${validModes.join()}`
        );
      }
      state.interactionMode = action.payload;
    },

    showUI: (state, action: PayloadAction<void>) => {
      state.visible = true;
    },

    toggleFullscreen: (state, action: PayloadAction<void>) => {
      state.fullscreenState =
        state.fullscreenState === FullscreenState.FULLSCREEN
          ? FullscreenState.NORMAL
          : FullscreenState.FULLSCREEN;
    },

    hideUI: (state, action: PayloadAction<void>) => {
      state.visible = false;
    },

    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },

    setContainerSize: (state, action: PayloadAction<ContainerSize>) => {
      var containerSize = action.payload;
      console.log("Container: ", containerSize)
      if (
        containerSize.width === 0 &&
        containerSize.height === 0 &&
        state.containerSize
      ) {
        containerSize = state.containerSize;
      }
      const breakpoint = findBreakpoint(containerSize);
      state.breakpoint = breakpoint
      state.playerSize = calculateAspectRatio(containerSize);
      state.containerSize = containerSize;
      state.layout = `${breakpoint.height}p`;
    },

    setBufferedTime: (state, action: PayloadAction<number>) => {
      state.bufferedTime = action.payload;
    },

    ready: (state, action: PayloadAction<number>) => {
      state.playheadStart = state.time;
      state.duration = action.payload;
    },
    registerPlayer: (state, action: PayloadAction<HTMLVideoElement>) => {
      state.seekedEvent = new Event("ps-seeked");
      state.seekingEvent = new Event("ps-seeking");
      state.videoPlayer = action.payload;
    },

    seekStart: (state, action: PayloadAction<void>) => {
      const { seekingEvent, videoPlayer } = state;

      videoPlayer && videoPlayer.dispatchEvent(seekingEvent);
    },

    seekEnd: (state, action: PayloadAction<void>) => {
      const { seekedEvent, videoPlayer } = state;

      videoPlayer && videoPlayer.dispatchEvent(seekedEvent);
    },

    seek: (state, action: PayloadAction<number>) => {
      state.playheadStart = action.payload * state.duration;
    },

    setOverlay: (state, action: PayloadAction<Overlay>) => {
      state.overlay = action.payload;
    },

    setBuffering: (state, action: PayloadAction<boolean>) => {
      state.buffering = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },

    setAutoplay: (state, action: PayloadAction<boolean>) => {
        state.userAutoplaySetting = action.payload;
    },

    setClipProgress: (state, action: PayloadAction<number>) => {
      state.clipProgress = buildClipProgress(
        state.clipProgress,
        action.payload,
        state.duration
      );
    },

    setFullscreen: (state, action: PayloadAction<string>) => {
      const validFullscreenStates = Object.values(FullscreenState);

      if (!includes(validFullscreenStates, action.payload)) {
        throw new Error(
          `${action.payload} not in valid list: ${validFullscreenStates.join()}`
        );
      }
      state.fullscreenState = action.payload;
    },

    fastForward: (state, action: PayloadAction<void>) => {
      const { time, duration } = state;

      const forwardTime = time + 10;

      const newTime = forwardTime > duration ? duration : forwardTime;
      state.playheadStart = newTime;
      state.time = newTime;
      state.overlay = {
        icon: "FWD",
        key: Math.random(),
        fade: true,
      };
    },

    fastRewind: (state, action: PayloadAction<void>) => {
      const { time, duration } = state;

      const startTime = 0;
      const rewindTime = time - 10;

      const newTime = rewindTime < startTime ? startTime : rewindTime;
      state.playheadStart = newTime;
      state.time = newTime;
      state.overlay = {
        icon: "BACK",
        key: Math.random(),
        fade: true,
      };
    },

    toggleMute: (state, action: PayloadAction<void>) => {
      if (state.muted) {
        const clamped = state.previousVolume || Defaults.volume;
        const muted = clamped === 0;
        state.volume = clamped;
        state.muted = muted;
      } else {
        state.muted = true;
        state.previousVolume = state.volume;
        state.volume = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        coursesApi.endpoints.fetchPlayerCourse.matchFulfilled,
        (state, { payload }) => {
          state.course = payload;
        }
      )
      
  },

});

export const selectPlayer = (state: RootState) => state.player;

export const {
  play,
  pause,
  setPlaybackSpeed,
  setActiveMenu,
  setVolumeSliderActive,
  setVolume,
  setPreviousVolume,
  toggleMute,
  setDuration,
  setTime,
  ready,
  fastForward,
  fastRewind,
  seekEnd,
  seekStart,
  registerPlayer,
  showUI,
  hideUI,
  setInteractionMode,
  toggleFullscreen,
  setFullscreen,
  seek,
  setBufferedTime,
  setBuffering,
  setClipProgress,
  setOverlay,
  setContainerSize,
  setAutoplay,
  setLoading,
  setPlaying,
  setCurrentResolution,
  setPreferredResolutions,
  setSupportedResolutions,
  setMediaType,
  syncSettings,
  setCurrentUrl,
  setCurrentUrlIndex
} = playerSlice.actions;

export const togglePlayPause = (): AppThunk => (dispatch, getState) => {
  const state = getState().player;
  if (state.playing) {
    dispatch(pause());
  } else {
    dispatch(play());
  }
};

export default playerSlice.reducer;

export const selectPlayerCourse = (state: RootState) => state.player.course
