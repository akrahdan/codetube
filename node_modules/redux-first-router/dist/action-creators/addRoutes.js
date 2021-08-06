'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index');

exports.default = function (routes) {
  return function (dispatch) {
    return dispatch({ type: _index.ADD_ROUTES, payload: { routes: routes } });
  };
};