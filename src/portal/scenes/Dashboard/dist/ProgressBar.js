"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ContainerProgressBar = exports.ProgressBarLoading = exports.PercentageLoading = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var react_1 = require("react");
var LoadingBox_1 = require("components/LoadingBox");
var PercentageBox = styled_1["default"](gamut_1.Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), gamut_styles_1.pxRem(2));
exports.PercentageLoading = styled_1["default"](LoadingBox_1.LoadingBox)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: ", ";\n  height: 1.25rem;\n  margin-bottom: ", ";\n"], ["\n  width: ", ";\n  height: 1.25rem;\n  margin-bottom: ", ";\n"])), gamut_styles_1.pxRem(38), gamut_styles_1.pxRem(6));
exports.ProgressBarLoading = styled_1["default"](LoadingBox_1.LoadingBox)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: ", ";\n  height: 0.5rem;\n"], ["\n  width: ", ";\n  height: 0.5rem;\n"])), gamut_styles_1.pxRem(96));
exports.ContainerProgressBar = function (_a) {
    var containerProgress = _a.containerProgress, className = _a.className;
    var renderProgressLoading = function () { return (react_1["default"].createElement(gamut_1.FlexBox, { alignItems: "flex-end", flexDirection: "column", "data-testid": "progress-loading" },
        react_1["default"].createElement(exports.PercentageLoading, null),
        react_1["default"].createElement(exports.ProgressBarLoading, null))); };
    var percentComplete = (containerProgress === null || containerProgress === void 0 ? void 0 : containerProgress.percent_complete) || 0;
    var renderProgress = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(PercentageBox, { as: "span", fontSize: 16, fontWeight: "title", fontFamily: "accent", textAlign: "right", "aria-hidden": "true" }, containerProgress.percent_complete + "%"),
        react_1["default"].createElement(gamut_1.Box, { width: { _: gamut_styles_1.pxRem(96), sm: gamut_styles_1.pxRem(72) }, height: gamut_styles_1.pxRem(8) },
            react_1["default"].createElement(gamut_1.ProgressBar, { percent: percentComplete, pattern: "diagonalStripesDense", variant: "yellow", size: "medium" })))); };
    return (react_1["default"].createElement(gamut_1.FlexBox, { flexDirection: "column", alignItems: "flex-end", className: className }, containerProgress ? renderProgress() : renderProgressLoading()));
};
var templateObject_1, templateObject_2, templateObject_3;
