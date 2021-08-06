'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (action) {
  return !!(action && action.meta && action.meta.location && action.meta.location.kind === 'redirect');
};