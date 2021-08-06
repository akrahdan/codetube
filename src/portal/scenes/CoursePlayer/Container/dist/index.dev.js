"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactResizeDetector = _interopRequireWildcard(require("react-resize-detector"));

var _containerModule = _interopRequireDefault(require("./container.module.css"));

var _playerSlice = require("state/player/playerSlice");

var _isIe = require("../utilities/is-ie");

var _constants = require("../constants");

var _fullscreenHelper = require("../fullscreen-helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var resize = function resize(container) {
  return function (width, height) {
    var setContainerSize = container.props.setContainerSize;
    setContainerSize({
      width: width,
      height: height
    });
  };
};

var Container =
/*#__PURE__*/
function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    var _this;

    _classCallCheck(this, Container);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, props));
    _this.resize = resize(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Container, [{
    key: "updateFullscreenState",
    value: function updateFullscreenState(fullscreenState) {
      var container = this.content;
      var videoElement = document.getElementById('video-element');

      if (fullscreenState === _constants.FullscreenState.FULLSCREEN && !(0, _fullscreenHelper.isFullscreen)()) {
        (0, _fullscreenHelper.setFullscreen)(container, videoElement);
      } else {
        (0, _fullscreenHelper.collapseFullscreen)(videoElement);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var currentFullscreenState = this.props.fullscreenState;
      var nextFullscreenState = nextProps.fullscreenState;

      if (currentFullscreenState === nextFullscreenState) {
        return;
      }

      this.updateFullscreenState(nextFullscreenState);
      return nextProps;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          containerSize = _this$props.containerSize,
          interactionMode = _this$props.interactionMode,
          playerSize = _this$props.playerSize,
          refreshRate = _this$props.refreshRate,
          fullscreenState = _this$props.fullscreenState;
      return;
    }
  }]);

  return Container;
}(_react.Component);

exports.Container = Container;

var _default = (0, _reactResizeDetector.withResizeDetector)((0, _reactRedux.connect)(function (state) {
  return {
    containerSize: state.player.containerSize,
    breakpoint: state.player.breakpoint,
    interactionMode: state.player.interactionMode,
    playerSize: state.player.playerSize,
    fullscreenState: state.player.fullscreenState
  };
}, function (dispatch) {
  return {
    setContainersize: function setContainersize(size) {
      return dispatch((0, _playerSlice.setContainerSize)(size));
    }
  };
})(Container));

exports["default"] = _default;