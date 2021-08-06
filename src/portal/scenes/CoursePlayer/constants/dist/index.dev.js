"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ONE_HR_MS = exports["default"] = exports.AnalyticsFacadeKeyProduction = exports.AnalyticsFacadeKeyStaging = exports.Subdomain = exports.muxDataKeyProduction = exports.muxDataKeyStaging = exports.muxDataKeyDevelopment = exports.VOLUME_STEP = exports.PlaybackSpeedStops = exports.MOUSE_TIMEOUT_DURATION = exports.TOUCH_TIMEOUT_DURATION = exports.Analytics = exports.AnalyticsFacadeEvents = exports.AnalyticsEvents = exports.Defaults = exports.Errors = exports.Menus = exports.DefaultResolutions = exports.MediaTypes = exports.KNOWLEDGE_OWL_URL = exports.HLS_SDK_URL_SAFARI = exports.HLS_SDK_URL = exports.FourByThreeBackups = exports.Resolutions = exports.InteractionModes = exports.FullscreenState = void 0;

var _DefaultResolutions, _preferredResolutions, _AnalyticsFacadeEvent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FullscreenState = {
  FULLSCREEN: 'FULLSCREEN',
  NORMAL: 'NORMAL'
};
exports.FullscreenState = FullscreenState;
var InteractionModes = {
  KEYBOARD: 'KEYBOARD',
  MOUSE: 'MOUSE',
  TOUCH: 'TOUCH'
};
exports.InteractionModes = InteractionModes;
var Resolutions = {
  HIGH: {
    height: 720,
    width: 1280,
    index: 0
  },
  MEDIUM: {
    height: 480,
    width: 853,
    index: 1
  },
  LOW: {
    height: 360,
    width: 640,
    index: 2
  }
};
exports.Resolutions = Resolutions;
var FourByThreeBackups = {
  '1280x720': '1024x768',
  '854x480': '848x640',
  '853x480': '848x640',
  '640x360': '432x320'
};
exports.FourByThreeBackups = FourByThreeBackups;
var HLS_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.12.4/hls.min.js';
exports.HLS_SDK_URL = HLS_SDK_URL;
var HLS_SDK_URL_SAFARI = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.8.0/hls.min.js';
exports.HLS_SDK_URL_SAFARI = HLS_SDK_URL_SAFARI;
var KNOWLEDGE_OWL_URL = '//s2.pluralsight.com/knowledge-owl/kowidget.v1.6.1.js';
exports.KNOWLEDGE_OWL_URL = KNOWLEDGE_OWL_URL;
var MediaTypes = {
  MP4: 'mp4',
  WEBM: 'webm',
  HLS: 'hls'
};
exports.MediaTypes = MediaTypes;
var DefaultResolutions = (_DefaultResolutions = {}, _defineProperty(_DefaultResolutions, MediaTypes.MP4, [Resolutions.HIGH, Resolutions.MEDIUM, Resolutions.LOW]), _defineProperty(_DefaultResolutions, MediaTypes.WEBM, [Resolutions.HIGH]), _defineProperty(_DefaultResolutions, MediaTypes.HLS, [{
  height: 'Auto',
  index: -1
}]), _DefaultResolutions);
exports.DefaultResolutions = DefaultResolutions;
var Menus = {
  SETTINGS: 'SETTINGS',
  PLAYBACK_SPEED: 'PLAYBACK_SPEED',
  CLOSED_CAPTIONING: 'CLOSED_CAPTIONING',
  CLOSED_CAPTIONING_LANGUAGE: 'CLOSED_CAPTIONING_LANGUAGE',
  NONE: null
};
exports.Menus = Menus;
var Errors = {
  UNKNOWN: 1,
  NETWORK: 2,
  FORBIDDEN: 403,
  TOO_MANY_REQUESTS: 429,
  UNAUTHENTICATED: 401
};
exports.Errors = Errors;
var Defaults = {
  volume: 0.5,
  playbackSpeed: 1.0,
  fullscreenState: FullscreenState.NORMAL,
  interactionMode: InteractionModes.MOUSE,
  resolution: Resolutions.HIGH,
  visible: false,
  preferredResolutions: (_preferredResolutions = {}, _defineProperty(_preferredResolutions, MediaTypes.MP4, DefaultResolutions[MediaTypes.MP4][0]), _defineProperty(_preferredResolutions, MediaTypes.WEBM, DefaultResolutions[MediaTypes.WEBM][0]), _defineProperty(_preferredResolutions, MediaTypes.HLS, DefaultResolutions[MediaTypes.HLS][0]), _preferredResolutions)
};
exports.Defaults = Defaults;
var AnalyticsEvents = {
  ABANDON: 'ABANDON',
  END: 'END',
  HEARTBEAT: 'HEARTBEAT',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  QUALITY_SWITCH: 'QUALITY_SWITCH',
  SEEK: 'SEEK',
  SESSION_STARTED: 'SESSION_STARTED',
  PLAY_FAILURE: 'PLAY_FAILURE',
  DELIVERY_FAILURE: 'DELIVERY_FAILURE'
};
exports.AnalyticsEvents = AnalyticsEvents;
var AnalyticsFacadeEvents = (_AnalyticsFacadeEvent = {}, _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.ABANDON, 'player_abandoned'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.END, 'player_completed'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.HEARTBEAT, 'player_heartbeat'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.PAUSE, 'player_paused'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.PLAY, 'player_link_clicked'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.QUALITY_SWITCH, 'player_quality_switch'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.SEEK, 'player_scrubbed'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.SESSION_STARTED, 'player_session_started'), _defineProperty(_AnalyticsFacadeEvent, AnalyticsEvents.GENERIC_CLICK, 'generic_click'), _AnalyticsFacadeEvent);
exports.AnalyticsFacadeEvents = AnalyticsFacadeEvents;
var Analytics = {
  debounce: 500,
  heartbeat: 10 * 1000,
  platform: 'WEB',
  mode: 'ONLINE',
  version: 'v0.2',
  endpoint: '/video/events/clipview'
};
exports.Analytics = Analytics;
var TOUCH_TIMEOUT_DURATION = 3000;
exports.TOUCH_TIMEOUT_DURATION = TOUCH_TIMEOUT_DURATION;
var MOUSE_TIMEOUT_DURATION = 3000;
exports.MOUSE_TIMEOUT_DURATION = MOUSE_TIMEOUT_DURATION;
var PlaybackSpeedStops = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];
exports.PlaybackSpeedStops = PlaybackSpeedStops;
var VOLUME_STEP = 0.15;
exports.VOLUME_STEP = VOLUME_STEP;
var muxDataKeyDevelopment = 'pisfpnaq0t8njq5r7m83sf6kh';
exports.muxDataKeyDevelopment = muxDataKeyDevelopment;
var muxDataKeyStaging = '6shgjieilsl2rbr1m84i2ip78';
exports.muxDataKeyStaging = muxDataKeyStaging;
var muxDataKeyProduction = 'lqrjhpre582auf377f2rh0rkt';
exports.muxDataKeyProduction = muxDataKeyProduction;
var Subdomain = window.location.host.split('.')[0];
exports.Subdomain = Subdomain;
var AnalyticsFacadeKeyStaging = 'D85a8FDQrDeMzkihHnm5r2ulc2APP2vt';
exports.AnalyticsFacadeKeyStaging = AnalyticsFacadeKeyStaging;
var AnalyticsFacadeKeyProduction = 'n2LLbFI1MDxFKBLzI0es2Z7PrDhu6jEA';
exports.AnalyticsFacadeKeyProduction = AnalyticsFacadeKeyProduction;
var _default = {
  Analytics: Analytics,
  FullscreenState: FullscreenState,
  InteractionModes: InteractionModes,
  Resolutions: Resolutions,
  TOUCH_TIMEOUT_DURATION: TOUCH_TIMEOUT_DURATION,
  PlaybackSpeedStops: PlaybackSpeedStops
};
exports["default"] = _default;
var ONE_HR_MS = 60 * 60 * 1000;
exports.ONE_HR_MS = ONE_HR_MS;