'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var pathname = _ref.pathname,
      search = _ref.search;

  if (search) {
    if (search.indexOf('?') !== 0) {
      search = '?' + search;
    }

    return '' + pathname + search;
  }

  return pathname;
};