import MousetrapClass from 'mousetrap'
// import { analytics } from '../analytics'

let mousetrapInstance

function initMousetrap(element) {
  if (element) mousetrapInstance = new MousetrapClass(document)
  else mousetrapInstance = new window.Mousetrap()

  mousetrapInstance.stopCallback = function (e, element, combo) {
    return (
      element.tagName == 'LI' ||
      element.tagName == 'INPUT' ||
      element.tagName == 'SELECT' ||
      element.tagName == 'TEXTAREA' ||
      element.getAttribute('role') == 'slider' ||
      element.id == 'playback-speed-option' ||
      (element.contentEditable && element.contentEditable == 'true')
    )
  }
}

const defaultShortcutKeys = {
  togglePlayPause: {
    sequence: ['space', 'k', 'K'],
    display: 'k, spacebar',
    description: 'play/pause',
  },
  toggleFullscreen: {
    sequence: ['f', 'F'],
    display: 'f',
    description: 'full screen',
  },
  toggleMute: {
    sequence: ['m', 'M'],
    display: 'm',
    description: 'mute on/off',
  },
  decreaseSpeed: {
    sequence: ['-'],
    display: '-',
    description: 'decrease playback speed',
  },
  increaseSpeed: {
    sequence: ['=', 'plus'],
    display: '+',
    description: 'increase playback speed',
  },
  previousClip: {
    sequence: ['<'],
    display: '< (shift+,)',
    description: 'previous clip',
  },
  nextClip: {
    sequence: ['>'],
    display: '> (shift+.)',
    description: 'next clip',
  },
  fastRewind: {
    sequence: ['left'],
    display: '←',
    description: 'back 10 seconds',
  },
  fastForward: {
    sequence: ['right'],
    display: '→',
    description: 'forward 10 seconds',
  },
  volumeUp: {
    sequence: ['up'],
    display: '↑',
    description: 'volume up',
  },
  volumeDown: {
    sequence: ['down'],
    display: '↓',
    description: 'volume down',
  },
  closeMenu: {
    sequence: ['esc'],
    display: 'esc',
    description: 'close menu / exit full screen',
  },
  toggleKeyboardShortcutsModal: {
    sequence: ['shift+/', 'h', 'H'],
    display: 'h, ? (shift+/)',
    description: 'toggle keyboard shortcuts list',
  },
  toggleClosedCaptioning: {
    sequence: ['c', 'C'],
    display: 'c',
    description: 'toggle closed captions',
  },
}

const SPACE_BAR = 32
const LEFT_KEY = 37
const RIGHT_KEY = 39

const keysNotToTrack = [SPACE_BAR, LEFT_KEY, RIGHT_KEY]

const getKey = (keyName) => (shortcutName) => {
  const shortcut = defaultShortcutKeys[shortcutName]
  return shortcut && shortcut[keyName]
}

const getShortcutKeySequence = getKey('sequence')

const getShortcutKeySequenceDisplay = getKey('display')

function registerShortcutKeyHandler(shortcutName, handler, handleGetClip, mousetrap = mousetrapInstance) {
  if (!shortcutName) throw new Error('shortcutName is required')
  if (typeof handler !== 'function')
    throw new Error(`shortcut ${shortcutName}: handler is required and must be a function`)

  let sequence = getShortcutKeySequence(shortcutName)

  if (!sequence) throw new Error(`no key sequence found for: ${sequence}`)

  mousetrap && mousetrap.bind(sequence, (e) => {
    handler()
    const { clipId } = handleGetClip()

    const isKeyToTrack = !keysNotToTrack.some((i) => i === e.which)

    if (isKeyToTrack) {
    //   analytics.trackGenericClick('Keyboard Shortcut Pressed', {
    //     source: 'eplayer',
    //     keyPressed: e.code,
    //     keyPressedAction: shortcutName,
    //     clipId,
    //   })
    }
    return false
  })
}

function unregisterShortcutKeyHandler(shortcutName, mousetrap = mousetrapInstance) {
  let sequence = getShortcutKeySequence(shortcutName)
  mousetrap && mousetrap.unbind(sequence)
}

const resetMoustrap = (mousetrap = mousetrapInstance) => mousetrap.reset()

export {
  initMousetrap,
  defaultShortcutKeys,
  getShortcutKeySequence,
  getShortcutKeySequenceDisplay,
  registerShortcutKeyHandler,
  unregisterShortcutKeyHandler,
  mousetrapInstance,
  resetMoustrap,
}
