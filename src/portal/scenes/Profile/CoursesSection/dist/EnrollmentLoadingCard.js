"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.EnrollmentLoadingCard = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var react_1 = require("react");
var LoadingBox_1 = require("components/LoadingBox");
var ProgressBar_1 = require("portal/scenes/Dashboard/ProgressBar");
var TitleLoading = styled_1["default"](LoadingBox_1.LoadingBox)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 8rem;\n  height: 1rem;\n"], ["\n  width: 8rem;\n  height: 1rem;\n"])));
exports.EnrollmentLoadingCard = function () {
    return (react_1["default"].createElement(gamut_1.FlexBox, { "data-testid": "enrollment-loading-card", justifyContent: "space-between", bg: "background", p: 16, height: gamut_styles_1.pxRem(80) },
        react_1["default"].createElement(gamut_1.FlexBox, { flexDirection: "column", py: 4 },
            react_1["default"].createElement(TitleLoading, null)),
        react_1["default"].createElement(gamut_1.FlexBox, { alignItems: "flex-end", flexDirection: "column", mr: 32, mt: 8 },
            react_1["default"].createElement(ProgressBar_1.PercentageLoading, null),
            react_1["default"].createElement(ProgressBar_1.ProgressBarLoading, null))));
};
var templateObject_1;
