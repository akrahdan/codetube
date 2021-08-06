'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return typeof window !== 'undefined' && typeof window.navigator !== 'undefined' && window.navigator.product === 'ReactNative';
};