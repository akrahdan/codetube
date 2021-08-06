"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Supporting = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var classnames_1 = require("classnames");
var lodash_1 = require("lodash");
var react_1 = require("react");
var ContentfulContext_1 = require("portal/scenes/Paths/ContentfulContext");
var helpers_1 = require("../helpers");
var AsideBackground_1 = require("./icons/AsideBackground");
var MobileAsideBackground_1 = require("./icons/MobileAsideBackground");
var styles_module_scss_1 = require("./styles.module.scss");
var AsideRunOff = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 15.875rem;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: calc(50% + (", " / 2) - 1rem);\n"], ["\n  height: 15.875rem;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: calc(50% + (", " / 2) - 1rem);\n"])), gamut_styles_1.contentWidths.md);
exports.Supporting = function (_a) {
    var project = _a.project;
    var _b = react_1.useContext(ContentfulContext_1["default"]), outcome_headline = _b.outcome_headline, _c = _b.shapes_fill_color, shapes_fill_color = _c === void 0 ? '#66C4FF' : _c;
    var _d = project.header_primary_color, header_primary_color = _d === void 0 ? "rgb(16, 22, 47)" : _d, _e = project.header_secondary_color, header_secondary_color = _e === void 0 ? '#66C4FF' : _e, outcomes = project.outcomes;
    // if (outcomes.length === 0 && !outcome_headline) return null;
    var renderedAsideContent = (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", { className: styles_module_scss_1["default"].asideTitle }, lodash_1.get(outcome_headline, 'title') || "What will you be able to do?"),
        react_1["default"].createElement("p", null, lodash_1.get(outcome_headline, 'description') || "Here a few things you'll be able to do with this skill")));
    var renderedSupportingPoints = outcomes.map(function (_a, i) {
        var title = _a.title, description = _a.description;
        var IconComponent = helpers_1.ICONS[i];
        return IconComponent ? (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].supportingPointContainer, key: title },
            react_1["default"].createElement(IconComponent, { primary: shapes_fill_color }),
            react_1["default"].createElement("h3", { className: styles_module_scss_1["default"].supportingPointTitle }, title),
            react_1["default"].createElement("p", { className: styles_module_scss_1["default"].supportingPointDescription }, description))) : null;
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
            react_1["default"].createElement(AsideRunOff, { style: { backgroundColor: header_primary_color } }),
            react_1["default"].createElement(gamut_1.ContentContainer, null,
                react_1["default"].createElement("div", { className: styles_module_scss_1["default"].contentContainer },
                    react_1["default"].createElement("div", { className: classnames_1["default"](styles_module_scss_1["default"].asideContainer, styles_module_scss_1["default"].showOnDesktop) },
                        react_1["default"].createElement(AsideBackground_1.AsideBackground, { fill: header_primary_color }),
                        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].asideContent }, renderedAsideContent)),
                    react_1["default"].createElement("div", { className: styles_module_scss_1["default"].showOnMobile },
                        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].mobileHeader, style: { backgroundColor: header_secondary_color } },
                            react_1["default"].createElement("span", { className: styles_module_scss_1["default"].mobileWrapper }, renderedAsideContent)),
                        react_1["default"].createElement(MobileAsideBackground_1.MobileAsideBackground, { fill: header_secondary_color })),
                    react_1["default"].createElement("div", { className: styles_module_scss_1["default"].slopeContainer }, renderedSupportingPoints))))));
};
var templateObject_1;
