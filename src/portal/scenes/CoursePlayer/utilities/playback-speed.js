import { PlaybackSpeedStops as stops } from '../constants'

export function constrainSpeed(delta, currentPlaybackSpeed) {
  const newStopIndex = stops.indexOf(currentPlaybackSpeed) + delta
  if (newStopIndex < stops.length && newStopIndex > -1) {
    return stops[newStopIndex]
  }

  return currentPlaybackSpeed
}
