'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectRoutes = require('../connectRoutes');

exports.default = function (dispatch, getState, route, selectLocationState, bag) {
  if (typeof window !== 'undefined') {
    var thunk = route.thunk;

    if (typeof thunk === 'function') {
      var _selectLocationState = selectLocationState(getState()),
          kind = _selectLocationState.kind,
          hasSSR = _selectLocationState.hasSSR;

      // call thunks always if it's not initial load of the app or only if it's load
      // without SSR setup yet, so app state is setup on client when prototyping,
      // such as with with webpack-dev-server before server infrastructure is built.
      // NEW: if there is no path, it's assumed to be a pathless route, which is always called.


      if (kind !== 'load' || kind === 'load' && !hasSSR || !route.path) {
        var prom = thunk(dispatch, getState, bag);

        if (prom && typeof prom.next === 'function') {
          prom.next(_connectRoutes.updateScroll);
        }
      }
    }
  }
};