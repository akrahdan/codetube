'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (pathname, action, prev, history, kind) {
  var type = action.type,
      _action$payload = action.payload,
      payload = _action$payload === undefined ? {} : _action$payload,
      _action$meta = action.meta,
      meta = _action$meta === undefined ? {} : _action$meta;

  var query = action.query || meta.query || payload.query;
  var parts = pathname.split('?');
  var search = parts[1];

  return _extends({}, action, action.query && { query: query }, {
    type: type,
    payload: payload,
    meta: _extends({}, meta, meta.query && { query: query }, {
      location: {
        current: _extends({
          pathname: parts[0],
          type: type,
          payload: payload
        }, query && { query: query, search: search }),
        prev: prev,
        kind: kind,
        history: undefined
      }
    })
  });
};

var nestHistory = exports.nestHistory = function nestHistory(history) {
  return history.entries ? {
    index: history.index,
    length: history.entries.length,
    entries: history.entries.slice(0) // history.entries.map(entry => entry.pathname)
  } : undefined;
};