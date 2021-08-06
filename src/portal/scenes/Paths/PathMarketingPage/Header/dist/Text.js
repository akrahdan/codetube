"use strict";
exports.__esModule = true;
exports.Text = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var CTAButton_1 = require("portal/scenes/Paths/PathMarketingPage/CTAButton");
var Text_module_scss_1 = require("./styles/Text.module.scss");
var description = "Front-end engineers work closely with designers to make websites beautiful, functional, and fast. This Career Path will teach you not only the necessary languages and technologies, but how to think like a front-end engineer, too. By the end, you’ll have the portfolio and interview skills you need to start your new career.";
var heading = "Front-End Engineer";
exports.Text = function (_a) {
    var project = _a.project, ctaCallback = _a.ctaCallback, isPaidLanding = _a.isPaidLanding, isAnonymous = _a.isAnonymous, showTrialCTA = _a.showTrialCTA, useContentfulCTA = _a.useContentfulCTA;
    var header = project.header;
    return (react_1["default"].createElement("div", { className: Text_module_scss_1["default"].text },
        react_1["default"].createElement("h1", { className: Text_module_scss_1["default"].title },
            react_1["default"].createElement("span", { className: Text_module_scss_1["default"].goalHeader, "data-testid": "path-marketing-header-text" }, "Project Path"),
            lodash_1.get(header, 'heading') || heading),
        react_1["default"].createElement("p", { className: Text_module_scss_1["default"].description, "data-testid": "path-text-description" }, lodash_1.get(header, 'description') || description),
        isAnonymous && (react_1["default"].createElement("p", { className: Text_module_scss_1["default"].goalFooterText, "data-testid": "path-page-header-pro-upsell" },
            "To start this ",
            react_1["default"].createElement("span", { className: Text_module_scss_1["default"].goalFooter }),
            ' ',
            "Path, sign up for Codefluent.")),
        react_1["default"].createElement(CTAButton_1.CTAButton, { className: Text_module_scss_1["default"].cta, context: "header", pathId: "2", onClick: ctaCallback, showTrialCTA: showTrialCTA, useContentfulCTA: useContentfulCTA, isPaidLanding: isPaidLanding, "data-testid": "path-header-text-cta" })));
};
