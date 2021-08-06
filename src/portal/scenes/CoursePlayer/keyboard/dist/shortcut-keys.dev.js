"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMousetrap = initMousetrap;
exports.registerShortcutKeyHandler = registerShortcutKeyHandler;
exports.unregisterShortcutKeyHandler = unregisterShortcutKeyHandler;
exports.resetMoustrap = exports.mousetrapInstance = exports.getShortcutKeySequenceDisplay = exports.getShortcutKeySequence = exports.defaultShortcutKeys = void 0;

var _mousetrap = _interopRequireDefault(require("mousetrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { analytics } from '../analytics'
var mousetrapInstance;
exports.mousetrapInstance = mousetrapInstance;

function initMousetrap(element) {
  if (element) exports.mousetrapInstance = mousetrapInstance = new _mousetrap["default"](document);else exports.mousetrapInstance = mousetrapInstance = new window.Mousetrap();

  mousetrapInstance.stopCallback = function (e, element, combo) {
    return element.tagName == 'LI' || element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.getAttribute('role') == 'slider' || element.id == 'playback-speed-option' || element.contentEditable && element.contentEditable == 'true';
  };
}

var defaultShortcutKeys = {
  togglePlayPause: {
    sequence: ['space', 'k', 'K'],
    display: 'k, spacebar',
    description: 'play/pause'
  },
  toggleFullscreen: {
    sequence: ['f', 'F'],
    display: 'f',
    description: 'full screen'
  },
  toggleMute: {
    sequence: ['m', 'M'],
    display: 'm',
    description: 'mute on/off'
  },
  decreaseSpeed: {
    sequence: ['-'],
    display: '-',
    description: 'decrease playback speed'
  },
  increaseSpeed: {
    sequence: ['=', 'plus'],
    display: '+',
    description: 'increase playback speed'
  },
  previousClip: {
    sequence: ['<'],
    display: '< (shift+,)',
    description: 'previous clip'
  },
  nextClip: {
    sequence: ['>'],
    display: '> (shift+.)',
    description: 'next clip'
  },
  fastRewind: {
    sequence: ['left'],
    display: '←',
    description: 'back 10 seconds'
  },
  fastForward: {
    sequence: ['right'],
    display: '→',
    description: 'forward 10 seconds'
  },
  volumeUp: {
    sequence: ['up'],
    display: '↑',
    description: 'volume up'
  },
  volumeDown: {
    sequence: ['down'],
    display: '↓',
    description: 'volume down'
  },
  closeMenu: {
    sequence: ['esc'],
    display: 'esc',
    description: 'close menu / exit full screen'
  },
  toggleKeyboardShortcutsModal: {
    sequence: ['shift+/', 'h', 'H'],
    display: 'h, ? (shift+/)',
    description: 'toggle keyboard shortcuts list'
  },
  toggleClosedCaptioning: {
    sequence: ['c', 'C'],
    display: 'c',
    description: 'toggle closed captions'
  }
};
exports.defaultShortcutKeys = defaultShortcutKeys;
var SPACE_BAR = 32;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var keysNotToTrack = [SPACE_BAR, LEFT_KEY, RIGHT_KEY];

var getKey = function getKey(keyName) {
  return function (shortcutName) {
    var shortcut = defaultShortcutKeys[shortcutName];
    return shortcut && shortcut[keyName];
  };
};

var getShortcutKeySequence = getKey('sequence');
exports.getShortcutKeySequence = getShortcutKeySequence;
var getShortcutKeySequenceDisplay = getKey('display');
exports.getShortcutKeySequenceDisplay = getShortcutKeySequenceDisplay;

function registerShortcutKeyHandler(shortcutName, handler, handleGetClip) {
  var mousetrap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : mousetrapInstance;
  if (!shortcutName) throw new Error('shortcutName is required');
  if (typeof handler !== 'function') throw new Error("shortcut ".concat(shortcutName, ": handler is required and must be a function"));
  var sequence = getShortcutKeySequence(shortcutName);
  if (!sequence) throw new Error("no key sequence found for: ".concat(sequence));
  mousetrap && mousetrap.bind(sequence, function (e) {
    handler();

    var _handleGetClip = handleGetClip(),
        clipId = _handleGetClip.clipId;

    var isKeyToTrack = !keysNotToTrack.some(function (i) {
      return i === e.which;
    });

    if (isKeyToTrack) {//   analytics.trackGenericClick('Keyboard Shortcut Pressed', {
      //     source: 'eplayer',
      //     keyPressed: e.code,
      //     keyPressedAction: shortcutName,
      //     clipId,
      //   })
    }

    return false;
  });
}

function unregisterShortcutKeyHandler(shortcutName) {
  var mousetrap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mousetrapInstance;
  var sequence = getShortcutKeySequence(shortcutName);
  mousetrap && mousetrap.unbind(sequence);
}

var resetMoustrap = function resetMoustrap() {
  var mousetrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mousetrapInstance;
  return mousetrap.reset();
};

exports.resetMoustrap = resetMoustrap;