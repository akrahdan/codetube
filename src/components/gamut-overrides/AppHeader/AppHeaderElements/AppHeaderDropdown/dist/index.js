"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.AppHeaderDropdown = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_icons_1 = require("@codecademy/gamut-icons");
var styled_1 = require("@emotion/styled");
var classnames_1 = require("classnames");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var Popover_1 = require("../../../Popover");
var AppHeaderAvatar_1 = require("../AppHeaderAvatar");
var AppHeaderLinkSections_1 = require("../AppHeaderLinkSections");
var SharedStyles_1 = require("../SharedStyles");
var styles_module_scss_1 = require("./styles.module.scss");
var AppHeaderTextTargetButton = styled_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n"])), SharedStyles_1.textButtonStyles, SharedStyles_1.hoverStyles, SharedStyles_1.focusStyles);
var AppHeaderAvatarTargetButton = styled_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: transparent;\n  border: transparent;\n  font-weight: normal;\n  padding: 2px 0;\n  ", "\n  ", "\n"], ["\n  background-color: transparent;\n  border: transparent;\n  font-weight: normal;\n  padding: 2px 0;\n  ", "\n  ", "\n"])), SharedStyles_1.hoverStyles, SharedStyles_1.focusStyles);
exports.AppHeaderDropdown = function (_a) {
    var action = _a.action, item = _a.item;
    var headerDropdownRef = react_1.useRef(null);
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var toggleIsOpen = function (event) {
        setIsOpen(!isOpen);
        !isOpen && action(event, item);
    };
    var handleClose = function () {
        setIsOpen(false);
    };
    var clickTarget = item.type === 'profile-dropdown' ? (react_1["default"].createElement(AppHeaderAvatarTargetButton, { onClick: function (event) { return toggleIsOpen(event); } },
        react_1["default"].createElement(AppHeaderAvatar_1.AppHeaderAvatar, { imageUrl: item.avatar, avatarSubTitle: item.userDisplayName.substr(0, 2) }))) : (react_1["default"].createElement(AppHeaderTextTargetButton, { className: classnames_1["default"](styles_module_scss_1["default"].target, isOpen && styles_module_scss_1["default"].open), onClick: function (event) { return toggleIsOpen(event); } },
        react_1["default"].createElement("span", { title: item.text, className: styles_module_scss_1["default"].copy }, item.text),
        react_1["default"].createElement(gamut_icons_1.ArrowChevronDownFilledIcon, { size: 12, className: styles_module_scss_1["default"].icon, "aria-label": "dropdown" })));
    var paddingY = 24;
    var linkHeight = 56;
    var separatorHeight = 16;
    var getPopoverHeight = function () {
        if (item.type === 'dropdown')
            return item.popover.length * linkHeight + paddingY;
        var numberOfLinks = item.popover.reduce(function (sum, linksArray) { return sum + linksArray.length; }, 0);
        var totalSeparatorHeight = separatorHeight * (item.popover.length - 1);
        return numberOfLinks * linkHeight + totalSeparatorHeight + paddingY;
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { ref: headerDropdownRef }, clickTarget),
        react_1["default"].createElement(framer_motion_1.AnimatePresence, null, isOpen && (react_1["default"].createElement(Popover_1.Popover, { align: item.type === 'profile-dropdown' ? 'right' : 'left', verticalOffset: item.type === 'profile-dropdown' ? 0 : -2, outline: true, isOpen: isOpen, onRequestClose: handleClose, targetRef: headerDropdownRef },
            react_1["default"].createElement(framer_motion_1.motion.div, { style: { overflow: 'hidden', top: '12px', position: 'relative' }, initial: { height: 0 }, animate: { height: getPopoverHeight() }, transition: { duration: 0.175 }, exit: { height: 0 } },
                react_1["default"].createElement(gamut_1.Box, { px: 24 },
                    react_1["default"].createElement(AppHeaderLinkSections_1.AppHeaderLinkSections, { action: action, item: item, onClose: handleClose }))))))));
};
var templateObject_1, templateObject_2;
