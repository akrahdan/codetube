"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.togglePlayPause = exports.syncSettings = exports.setMediaType = exports.setSupportedResolutions = exports.setPreferredResolutions = exports.setCurrentResolution = exports.setPlaying = exports.setLoading = exports.setAutoplay = exports.setContainerSize = exports.setOverlay = exports.setClipProgress = exports.setBuffering = exports.setBufferedTime = exports.seek = exports.setFullscreen = exports.toggleFullscreen = exports.setInteractionMode = exports.hideUI = exports.showUI = exports.registerPlayer = exports.seekStart = exports.seekEnd = exports.fastRewind = exports.fastForward = exports.ready = exports.setTime = exports.setDuration = exports.toggleMute = exports.setPreviousVolume = exports.setVolume = exports.setVolumeSliderActive = exports.setActiveMenu = exports.setPlaybackSpeed = exports.pause = exports.play = exports.selectPlayer = exports.playerSlice = exports.initialState = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var clamp_1 = require("portal/scenes/CoursePlayer/utilities/clamp");
var constants_1 = require("portal/scenes/CoursePlayer/constants");
var sync_clip_progress_1 = require("portal/scenes/CoursePlayer/utilities/sync-clip-progress");
var aspect_ratio_1 = require("portal/scenes/CoursePlayer/utilities/aspect-ratio");
var find_breakpoint_1 = require("portal/scenes/CoursePlayer/utilities/find-breakpoint");
var video_format_support_1 = require("portal/scenes/CoursePlayer/utilities/video-format-support");
var validModes = Object.values(constants_1.InteractionModes);
var mediaType = video_format_support_1.selectVideoFormat();
console.log("VideoFormat: ", constants_1.DefaultResolutions[mediaType][0]);
function includes(modes, mode) {
    return !!~modes.indexOf(mode);
}
exports.initialState = __assign(__assign({ playing: false, playbackSpeed: 1.0, activeMenu: null, volumeSliderActive: false, muted: false, previousVolume: null, time: 0, duration: 0, bufferedTime: 0, playheadStart: 0, overlay: null, videoPlayer: null, seekedEvent: null, seekingEvent: null, clipProgress: 0, buffering: false, containerSize: null, breakpoint: null, playerSize: null, layout: null, loading: false, userAutoplaySetting: false }, constants_1.Defaults), { currentResolution: constants_1.DefaultResolutions[mediaType][0], supportedResolutions: null, mediaType: mediaType, settings: null });
exports.playerSlice = toolkit_1.createSlice({
    name: "player",
    initialState: exports.initialState,
    reducers: {
        play: function (state, action) {
            var icon = "PLAY";
            if (action.payload) {
                state.overlay = { icon: icon, key: Math.random(), fade: true };
                console.log("Play: ", state.overlay);
            }
            state.playing = true;
            state.playheadStart = state.time;
        },
        pause: function (state, action) {
            var icon = "PAUSE";
            if (action.payload) {
                state.overlay = { icon: icon, key: Math.random(), fade: true };
                console.log("Pause: ", state.overlay);
            }
            state.playing = false;
            state.playheadStart = state.time;
        },
        setPlaybackSpeed: function (state, action) {
            state.playbackSpeed = action.payload;
        },
        setPlaying: function (state, action) {
            state.playing = action.payload;
        },
        syncSettings: function (state, action) {
            state.settings = action.payload;
        },
        setMediaType: function (state, action) {
            state.mediaType = action.payload;
        },
        setPreferredResolutions: function (state, action) {
            state.preferredResolutions = action.payload;
        },
        setCurrentResolution: function (state, action) {
            state.currentResolution = action.payload;
        },
        setSupportedResolutions: function (state, action) {
            state.supportedResolutions = action.payload;
        },
        setActiveMenu: function (state, action) {
            state.activeMenu = action.payload;
        },
        setVolumeSliderActive: function (state, action) {
            state.volumeSliderActive = action.payload;
        },
        setVolume: function (state, action) {
            var clamped = clamp_1.clamp(action.payload, 0, 1);
            var muted = clamped === 0;
            state.volume = clamped;
            state.muted = muted;
        },
        setPreviousVolume: function (state, action) {
            var clamped = clamp_1.clamp(action.payload, 0, 1);
            var muted = clamped === 0;
            state.volume = clamped;
            state.muted = muted;
        },
        setInteractionMode: function (state, action) {
            if (!includes(validModes, action.payload)) {
                throw new Error(action.payload + " not in valid list: " + validModes.join());
            }
            state.interactionMode = action.payload;
        },
        showUI: function (state, action) {
            state.visible = true;
        },
        toggleFullscreen: function (state, action) {
            state.fullscreenState =
                state.fullscreenState === constants_1.FullscreenState.FULLSCREEN
                    ? constants_1.FullscreenState.NORMAL
                    : constants_1.FullscreenState.FULLSCREEN;
        },
        hideUI: function (state, action) {
            state.visible = false;
        },
        setDuration: function (state, action) {
            state.duration = action.payload;
        },
        setTime: function (state, action) {
            state.time = action.payload;
        },
        setContainerSize: function (state, action) {
            var containerSize = action.payload;
            console.log("Container: ", containerSize);
            if (containerSize.width === 0 &&
                containerSize.height === 0 &&
                state.containerSize) {
                containerSize = state.containerSize;
            }
            var breakpoint = find_breakpoint_1.findBreakpoint(containerSize);
            state.breakpoint = breakpoint;
            state.playerSize = aspect_ratio_1.calculateAspectRatio(containerSize);
            state.containerSize = containerSize;
            state.layout = breakpoint.height + "p";
        },
        setBufferedTime: function (state, action) {
            state.bufferedTime = action.payload;
        },
        ready: function (state, action) {
            state.playheadStart = state.time;
            state.duration = action.payload;
        },
        registerPlayer: function (state, action) {
            state.seekedEvent = new Event("ps-seeked");
            state.seekingEvent = new Event("ps-seeking");
            state.videoPlayer = action.payload;
        },
        seekStart: function (state, action) {
            var seekingEvent = state.seekingEvent, videoPlayer = state.videoPlayer;
            videoPlayer && videoPlayer.dispatchEvent(seekingEvent);
        },
        seekEnd: function (state, action) {
            var seekedEvent = state.seekedEvent, videoPlayer = state.videoPlayer;
            videoPlayer && videoPlayer.dispatchEvent(seekedEvent);
        },
        seek: function (state, action) {
            state.playheadStart = action.payload * state.duration;
        },
        setOverlay: function (state, action) {
            state.overlay = action.payload;
        },
        setBuffering: function (state, action) {
            state.buffering = action.payload;
        },
        setLoading: function (state, action) {
            state.loading = action.payload;
        },
        setAutoplay: function (state, action) {
            state.userAutoplaySetting = action.payload;
        },
        setClipProgress: function (state, action) {
            state.clipProgress = sync_clip_progress_1.buildClipProgress(state.clipProgress, action.payload, state.duration);
        },
        setFullscreen: function (state, action) {
            var validFullscreenStates = Object.values(constants_1.FullscreenState);
            if (!includes(validFullscreenStates, action.payload)) {
                throw new Error(action.payload + " not in valid list: " + validFullscreenStates.join());
            }
            state.fullscreenState = action.payload;
        },
        fastForward: function (state, action) {
            var time = state.time, duration = state.duration;
            var forwardTime = time + 10;
            var newTime = forwardTime > duration ? duration : forwardTime;
            state.playheadStart = newTime;
            state.time = newTime;
            state.overlay = {
                icon: "FWD",
                key: Math.random(),
                fade: true
            };
        },
        fastRewind: function (state, action) {
            var time = state.time, duration = state.duration;
            var startTime = 0;
            var rewindTime = time - 10;
            var newTime = rewindTime < startTime ? startTime : rewindTime;
            state.playheadStart = newTime;
            state.time = newTime;
            state.overlay = {
                icon: "BACK",
                key: Math.random(),
                fade: true
            };
        },
        toggleMute: function (state, action) {
            if (state.muted) {
                var clamped = state.previousVolume || constants_1.Defaults.volume;
                var muted = clamped === 0;
                state.volume = clamped;
                state.muted = muted;
            }
            else {
                state.muted = true;
                state.previousVolume = state.volume;
                state.volume = 0;
            }
        }
    }
});
exports.selectPlayer = function (state) { return state.player; };
exports.play = (_a = exports.playerSlice.actions, _a.play), exports.pause = _a.pause, exports.setPlaybackSpeed = _a.setPlaybackSpeed, exports.setActiveMenu = _a.setActiveMenu, exports.setVolumeSliderActive = _a.setVolumeSliderActive, exports.setVolume = _a.setVolume, exports.setPreviousVolume = _a.setPreviousVolume, exports.toggleMute = _a.toggleMute, exports.setDuration = _a.setDuration, exports.setTime = _a.setTime, exports.ready = _a.ready, exports.fastForward = _a.fastForward, exports.fastRewind = _a.fastRewind, exports.seekEnd = _a.seekEnd, exports.seekStart = _a.seekStart, exports.registerPlayer = _a.registerPlayer, exports.showUI = _a.showUI, exports.hideUI = _a.hideUI, exports.setInteractionMode = _a.setInteractionMode, exports.toggleFullscreen = _a.toggleFullscreen, exports.setFullscreen = _a.setFullscreen, exports.seek = _a.seek, exports.setBufferedTime = _a.setBufferedTime, exports.setBuffering = _a.setBuffering, exports.setClipProgress = _a.setClipProgress, exports.setOverlay = _a.setOverlay, exports.setContainerSize = _a.setContainerSize, exports.setAutoplay = _a.setAutoplay, exports.setLoading = _a.setLoading, exports.setPlaying = _a.setPlaying, exports.setCurrentResolution = _a.setCurrentResolution, exports.setPreferredResolutions = _a.setPreferredResolutions, exports.setSupportedResolutions = _a.setSupportedResolutions, exports.setMediaType = _a.setMediaType, exports.syncSettings = _a.syncSettings;
exports.togglePlayPause = function () { return function (dispatch, getState) {
    var state = getState().player;
    if (state.playing) {
        dispatch(exports.pause());
    }
    else {
        dispatch(exports.play());
    }
}; };
exports["default"] = exports.playerSlice.reducer;
