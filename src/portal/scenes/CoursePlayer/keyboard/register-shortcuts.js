const shortcuts = [
    { name: 'togglePlayPause', action: 'togglePlayPause' },
    { name: 'toggleFullscreen', action: 'toggleFullscreen' },
    { name: 'toggleMute', action: 'toggleMute' },
    { name: 'increaseSpeed', action: 'increaseSpeed' },
    { name: 'decreaseSpeed', action: 'decreaseSpeed' },
    { name: 'fastForward', action: 'fastForward' },
    { name: 'fastRewind', action: 'fastRewind' },
    { name: 'volumeUp', action: 'volumeUp' },
    { name: 'volumeDown', action: 'volumeDown' },
    { name: 'closeMenu', action: 'closeMenu' },
    { name: 'toggleKeyboardShortcutsModal', action: 'toggleKeyboardShortcuts' },
    { name: 'toggleClosedCaptioning', action: 'toggleClosedCaptioning' },
  ]
  
  const hideableShortcuts = {
    previous: { name: 'previousClip', action: 'previousClip' },
    next: { name: 'nextClip', action: 'nextClip' },
  }
  
  const registerDefaultShortcuts = (props, handleGetClip) => {
    if (!props.registerShortcut) return
    const registerShortcut = props.registerShortcut
  
    shortcuts.forEach(({ name, action }) => {
      registerShortcut({ name, handler: props[action], handleGetClip })
    })
  
    Object.keys(hideableShortcuts).forEach((key) => {
      const shortcut = hideableShortcuts[key]
  
      if (!props.hiddenButtons || props.hiddenButtons[key] === undefined) {
        registerShortcut({ name: shortcut.name, handler: props[shortcut.action], handleGetClip })
      }
    })
    
    if (navigator && navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('play', props.togglePlayPause)
      navigator.mediaSession.setActionHandler('pause', props.togglePlayPause)
      navigator.mediaSession.setActionHandler('seekbackward', props.fastRewind)
      navigator.mediaSession.setActionHandler('seekforward', props.fastForward)
    }
  }
  
  export { registerDefaultShortcuts, shortcuts }
  