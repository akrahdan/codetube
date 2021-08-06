"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.formatA11yTimeString = formatA11yTimeString;

function formatTime(time) {
  time = Math.round(time || 0);
  var minutes = Math.floor(time / 60);
  var seconds = '0' + (time - minutes * 60);
  return minutes + ':' + seconds.substr(-2);
}

function formatA11yTimeString(timeInSeconds) {
  if (timeInSeconds === undefined) return '';
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  return "".concat(minutes, "m ").concat(seconds, "s");
}