'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (action, kind) {
  action.meta = action.meta || {};
  action.meta.location = action.meta.location || {};
  action.meta.location.kind = kind;

  return action;
};