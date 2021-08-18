"use strict";
exports.__esModule = true;
exports.Header = void 0;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("react");
// import { Path } from '~/typings/entities/path';
var Card_1 = require("./Card");
var Hero_1 = require("./Hero");
var index_module_scss_1 = require("./styles/index.module.scss");
var Text_1 = require("./Text");
var Wave_1 = require("./Wave");
var WaveTall_1 = require("./WaveTall");
exports.Header = function (_a) {
    var 
    //   path,
    ctaCallback = _a.ctaCallback, project = _a.project, isPaidLanding = _a.isPaidLanding, isAnonymous = _a.isAnonymous, showTrialCTA = _a.showTrialCTA, useContentfulCTA = _a.useContentfulCTA;
    var _b = project.header_primary_color, header_primary_color = _b === void 0 ? "rgb(16, 22, 47)" : _b, _c = project.header_secondary_color, header_secondary_color = _c === void 0 ? '#66C4FF' : _c;
    return (react_1["default"].createElement("div", { className: index_module_scss_1["default"].header, style: { background: header_primary_color }, "data-testid": "path-marketing-header" },
        react_1["default"].createElement(Hero_1.Hero, { id: project.id, className: index_module_scss_1["default"].hero }),
        react_1["default"].createElement(Wave_1.Wave, { className: index_module_scss_1["default"].wave, fill: header_secondary_color }),
        react_1["default"].createElement(WaveTall_1.WaveTall, { className: index_module_scss_1["default"].waveTall, fill: header_secondary_color }),
        react_1["default"].createElement(gamut_1.ContentContainer, { className: index_module_scss_1["default"].content },
            react_1["default"].createElement(Text_1.Text, { project: project, ctaCallback: ctaCallback, isPaidLanding: isPaidLanding, isAnonymous: isAnonymous, showTrialCTA: showTrialCTA, useContentfulCTA: useContentfulCTA }),
            react_1["default"].createElement(Card_1.Card, { project: project, completionTime: project.completion_time }))));
};
