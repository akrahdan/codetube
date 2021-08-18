"use strict";
exports.__esModule = true;
exports.TrackDetail = void 0;
var react_1 = require("react");
var styles_module_scss_1 = require("./styles.module.scss");
exports.TrackDetail = function (_a) {
    var id = _a.id, title = _a.title, description = _a.description;
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].trackDetailContainer, "data-testid": "path-marketing-syllabus-track-" + id },
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].trackDetailNumber }, id),
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].trackDetailText },
            react_1["default"].createElement("h3", { className: styles_module_scss_1["default"].trackDetailTitle }, title),
            react_1["default"].createElement("p", { className: styles_module_scss_1["default"].trackDetailDescription }, description))));
};
