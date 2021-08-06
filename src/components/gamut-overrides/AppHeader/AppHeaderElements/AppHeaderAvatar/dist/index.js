"use strict";
exports.__esModule = true;
exports.AppHeaderAvatar = void 0;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("react");
var classnames_1 = require("classnames");
var styles_module_scss_1 = require("./styles.module.scss");
exports.AppHeaderAvatar = function (_a) {
    var imageUrl = _a.imageUrl, avatarSubTitle = _a.avatarSubTitle, _b = _a.avatarSize, avatarSize = _b === void 0 ? 40 : _b;
    var outerBoxCS = classnames_1["default"](styles_module_scss_1["default"].avatar, styles_module_scss_1["default"].avatarLg, styles_module_scss_1["default"].avatarPrimary);
    var innerBoxCS = classnames_1["default"](styles_module_scss_1["default"].avatarInitials, styles_module_scss_1["default"].roundedCircle);
    return (react_1["default"].createElement(gamut_1.Box, { borderRadius: "100%", overflow: "hidden" }, imageUrl ? react_1["default"].createElement("img", { alt: "My Account menu toggle", "data-testid": "avatar", width: avatarSize, height: avatarSize, src: imageUrl }) :
        react_1["default"].createElement("span", { className: outerBoxCS },
            react_1["default"].createElement("span", { className: innerBoxCS }, avatarSubTitle))));
};
