"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncQueue = asyncQueue;

function asyncQueue() {
  var fnQueue = [];
  var working = false;
  return function _callee(fn) {
    var currentFn;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fnQueue.push(fn);

            if (!working) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", fnQueue.length);

          case 3:
            working = true;

          case 4:
            if (!(currentFn = fnQueue.shift())) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(currentFn());

          case 7:
            _context.next = 4;
            break;

          case 9:
            working = false;
            return _context.abrupt("return", fnQueue.length);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}