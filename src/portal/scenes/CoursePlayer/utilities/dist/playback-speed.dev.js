"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constrainSpeed = constrainSpeed;

var _constants = require("../constants");

function constrainSpeed(delta, currentPlaybackSpeed) {
  var newStopIndex = _constants.PlaybackSpeedStops.indexOf(currentPlaybackSpeed) + delta;

  if (newStopIndex < _constants.PlaybackSpeedStops.length && newStopIndex > -1) {
    return _constants.PlaybackSpeedStops[newStopIndex];
  }

  return currentPlaybackSpeed;
}