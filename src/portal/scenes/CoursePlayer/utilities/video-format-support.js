import { MediaTypes } from '../constants'
// import { postMetric } from '../analytics/metric'

const canPlayType = (videoEl, codec) => videoEl.canPlayType(codec) === 'probably'

export const getCodecSupport = (videoEl = document.createElement('video')) => {
  return {
    h264: canPlayType(videoEl, 'video/mp4; codecs="avc1.42E01E"'),
    aac: canPlayType(videoEl, 'audio/mp4; codecs="mp4a.40.2"'),
    vp8: canPlayType(videoEl, 'video/webm; codecs="vp8, vorbis"'),
  }
}

const recordWebmFallback = () => {
  const hostname = window.location.hostname
  const isStagingEnv = hostname && (hostname.includes('stage') || hostname.includes('staging'))
//   postMetric({
//     functionName: 'webmFallbackEvent',
//     latency: 1,
//     tags: {
//       format: 'webm',
//     },
//   }, isStagingEnv)
}

export const selectVideoFormat = (codecSupportFn = getCodecSupport) => {
  const { h264, aac, vp8 } = codecSupportFn()

  if (h264 && aac) return MediaTypes.HLS
  if (h264) return MediaTypes.MP4
  if (vp8) {
    recordWebmFallback()
    return MediaTypes.WEBM
  }
  return MediaTypes.HLS
}
