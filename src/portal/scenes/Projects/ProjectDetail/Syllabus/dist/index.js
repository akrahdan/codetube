"use strict";
exports.__esModule = true;
exports.Syllabus = void 0;
var gamut_1 = require("@codecademy/gamut");
var lodash_1 = require("lodash");
var react_1 = require("react");
var ContentfulContext_1 = require("portal/scenes/Paths/ContentfulContext");
var CTAButton_1 = require("../CTAButton");
var Tracks_1 = require("../Tracks");
var BackgroundArrow_1 = require("./icons/BackgroundArrow");
var styles_module_scss_1 = require("./styles.module.scss");
exports.Syllabus = function (_a) {
    var pathId = _a.pathId, tracks = _a.tracks, ctaCallback = _a.ctaCallback, isPaidLanding = _a.isPaidLanding, showTrialCTA = _a.showTrialCTA, useContentfulCTA = _a.useContentfulCTA;
    var cms = react_1.useContext(ContentfulContext_1["default"]);
    if (lodash_1.isEmpty(tracks))
        return null;
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].backgroundIconContainer },
            react_1["default"].createElement(BackgroundArrow_1.BackgroundArrow, { fill: cms.side_shapes_color })),
        react_1["default"].createElement(gamut_1.ContentContainer, null,
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].content },
                react_1["default"].createElement(Tracks_1.Tracks, { title: lodash_1.get(cms, 'syllabus.heading'), id: 3, trackDetails: tracks }),
                !useContentfulCTA && (react_1["default"].createElement(CTAButton_1.CTAButton, { context: "syllabus", pathId: pathId, onClick: ctaCallback, showTrialCTA: showTrialCTA, useContentfulCTA: useContentfulCTA, "data-testid": "path-syllabus-text-cta", isPaidLanding: isPaidLanding }))))));
};
