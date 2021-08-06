"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.AppHeaderLinkMobile = void 0;
var gamut_1 = require("@codecademy/gamut");
var styled_1 = require("@emotion/styled");
var react_1 = require("react");
var SharedStyles_1 = require("../../AppHeader/AppHeaderElements/SharedStyles");
var SeparatorOuter = styled_1["default"](gamut_1.Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-top: ", ";\n  margin-top: ", ";\n"], ["\n  border-top: ",
    ";\n  margin-top: ", ";\n"])), function (_a) {
    var theme = _a.theme, topSeparator = _a.topSeparator;
    return topSeparator ? "1px solid " + theme.colors['gray-600'] : '';
}, function (_a) {
    var topSeparator = _a.topSeparator;
    return (topSeparator ? '0.5rem' : '');
});
var SeparatorInner = styled_1["default"](gamut_1.Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: ", ";\n"], ["\n  margin-top: ", ";\n"])), function (_a) {
    var topSeparator = _a.topSeparator;
    return (topSeparator ? '0.5rem' : '');
});
var AppHeaderLinkButtonOuter = styled_1["default"].a(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-decoration: none;\n  padding: 1rem 0;\n  color: ", ";\n  ", "\n  ", "\n"], ["\n  text-decoration: none;\n  padding: 1rem 0;\n  color: ", ";\n  ", "\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.navy;
}, SharedStyles_1.hoverStyles, SharedStyles_1.focusStyles);
exports.AppHeaderLinkMobile = function (_a) {
    var action = _a.action, onClose = _a.onClose, item = _a.item, _b = _a.topSeparator, topSeparator = _b === void 0 ? false : _b;
    var Icon = item.icon;
    return (react_1["default"].createElement(SeparatorOuter, { topSeparator: topSeparator },
        react_1["default"].createElement(SeparatorInner, { topSeparator: topSeparator },
            react_1["default"].createElement(AppHeaderLinkButtonOuter, { "data-testid": item.dataTestId, href: item.href, onClick: function (event) {
                    action(event, item);
                    onClose === null || onClose === void 0 ? void 0 : onClose();
                }, target: item.newTab ? 'blank' : '' },
                react_1["default"].createElement(gamut_1.FlexBox, { lineHeight: "base", minWidth: "0", py: 16, whiteSpace: "nowrap", textAlign: "left", display: "flex" },
                    Icon && (react_1["default"].createElement(gamut_1.FlexBox, { alignContent: "center", mr: 16 },
                        react_1["default"].createElement(Icon, { size: 24, "aria-hidden": true }))),
                    item.text)))));
};
var templateObject_1, templateObject_2, templateObject_3;
