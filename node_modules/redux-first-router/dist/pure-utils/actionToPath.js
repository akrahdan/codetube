'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _rudyMatchPath = require('rudy-match-path');

exports.default = function (action, routesMap, serializer) {
  var route = routesMap[action.type];
  var routePath = (typeof route === 'undefined' ? 'undefined' : _typeof(route)) === 'object' ? route.path : route;
  var params = _payloadToParams(route, action.payload);
  var path = (0, _rudyMatchPath.compileParamsToPath)(routePath, params) || '/';

  var query = action.query || action.meta && action.meta.query || action.payload && action.payload.query;

  var search = query && serializer && serializer.stringify(query);

  return search ? path + '?' + search : path;
};

var _payloadToParams = function _payloadToParams(route) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(params).reduce(function (sluggifedParams, key) {
    var segment = params[key];
    // $FlowFixMe
    sluggifedParams[key] = transformSegment(segment, route, key);
    return sluggifedParams;
  }, {});
};

var transformSegment = function transformSegment(segment, route, key) {
  if (typeof route.toPath === 'function') {
    return route.toPath(segment, key);
  } else if (typeof segment === 'string') {
    // Ask James "should it return arrays?"
    if (segment.includes('/')) {
      return segment.split('/');
    }

    if (route.capitalizedWords === true) {
      return segment.replace(/ /g, '-').toLowerCase();
    }

    return segment;
  } else if (typeof segment === 'number') {
    return segment;
  }
};