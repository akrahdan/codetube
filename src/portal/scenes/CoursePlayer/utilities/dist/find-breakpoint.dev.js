"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBreakpoint = findBreakpoint;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var breakpoints = [[120, 160], [240, 427], [360, 640], [480, 854], [720, 1280], [1080, 1920]];

function findBreakpoint(_ref) {
  var width = _ref.width,
      height = _ref.height;
  var i = breakpoints.length - 1;
  var breakpoint = {
    height: breakpoints[0][0],
    width: breakpoints[0][1]
  };

  while (i--) {
    var _breakpoints$i = _slicedToArray(breakpoints[i], 2),
        h = _breakpoints$i[0],
        w = _breakpoints$i[1];

    var _breakpoints = _slicedToArray(breakpoints[i + 1], 2),
        largerH = _breakpoints[0],
        largerW = _breakpoints[1];

    if (h < height && w < width) {
      breakpoint = {
        height: largerH,
        width: largerW
      };
      break;
    }
  }

  return breakpoint;
}