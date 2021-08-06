"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortcuts = exports.registerDefaultShortcuts = void 0;
var shortcuts = [{
  name: 'togglePlayPause',
  action: 'togglePlayPause'
}, {
  name: 'toggleFullscreen',
  action: 'toggleFullscreen'
}, {
  name: 'toggleMute',
  action: 'toggleMute'
}, {
  name: 'increaseSpeed',
  action: 'increaseSpeed'
}, {
  name: 'decreaseSpeed',
  action: 'decreaseSpeed'
}, {
  name: 'fastForward',
  action: 'fastForward'
}, {
  name: 'fastRewind',
  action: 'fastRewind'
}, {
  name: 'volumeUp',
  action: 'volumeUp'
}, {
  name: 'volumeDown',
  action: 'volumeDown'
}, {
  name: 'closeMenu',
  action: 'closeMenu'
}, {
  name: 'toggleKeyboardShortcutsModal',
  action: 'toggleKeyboardShortcuts'
}, {
  name: 'toggleClosedCaptioning',
  action: 'toggleClosedCaptioning'
}];
exports.shortcuts = shortcuts;
var hideableShortcuts = {
  previous: {
    name: 'previousClip',
    action: 'previousClip'
  },
  next: {
    name: 'nextClip',
    action: 'nextClip'
  }
};

var registerDefaultShortcuts = function registerDefaultShortcuts(props, handleGetClip) {
  if (!props.registerShortcut) return;
  var registerShortcut = props.registerShortcut;
  shortcuts.forEach(function (_ref) {
    var name = _ref.name,
        action = _ref.action;
    registerShortcut({
      name: name,
      handler: props[action],
      handleGetClip: handleGetClip
    });
  });
  Object.keys(hideableShortcuts).forEach(function (key) {
    var shortcut = hideableShortcuts[key];

    if (!props.hiddenButtons || props.hiddenButtons[key] === undefined) {
      registerShortcut({
        name: shortcut.name,
        handler: props[shortcut.action],
        handleGetClip: handleGetClip
      });
    }
  });

  if (navigator && navigator.mediaSession) {
    navigator.mediaSession.setActionHandler('play', props.togglePlayPause);
    navigator.mediaSession.setActionHandler('pause', props.togglePlayPause);
    navigator.mediaSession.setActionHandler('seekbackward', props.fastRewind);
    navigator.mediaSession.setActionHandler('seekforward', props.fastForward);
  }
};

exports.registerDefaultShortcuts = registerDefaultShortcuts;