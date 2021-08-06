"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;

function sleep(timeMs) {
  return regeneratorRuntime.async(function sleep$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (res, rej) {
            setTimeout(function () {
              return res();
            }, timeMs);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}