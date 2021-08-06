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
exports.__esModule = true;
exports.UIManager = void 0;
var react_1 = require("react");
var react_2 = require("unistore/react");
var classnames_1 = require("classnames");
var fullscreen_helper_1 = require("../container/fullscreen-helper");
var constants_1 = require("../../constants");
var actions = require("../../actions");
var shortcut_keys_1 = require("../../keyboard/shortcut-keys");
var register_shortcuts_1 = require("../../keyboard/register-shortcuts");
var ui_manager_css_1 = require("./ui-manager.css");
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager(props) {
        var _this = _super.call(this, props) || this;
        _this.updateMediaUI = function () {
            if (!navigator || !navigator.mediaSession)
                return;
            var _a = _this.props, title = _a.title, playing = _a.playing;
            navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
            navigator.mediaSession.metadata = new MediaMetadata({ title: title });
        };
        _this.handleGetClip = function () { return ({ clipId: _this.props.clipId || null }); };
        _this.handleFullscreenChange = function () {
            var setFullscreen = _this.props.setFullscreen;
            var fullscreenState = fullscreen_helper_1.isFullscreen() ? constants_1.FullscreenState.FULLSCREEN : constants_1.FullscreenState.NORMAL;
            setFullscreen && setFullscreen(fullscreenState);
        };
        _this.handleMouseMove = function (e) {
            var setInteractionMode = _this.props.setInteractionMode;
            setInteractionMode(constants_1.InteractionModes.MOUSE);
            _this.showUI();
            _this.hideUITimeout && clearTimeout(_this.hideUITimeout);
            _this.hideUITimeout = setTimeout(_this.hideUI, constants_1.MOUSE_TIMEOUT_DURATION);
        };
        _this.handleMouseEnter = function (e) {
            var setInteractionMode = _this.props.setInteractionMode;
            setInteractionMode(constants_1.InteractionModes.MOUSE);
            _this.showUI();
        };
        _this.handleMouseDown = function (e) {
            var _a = _this.props, activeMenu = _a.activeMenu, setInteractionMode = _a.setInteractionMode;
            setInteractionMode(constants_1.InteractionModes.MOUSE);
            _this.showUI();
        };
        _this.handleTouchStart = function (e) {
            var _a = _this.props, activeMenu = _a.activeMenu, setInteractionMode = _a.setInteractionMode;
            _this.cancelEvent(e);
            setInteractionMode(constants_1.InteractionModes.TOUCH);
            _this.showUI();
            _this.hideUITimeout && clearTimeout(_this.hideUITimeout);
            _this.hideUITimeout = setTimeout(_this.hideUI, constants_1.TOUCH_TIMEOUT_DURATION);
        };
        _this.handleKeyUp = function (e) {
            var setInteractionMode = _this.props.setInteractionMode;
            setInteractionMode(constants_1.InteractionModes.KEYBOARD);
        };
        _this.cancelEvent = function (e) {
            e && e.preventDefault();
        };
        _this.showUI = function () {
            var showUI = _this.props.showUI;
            showUI && showUI();
        };
        _this.hideUI = function () {
            var _a = _this.props, hideUI = _a.hideUI, activeMenu = _a.activeMenu;
            if (!activeMenu) {
                hideUI && hideUI();
            }
        };
        _this.handleBlur = function (e) {
            var interactionMode = _this.props.interactionMode;
            var target = e.relatedTarget || document.activeElement;
            if (interactionMode === constants_1.InteractionModes.KEYBOARD && !_this.mainRef.current.contains(target)) {
                _this.hideUI();
            }
        };
        _this.mainRef = react_1["default"].createRef();
        return _this;
    }
    UIManager.prototype.componentDidMount = function () {
        var keyboardShortcutsEnabled = this.props.keyboardShortcutsEnabled;
        document.addEventListener('fullscreenchange', this.handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
        shortcut_keys_1.initMousetrap(this.mainRef.current);
        if (keyboardShortcutsEnabled !== false)
            register_shortcuts_1.registerDefaultShortcuts(this.props, this.handleGetClip);
        this.updateMediaUI();
    };
    UIManager.prototype.componentWillUnmount = function () {
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
        shortcut_keys_1.resetMoustrap();
    };
    UIManager.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.keyboardShortcutsEnabled === nextProps.keyboardShortcutsEnabled)
            return;
        if (nextProps.keyboardShortcutsEnabled !== false)
            register_shortcuts_1.registerDefaultShortcuts(this.props, this.handleGetClip);
        if (nextProps.keyboardShortcutsEnabled == false)
            shortcut_keys_1.resetMoustrap();
    };
    UIManager.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.title !== this.props.title || prevProps.playing !== this.props.playing)
            this.updateMediaUI();
    };
    UIManager.prototype.render = function () {
        var _a;
        var _b = this.props, children = _b.children, visible = _b.visible;
        return (react_1["default"].createElement("div", { tabIndex: "-1", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.hideUI, onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onTouchEnd: this.cancelEvent, onTouchStart: this.handleTouchStart, onFocus: this.showUI, onBlur: this.handleBlur, onKeyUp: this.handleKeyUp, className: classnames_1["default"](ui_manager_css_1["default"].manager, (_a = {}, _a[ui_manager_css_1["default"].hidden] = !visible, _a)), ref: this.mainRef }, children));
    };
    return UIManager;
}(react_1.Component));
exports.UIManager = UIManager;
exports["default"] = react_2.connect(function (state) { return ({
    clipId: state.clipId,
    title: state.title,
    playing: state.playing,
    activeMenu: state.activeMenu,
    interactionMode: state.interactionMode,
    visible: state.visible,
    registeredShortcuts: state.registeredShortcuts,
    hiddenButtons: state.hiddenButtons,
    keyboardShortcutsEnabled: state.keyboardShortcutsEnabled
}); }, actions)(UIManager);
