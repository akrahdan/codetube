"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.EnrollmentCard = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_icons_1 = require("@codecademy/gamut-icons");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var react_1 = require("react");
var ProgressBar_1 = require("portal/scenes/Dashboard/ProgressBar");
var StyledContainerProgressBar = styled_1["default"](ProgressBar_1.ContainerProgressBar)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-right: ", ";\n  margin-left: 0;\n  align-items: flex-start;\n\n  ", " {\n    margin-left: auto;\n    align-items: flex-end;\n  }\n"], ["\n  padding-right: ", ";\n  margin-left: 0;\n  align-items: flex-start;\n\n  ", " {\n    margin-left: auto;\n    align-items: flex-end;\n  }\n"])), gamut_styles_1.pxRem(24), gamut_styles_1.theme.breakpoints.sm);
var StyledArrowChevronRightIcon = styled_1["default"](gamut_icons_1.ArrowChevronRightIcon)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: ", ";\n  path {\n    stroke-width: 2;\n  }\n"], ["\n  color: ", ";\n  path {\n    stroke-width: 2;\n  }\n"])), gamut_styles_1.theme.colors.text);
exports.EnrollmentCard = function (_a) {
    var id = _a.id, onEnrollmentClick = _a.onEnrollmentClick;
    var courseTypeDisplayText = "Projects";
    return (react_1["default"].createElement(gamut_1.Anchor, { href: "/", variant: "interface", "aria-label": "" + courseTypeDisplayText, onClick: function () { return onEnrollmentClick === null || onEnrollmentClick === void 0 ? void 0 : onEnrollmentClick(''); }, display: "block" },
        react_1["default"].createElement(gamut_1.FlexBox, { bg: "white", justifyContent: "space-between", p: 16 },
            react_1["default"].createElement(gamut_1.FlexBox, { flexDirection: { _: 'column', sm: 'row' }, alignItems: { _: 'flex-start', sm: 'center' }, width: 1 },
                react_1["default"].createElement(gamut_1.FlexBox, { flexDirection: "column" },
                    react_1["default"].createElement(gamut_1.FlexBox, { alignItems: "center" },
                        react_1["default"].createElement(gamut_1.Text, { fontFamily: "accent", fontSize: 14, pl: 0 }, courseTypeDisplayText)),
                    react_1["default"].createElement(gamut_1.Text, { as: "h3", fontSize: 16, pt: 4, lineHeight: "base" }, "How to build netflix from Scratch"))),
            react_1["default"].createElement(gamut_1.FlexBox, { alignItems: "center", alignSelf: { _: 'flex-start', sm: 'inherit' }, mt: { _: 16, sm: 'inherit' } },
                react_1["default"].createElement(StyledArrowChevronRightIcon, null)))));
};
var templateObject_1, templateObject_2;
