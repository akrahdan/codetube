
import pathToAction from '../pure-utils/pathToAction';

import nestAction from '../pure-utils/nestAction';

export default (function (pathname, routesMap, prevLocation, history, kind, serializer, prevPath, prevLength) {
  var action = pathToAction(pathname, routesMap, serializer);
  kind = getKind(!!history.entries, history, kind, prevPath, prevLength);
  return nestAction(pathname, action, prevLocation, history, kind);
});

var getKind = function getKind(isMemoryHistory, history, kind, prevPath, prevLength) {
  if (!isMemoryHistory || !prevPath || kind !== 'pop') {
    return kind;
  }

  if (isBack(history, prevPath)) {
    return 'back';
  } else if (isNext(history, prevPath, prevLength)) {
    return 'next';
  }

  return kind;
};

var isBack = function isBack(hist, path) {
  var next = hist.entries[hist.index + 1];
  return next && next.pathname === path;
};

var isNext = function isNext(hist, path, length) {
  var prev = hist.entries[hist.index - 1];
  var notPushed = length === hist.length;

  return prev && prev.pathname === path && notPushed;
};