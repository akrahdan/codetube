export function formatTime(time) {
    time = Math.round(time || 0)
    var minutes = Math.floor(time / 60)
    var seconds = '0' + (time - minutes * 60)
    return minutes + ':' + seconds.substr(-2)
  }
  
  export function formatA11yTimeString(timeInSeconds) {
    if (timeInSeconds === undefined) return ''
    
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
  
    return `${minutes}m ${seconds}s`
  }