"use strict";
exports.__esModule = true;
exports.AppHeaderLinkSections = void 0;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("react");
var AppHeaderLinkMobile_1 = require("../../../AppHeaderMobile/AppHeaderLinkMobile");
exports.AppHeaderLinkSections = function (_a) {
    var action = _a.action, onClose = _a.onClose, item = _a.item;
    return (react_1["default"].createElement(gamut_1.Box, null, item.type === 'profile-dropdown'
        ? item.popover.map(function (linkSection, sectionIndex) {
            return linkSection.map(function (link, linkIndex) {
                return (react_1["default"].createElement(AppHeaderLinkMobile_1.AppHeaderLinkMobile, { action: action, item: link, onClose: onClose, key: link.id, topSeparator: sectionIndex !== 0 && linkIndex === 0 }));
            });
        })
        : item.popover.map(function (link) {
            return (react_1["default"].createElement(AppHeaderLinkMobile_1.AppHeaderLinkMobile, { onClose: onClose, action: action, item: link, key: link.id }));
        })));
};
