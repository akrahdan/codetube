"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectVideoFormat = exports.getCodecSupport = void 0;

var _constants = require("../constants");

var canPlayType = function canPlayType(videoEl, codec) {
  return videoEl.canPlayType(codec) === 'probably';
};

var getCodecSupport = function getCodecSupport() {
  var videoEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('video');
  return {
    h264: canPlayType(videoEl, 'video/mp4; codecs="avc1.42E01E"'),
    aac: canPlayType(videoEl, 'audio/mp4; codecs="mp4a.40.2"'),
    vp8: canPlayType(videoEl, 'video/webm; codecs="vp8, vorbis"')
  };
};

exports.getCodecSupport = getCodecSupport;

var recordWebmFallback = function recordWebmFallback() {
  var hostname = window.location.hostname;
  var isStagingEnv = hostname && (hostname.includes('stage') || hostname.includes('staging')); //   postMetric({
  //     functionName: 'webmFallbackEvent',
  //     latency: 1,
  //     tags: {
  //       format: 'webm',
  //     },
  //   }, isStagingEnv)
};

var selectVideoFormat = function selectVideoFormat() {
  var codecSupportFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCodecSupport;

  var _codecSupportFn = codecSupportFn(),
      h264 = _codecSupportFn.h264,
      aac = _codecSupportFn.aac,
      vp8 = _codecSupportFn.vp8;

  if (h264 && aac) return _constants.MediaTypes.HLS;
  if (h264) return _constants.MediaTypes.MP4;

  if (vp8) {
    recordWebmFallback();
    return _constants.MediaTypes.WEBM;
  }

  return _constants.MediaTypes.HLS;
};

exports.selectVideoFormat = selectVideoFormat;