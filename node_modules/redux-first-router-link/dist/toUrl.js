'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reduxFirstRouter = require('redux-first-router');

var babelPluginFlowReactPropTypes_proptype_RoutesMap = require('redux-first-router').babelPluginFlowReactPropTypes_proptype_RoutesMap || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_To = require('prop-types').oneOfType([require('prop-types').string, require('prop-types').arrayOf(require('prop-types').string), require('prop-types').object]);

if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_To', {
  value: babelPluginFlowReactPropTypes_proptype_To,
  configurable: true
});

exports.default = function (to, routesMap) {
  var _getOptions = (0, _reduxFirstRouter.getOptions)(),
      querySerializer = _getOptions.querySerializer,
      basename = _getOptions.basename;

  if (to && typeof to === 'string') {
    return (0, _reduxFirstRouter.history)().createHref({
      pathname: to
    });
  } else if (Array.isArray(to)) {
    var path = '/' + to.join('/');
    return (0, _reduxFirstRouter.history)().createHref({
      pathname: path
    });
  } else if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object') {
    var action = to;

    try {
      var _path = (0, _reduxFirstRouter.actionToPath)(action, routesMap, querySerializer);

      return (0, _reduxFirstRouter.history)().createHref({
        pathname: _path
      });
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[redux-first-router-link] could not create path from action:', action, 'For reference, here are your current routes:', routesMap);
      }

      return '#';
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('[redux-first-router-link] `to` prop must be a string, array or action object. You provided:', to);
  }
  return '#';
};