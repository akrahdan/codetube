"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE = isIE;

function isIE() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}