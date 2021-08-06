

export const FullscreenState = {
  FULLSCREEN: 'FULLSCREEN',
  NORMAL: 'NORMAL',
}

export const InteractionModes = {
  KEYBOARD: 'KEYBOARD',
  MOUSE: 'MOUSE',
  TOUCH: 'TOUCH',
}

export const Resolutions = {
  HIGH: { height: 720, width: 1280, index: 0 },
  MEDIUM: { height: 480, width: 853, index: 1 },
  LOW: { height: 360, width: 640, index: 2 },
}

export const FourByThreeBackups = {
  '1280x720': '1024x768',
  '854x480': '848x640',
  '853x480': '848x640',
  '640x360': '432x320',
}

export const HLS_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.12.4/hls.min.js'
export const HLS_SDK_URL_SAFARI = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.8.0/hls.min.js'

export const KNOWLEDGE_OWL_URL = '//s2.pluralsight.com/knowledge-owl/kowidget.v1.6.1.js'

export const MediaTypes = {
  MP4: 'mp4',
  WEBM: 'webm',
  HLS: 'hls',
}

export const DefaultResolutions = {
  [MediaTypes.MP4]: [Resolutions.HIGH, Resolutions.MEDIUM, Resolutions.LOW],
  [MediaTypes.WEBM]: [Resolutions.HIGH],
  [MediaTypes.HLS]: [{ height: 'Auto', index: -1 }],
}

export const Menus = {
  SETTINGS: 'SETTINGS',
  PLAYBACK_SPEED: 'PLAYBACK_SPEED',
  CLOSED_CAPTIONING: 'CLOSED_CAPTIONING',
  CLOSED_CAPTIONING_LANGUAGE: 'CLOSED_CAPTIONING_LANGUAGE',
  NONE: null,
}

export const Errors = {
  UNKNOWN: 1,
  NETWORK: 2,
  FORBIDDEN: 403,
  TOO_MANY_REQUESTS: 429,
  UNAUTHENTICATED: 401,
}

export const Defaults = {
  volume: 0.5,
  playbackSpeed: 1.0,
  fullscreenState: FullscreenState.NORMAL,
  interactionMode: InteractionModes.MOUSE,
  resolution: Resolutions.HIGH,
  visible: false,
  preferredResolutions: {
    [MediaTypes.MP4]: DefaultResolutions[MediaTypes.MP4][0],
    [MediaTypes.WEBM]: DefaultResolutions[MediaTypes.WEBM][0],
    [MediaTypes.HLS]: DefaultResolutions[MediaTypes.HLS][0],
  },
}

export const AnalyticsEvents = {
  ABANDON: 'ABANDON',
  END: 'END',
  HEARTBEAT: 'HEARTBEAT',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  QUALITY_SWITCH: 'QUALITY_SWITCH',
  SEEK: 'SEEK',
  SESSION_STARTED: 'SESSION_STARTED',
  PLAY_FAILURE: 'PLAY_FAILURE',
  DELIVERY_FAILURE: 'DELIVERY_FAILURE',
}

export const AnalyticsFacadeEvents = {
  [AnalyticsEvents.ABANDON]: 'player_abandoned',
  [AnalyticsEvents.END]: 'player_completed',
  [AnalyticsEvents.HEARTBEAT]: 'player_heartbeat',
  [AnalyticsEvents.PAUSE]: 'player_paused',
  [AnalyticsEvents.PLAY]: 'player_link_clicked',
  [AnalyticsEvents.QUALITY_SWITCH]: 'player_quality_switch',
  [AnalyticsEvents.SEEK]: 'player_scrubbed',
  [AnalyticsEvents.SESSION_STARTED]: 'player_session_started',
  [AnalyticsEvents.GENERIC_CLICK]: 'generic_click',
}

export const Analytics = {
  debounce: 500,
  heartbeat: 10 * 1000,
  platform: 'WEB',
  mode: 'ONLINE',
  version: 'v0.2',
  endpoint: '/video/events/clipview',
}

export const TOUCH_TIMEOUT_DURATION = 3000
export const MOUSE_TIMEOUT_DURATION = 3000

export const PlaybackSpeedStops = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]

export const VOLUME_STEP = 0.15

export const muxDataKeyDevelopment = 'pisfpnaq0t8njq5r7m83sf6kh'
export const muxDataKeyStaging = '6shgjieilsl2rbr1m84i2ip78'
export const muxDataKeyProduction = 'lqrjhpre582auf377f2rh0rkt'

export const Subdomain = window.location.host.split('.')[0]

export const AnalyticsFacadeKeyStaging = 'D85a8FDQrDeMzkihHnm5r2ulc2APP2vt'
export const AnalyticsFacadeKeyProduction = 'n2LLbFI1MDxFKBLzI0es2Z7PrDhu6jEA'



export default {
  Analytics,
  FullscreenState,
  InteractionModes,
  Resolutions,
  TOUCH_TIMEOUT_DURATION,
  PlaybackSpeedStops,
}

export const ONE_HR_MS = 60 * 60 * 1000
