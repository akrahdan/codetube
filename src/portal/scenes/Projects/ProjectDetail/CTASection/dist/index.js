"use strict";
exports.__esModule = true;
exports.CTASection = void 0;
var gamut_1 = require("@codecademy/gamut");
var lodash_1 = require("lodash");
var react_1 = require("react");
var ContentfulContext_1 = require("portal/scenes/Paths/ContentfulContext");
var CTAButton_1 = require("../CTAButton");
var styles_module_scss_1 = require("./styles.module.scss");
exports.CTASection = function (_a) {
    var pathId = _a.pathId, ctaCallback = _a.ctaCallback, isPaidLanding = _a.isPaidLanding, showTrialCTA = _a.showTrialCTA, useContentfulCTA = _a.useContentfulCTA;
    var cta_section = react_1.useContext(ContentfulContext_1["default"]).cta_section;
    if (!cta_section)
        return null;
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement(gamut_1.ContentContainer, null,
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].contentContainer },
                react_1["default"].createElement("h1", { className: styles_module_scss_1["default"].title }, lodash_1.get(cta_section, 'heading') || "Join Hundreds of People to become a Pro"),
                react_1["default"].createElement(CTAButton_1.CTAButton, { context: "cta_section", pathId: pathId || "3", onClick: ctaCallback, showTrialCTA: showTrialCTA, useContentfulCTA: useContentfulCTA, isPaidLanding: isPaidLanding, "data-testid": "path-footer-text-cta" })))));
};
