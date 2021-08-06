'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hotkeys = _interopDefault(require('hotkeys-js'));
var react = require('react');

function useIsHotkeyPressed() {
  return hotkeys.isPressed;
}

function useHotkeys(keys, callback, options, deps) {
  if (options instanceof Array) {
    deps = options;
    options = undefined;
  }

  var _ref = options || {},
      enableOnTags = _ref.enableOnTags,
      filter = _ref.filter,
      keyup = _ref.keyup,
      keydown = _ref.keydown;

  var ref = react.useRef(null);
  var memoisedCallback = react.useCallback(function (keyboardEvent, hotkeysEvent) {
    if (ref.current === null || document.activeElement === ref.current) {
      callback(keyboardEvent, hotkeysEvent);
      return true;
    }

    return false;
  }, deps ? [ref].concat(deps) : [ref]);
  react.useEffect(function () {
    if (options && options.enableOnTags) {
      hotkeys.filter = function (_ref2) {
        var target = _ref2.target,
            srcElement = _ref2.srcElement;
        // @ts-ignore
        var targetTagName = target && target.tagName || srcElement && srcElement.tagName;
        return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName));
      };
    }

    if (filter) hotkeys.filter = filter;

    if (keyup && keydown !== true) {
      options.keydown = false;
    }

    hotkeys(keys, options || {}, memoisedCallback);
    return function () {
      return hotkeys.unbind(keys, memoisedCallback);
    };
  }, [memoisedCallback, options, enableOnTags, filter, keys]);
  return ref;
}

exports.useHotkeys = useHotkeys;
exports.useIsHotkeyPressed = useIsHotkeyPressed;
//# sourceMappingURL=react-hotkeys-hook.cjs.development.js.map
