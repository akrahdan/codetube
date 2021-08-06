"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Container = void 0;
var react_1 = require("react");
var react_2 = require("unistore/react");
var actions = require("../../actions");
var react_resize_detector_1 = require("react-resize-detector");
var container_css_1 = require("./container.css");
var utilities_1 = require("../../utilities");
var constants_1 = require("../../constants");
var fullscreen_helper_1 = require("./fullscreen-helper");
var resize = function (container) { return function (width, height) {
    var setContainerSize = container.props.setContainerSize;
    setContainerSize({ width: width, height: height });
}; };
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.resize = resize(_this);
        return _this;
    }
    Container.prototype.updateFullscreenState = function (fullscreenState) {
        var container = this.content;
        var videoElement = document.getElementById('video-element');
        if (fullscreenState === constants_1.FullscreenState.FULLSCREEN && !fullscreen_helper_1.isFullscreen()) {
            fullscreen_helper_1.setFullscreen(container, videoElement);
        }
        else {
            fullscreen_helper_1.collapseFullscreen(videoElement);
        }
    };
    Container.prototype.componentWillReceiveProps = function (nextProps) {
        var currentFullscreenState = this.props.fullscreenState;
        var nextFullscreenState = nextProps.fullscreenState;
        if (currentFullscreenState === nextFullscreenState) {
            return;
        }
        this.updateFullscreenState(nextFullscreenState);
        return nextProps;
    };
    Container.prototype.render = function () {
        var _this = this;
        var _a = this.props, containerSize = _a.containerSize, interactionMode = _a.interactionMode, playerSize = _a.playerSize, refreshRate = _a.refreshRate, fullscreenState = _a.fullscreenState;
        return [
            react_1["default"].createElement(react_resize_detector_1["default"], { key: 'resize detector', handleWidth: true, handleHeight: true, onResize: this.resize, refreshMode: "throttle", refreshRate: refreshRate || 15 }),
            react_1["default"].createElement("div", { key: "container", className: container_css_1["default"].container, style: fullscreenState === constants_1.FullscreenState.FULLSCREEN ? __assign({}, containerSize) : {}, ref: function (el) { return (_this.element = el); }, "interaction-mode": interactionMode, "is-ie": "" + utilities_1.isIE() },
                react_1["default"].createElement("div", { className: container_css_1["default"].content, style: fullscreenState === constants_1.FullscreenState.NORMAL ? __assign({}, playerSize) : { width: '100%', height: '100%' }, ref: function (el) { return (_this.content = el); } }, this.props.children)),
        ];
    };
    return Container;
}(react_1.Component));
exports.Container = Container;
exports["default"] = react_2.connect(function (state) { return ({
    containerSize: state.containerSize,
    breakpoint: state.breakpoint,
    interactionMode: state.interactionMode,
    playerSize: state.playerSize,
    fullscreenState: state.fullscreenState
}); }, function (store) { return ({
    setContainerSize: actions.setContainerSize
}); })(Container);
