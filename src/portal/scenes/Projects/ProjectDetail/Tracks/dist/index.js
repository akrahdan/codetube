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
exports.Tracks = void 0;
var react_1 = require("react");
var styles_module_scss_1 = require("./styles.module.scss");
var index_1 = require("./TrackDetail/index");
var Tracks = /** @class */ (function (_super) {
    __extends(Tracks, _super);
    function Tracks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: false
        };
        _this.toggleExpansion = function () {
            _this.setState(function (previousState) { return ({
                expanded: !previousState.expanded
            }); });
        };
        return _this;
    }
    Tracks.prototype.render = function () {
        var _a = this.props, _b = _a.title, title = _b === void 0 ? 'Follow a Structured Curriculum' : _b, _c = _a.trackDetails, trackDetails = _c === void 0 ? [] : _c, _d = _a.id, id = _d === void 0 ? 5 : _d;
        var tracksVisible = trackDetails && trackDetails.length > 0;
        return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].tracksContainer }, tracksVisible && (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].tracksText },
                react_1["default"].createElement("h2", { className: styles_module_scss_1["default"].tracksTitle }, title)),
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].tracksDetailLayout },
                trackDetails
                    .slice(0, this.state.expanded ? Infinity : id)
                    .map(function (trackDetail, index) { return (react_1["default"].createElement(index_1.TrackDetail, __assign({ key: trackDetail.title, id: index + 1 }, trackDetail))); }),
                trackDetails.length > id && (react_1["default"].createElement("button", { className: styles_module_scss_1["default"].moreTracksDetailLayout, onClick: this.toggleExpansion, type: "button" }, this.state.expanded
                    ? 'See less'
                    : "+ " + (trackDetails.length - id) + " more lessons")))))));
    };
    return Tracks;
}(react_1["default"].Component));
exports.Tracks = Tracks;
