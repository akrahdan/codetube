"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ProjectCard = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_labs_1 = require("@codecademy/gamut-labs");
var classnames_1 = require("classnames");
var react_1 = require("react");
var CardElements_1 = require("components/CardElements");
var LoadingScreen_1 = require("components/LoadingScreen");
var TrackLink_1 = require("components/TrackLink");
var styles_module_scss_1 = require("./styles.module.scss");
exports.ProjectCard = function (_a) {
    var index = _a.index, project = _a.project, onClick = _a.onClick, hoverShadow = _a.hoverShadow, className = _a.className, trackingData = _a.trackingData;
    var title = project.title, _b = project.tags, tags = _b === void 0 ? [] : _b, id = project.id, img = project.url, description = project.description;
    var loadingColor = LoadingScreen_1.LOADING_COLORS[index % LoadingScreen_1.LOADING_COLORS.length];
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement(LoadingScreen_1.LoadingScreen, { hiddenObject: title, stretchToFit: true, loadingColor: loadingColor }),
        react_1["default"].createElement(TrackLink_1.TrackLink, { href: '/', to: "/", target: '', asButton: true, className: styles_module_scss_1["default"].trackLink, onClick: onClick, data: __assign(__assign({}, trackingData), { distinct_id: id }) },
            react_1["default"].createElement(gamut_1.CardShell, { variant: hoverShadow ? 'hoverable' : 'flat', className: classnames_1["default"](styles_module_scss_1["default"].card, className) },
                react_1["default"].createElement("div", { className: styles_module_scss_1["default"].img, style: { backgroundImage: "url(" + img + ")" } }),
                react_1["default"].createElement(gamut_1.Box, { p: 16, height: "11.5rem", overflow: "hidden" },
                    react_1["default"].createElement(gamut_labs_1.ProLogo, { variant: "cutout" }),
                    react_1["default"].createElement(CardElements_1.CardTitle, { className: styles_module_scss_1["default"].title, as: "h2" }, title),
                    react_1["default"].createElement(CardElements_1.CardDescription, { className: styles_module_scss_1["default"].description, truncateLine: 2 }, description),
                    react_1["default"].createElement(CardElements_1.CardTagList, null, tags.map(function (t) { return (react_1["default"].createElement(CardElements_1.CardTag, { key: t }, t)); })))))));
};
