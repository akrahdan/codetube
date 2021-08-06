'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reduxFirstRouter = require('redux-first-router');

var babelPluginFlowReactPropTypes_proptype_RoutesMap = require('redux-first-router').babelPluginFlowReactPropTypes_proptype_RoutesMap || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_To = require('./toUrl').babelPluginFlowReactPropTypes_proptype_To || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_OnClick = require('prop-types').oneOfType([require('prop-types').oneOf([false]), require('prop-types').func]);

if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OnClick', {
  value: babelPluginFlowReactPropTypes_proptype_OnClick,
  configurable: true
});

exports.default = function (url, routesMap, onClick, shouldDispatch, target, dispatch, to, dispatchRedirect, e) {
  var shouldGo = true;

  if (onClick) {
    shouldGo = onClick(e); // onClick can return false to prevent dispatch
    shouldGo = typeof shouldGo === 'undefined' ? true : shouldGo;
  }

  var prevented = e.defaultPrevented;

  if (e.button !== 1 && !target && e && e.preventDefault && !isModified(e)) {
    e.preventDefault();
  }

  if (shouldGo && shouldDispatch && !target && !prevented && e.button === 0 && !isModified(e)) {
    var _getOptions = (0, _reduxFirstRouter.getOptions)(),
        serializer = _getOptions.querySerializer;

    var action = to;

    if (!isAction(to)) {
      url = url.indexOf('#') > -1 ? url.substring(url.indexOf('#') + 1, url.length) : url;

      action = (0, _reduxFirstRouter.pathToAction)(url, routesMap, serializer);
    }

    action = dispatchRedirect ? (0, _reduxFirstRouter.redirect)(action) : action;
    dispatch(action);
  }
};

var isAction = function isAction(to) {
  return (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && !Array.isArray(to);
};

var isModified = function isModified(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
};