"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var gamut_1 = require("@codecademy/gamut");
var styled_1 = require("@emotion/styled");
var gamut_labs_1 = require("@codecademy/gamut-labs");
var gamut_illustrations_1 = require("@codecademy/gamut-illustrations");
var PortalContainer_1 = require("portal/layouts/PortalContainer");
var UserBio_1 = require("./UserBio");
var CoursesSection_1 = require("./CoursesSection");
var useAuth_1 = require("store/useAuth");
var StyledContentContainer = styled_1["default"](gamut_1.ContentContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow-x: hidden;\n"], ["\n  overflow-x: hidden;\n"])));
var Profile = function () {
    var user = useAuth_1.useAuth().user;
    var enrollment = [{
            id: "here",
            length: 5
        },
        {
            id: "hereman",
            length: 8
        }];
    var backgroundColor = 'paleBlue';
    var isAllEmptyAndNotCurrentUser = false;
    return (React.createElement(PortalContainer_1.PortalContainer, { backgroundColor: backgroundColor },
        React.createElement(StyledContentContainer, { as: "main" },
            React.createElement(gamut_1.Box, { mb: { _: 48, sm: 96 }, mt: 32 },
                React.createElement(gamut_1.LayoutGrid, { gap: 32 },
                    React.createElement(gamut_1.Column, { size: { _: 12, sm: 12, md: 12 }, alignContent: "center" },
                        React.createElement(UserBio_1.UserBio, null)),
                    isAllEmptyAndNotCurrentUser ? (React.createElement(gamut_1.Column, { size: { _: 12, sm: 12, md: 12 }, "data-testid": "empty-section" },
                        React.createElement(gamut_labs_1.EmptySection, { stretchDirection: "right", illustration: gamut_illustrations_1.Hills, innerBGColor: backgroundColor, headingText: "There's not much here yet", bodyText: "Visit our forums to connect with active learners" },
                            React.createElement(gamut_1.FillButton, { href: '' }, "Visit Forums")))) : (React.createElement(gamut_1.Column, { offset: { _: 2, sm: 1, md: 1 }, size: { _: 8, sm: 10, md: 10 }, alignItems: "center", alignContent: 'center' },
                        React.createElement(CoursesSection_1.CoursesSection, { enrollments: enrollment, isCurrentUser: true }))))))));
};
exports["default"] = Profile;
var templateObject_1;
