"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapGenericVideoError = exports.mapHlsError = void 0;

var mapHlsError = function mapHlsError(error) {
  if (!error) return null;
  if (error.context) error.context.loader = null;
  error.loader = null;
  return error;
};

exports.mapHlsError = mapHlsError;

var mapGenericVideoError = function mapGenericVideoError(error) {
  return {
    code: error.code,
    message: error.message
  };
};

exports.mapGenericVideoError = mapGenericVideoError;