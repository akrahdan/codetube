'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doc, title) {
  if (typeof title === 'string' && doc.title !== title) {
    return doc.title = title;
  }

  return null;
};

var getDocument = exports.getDocument = function getDocument() {
  var isSSRTest = process.env.NODE_ENV === 'test' && typeof window !== 'undefined' && window.isSSR;

  return typeof document !== 'undefined' && !isSSRTest ? document : {};
};