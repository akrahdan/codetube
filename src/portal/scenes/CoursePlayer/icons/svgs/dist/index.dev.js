"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "embeddablePlayerControls", {
  enumerable: true,
  get: function get() {
    return _playerControls["default"];
  }
});
Object.defineProperty(exports, "tooltips", {
  enumerable: true,
  get: function get() {
    return _tooltips["default"];
  }
});
Object.defineProperty(exports, "visualFeedback", {
  enumerable: true,
  get: function get() {
    return _visualFeedback["default"];
  }
});
exports["default"] = void 0;

var _playerControls = _interopRequireDefault(require("./player-controls"));

var _tooltips = _interopRequireDefault(require("./tooltips"));

var _visualFeedback = _interopRequireDefault(require("./visual-feedback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _playerControls["default"].concat(_tooltips["default"]).concat(_visualFeedback["default"]);

exports["default"] = _default;