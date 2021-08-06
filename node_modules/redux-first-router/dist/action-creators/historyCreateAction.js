'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pathToAction = require('../pure-utils/pathToAction');

var _pathToAction2 = _interopRequireDefault(_pathToAction);

var _nestAction = require('../pure-utils/nestAction');

var _nestAction2 = _interopRequireDefault(_nestAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (pathname, routesMap, prevLocation, history, kind, serializer, prevPath, prevLength) {
  var action = (0, _pathToAction2.default)(pathname, routesMap, serializer);
  kind = getKind(!!history.entries, history, kind, prevPath, prevLength);
  return (0, _nestAction2.default)(pathname, action, prevLocation, history, kind);
};

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