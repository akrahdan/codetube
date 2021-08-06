'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routesMap, selectLocationState, bag) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    var _selectLocationState = selectLocationState(getState()),
        type = _selectLocationState.type;

    var route = routesMap[type];

    if (route && typeof route.thunk === 'function') {
      return Promise.resolve(route.thunk(dispatch, getState, bag));
    }

    return Promise.resolve();
  };
};