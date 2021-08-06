var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import actionToPath from '../pure-utils/actionToPath';

import nestAction from '../pure-utils/nestAction';
import { NOT_FOUND } from '../index';

var __DEV__ = process.env.NODE_ENV !== 'production';

export default (function (action, routesMap, prevLocation, history, notFoundPath, serializer) {
  try {
    var pathname = actionToPath(action, routesMap, serializer);
    var kind = getKind(!!history.entries, pathname, history, action);
    return nestAction(pathname, action, prevLocation, history, kind);
  } catch (e) {
    if (__DEV__) {
      console.error('[redux-first-router] Internal exception when parsing action, fallback to NOT_FOUND. Original exception: ', e);
    }

    var payload = _extends({}, action.payload);

    return nestAction(notFoundPath || prevLocation.pathname || '/', _extends({}, action, { type: NOT_FOUND, payload: payload }), prevLocation, history);
  }
});

// REACT NATIVE FEATURE:
// emulate npm `history` package and `historyCreateAction`  so that actions
// and state indicate the user went back or forward. The idea is if you are
// going back or forward to a route you were just at, apps can determine
// from `state.location.kind === 'back|next'` and `action.kind` that things like
// scroll position should be restored.
// NOTE: for testability, history is also returned to make this a pure function
var getKind = function getKind(isMemoryHistory, pathname, history, action) {
  var kind = action.meta && action.meta.location && action.meta.location.kind;

  if (kind) {
    return kind;
  } else if (!isMemoryHistory) {
    return 'push';
  }

  if (goingBack(history, pathname)) {
    history.index--;
    return 'back';
  } else if (goingForward(history, pathname)) {
    history.index++;
    return 'next';
  }

  return 'push';
};

var goingBack = function goingBack(hist, path) {
  var prev = hist.entries[hist.index - 1];
  return prev && prev.pathname === path;
};

var goingForward = function goingForward(hist, path) {
  var next = hist.entries[hist.index + 1];
  return next && next.pathname === path;
};