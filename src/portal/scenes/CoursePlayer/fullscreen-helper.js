//  @see - https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

export function setFullscreen(element, videoElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
  } else if (videoElement && videoElement.webkitEnterFullScreen) {
    videoElement.webkitEnterFullScreen()
  }
}

export function collapseFullscreen(videoElement) {
  if (!isFullscreen()) return //browser managed transition already

  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (videoElement.webkitExitFullscreen) {
    videoElement.webkitExitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

export function isFullscreen() {
  return !!(
    document.fullscreenElement || // alternative standard method
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) // current working methods
}
