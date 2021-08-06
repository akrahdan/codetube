"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = clamp;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}