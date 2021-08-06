'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routes) {
  return Object.keys(routes).map(function (key) {
    return routes[key];
  });
};