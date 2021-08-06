'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../index');

var _isServer = require('../pure-utils/isServer');

var _isServer2 = _interopRequireDefault(_isServer);

var _nestAction = require('../pure-utils/nestAction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (initialState, routesMap) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    routesMap = state.routesMap || routesMap;
    var route = routesMap[action.type];

    if (action.type === _index.NOT_FOUND || route && !action.error && (typeof route === 'string' || route.path) && (action.meta.location.current.pathname !== state.pathname || action.meta.location.current.search !== state.search || action.meta.location.kind === 'load')) {
      var _query = action.meta.location.current.query;
      var _search = action.meta.location.current.search;

      return _extends({
        pathname: action.meta.location.current.pathname,
        type: action.type,
        payload: _extends({}, action.payload)
      }, _query && { query: _query, search: _search }, {
        prev: action.meta.location.prev,
        kind: action.meta.location.kind,
        history: action.meta.location.history,
        hasSSR: state.hasSSR,
        routesMap: routesMap
      });
    } else if (route && !action.error && (typeof route === 'string' || route.path) && action.meta.location.current.pathname === state.pathname && action.meta.location.current.search === state.search && action.meta.location.kind !== state.kind) {
      return _extends({}, state, {
        kind: action.meta.location.kind
      });
    } else if (action.type === _index.ADD_ROUTES) {
      return _extends({}, state, {
        routesMap: _extends({}, state.routesMap, action.payload.routes)
      });
    }

    return state;
  };
};

var getInitialState = exports.getInitialState = function getInitialState(currentPathname, meta, type, payload, routesMap, history) {
  return _extends({
    search: currentPathname.split('?')[1],
    pathname: currentPathname.split('?')[0],
    type: type,
    payload: payload
  }, meta, {
    prev: {
      pathname: '',
      type: '',
      payload: {}
    },
    kind: undefined,
    history: (0, _nestAction.nestHistory)(history),
    hasSSR: (0, _isServer2.default)() ? true : undefined, // client uses initial server `hasSSR` state setup here
    routesMap: routesMap
  });
};