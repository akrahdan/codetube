"use strict";
exports.__esModule = true;
exports.CurriculumCard = exports.cardHeight = void 0;
var overrides_1 = require("components/overrides");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var classnames_1 = require("classnames");
var react_1 = require("react");
var TrackLink_1 = require("components/TrackLink");
var index_1 = require("./Footer/index");
var Header_1 = require("./Header");
var index_2 = require("./Image/index");
var styles_module_scss_1 = require("./styles.module.scss");
var Subtitle_1 = require("./Subtitle");
exports.cardHeight = 180;
var cardStyles = {
    inProgress: 'yellow',
    completed: 'navy'
};
exports.CurriculumCard = function (_a) {
    var _b;
    var _c;
    var title = _a.title, difficulty = _a.difficulty, image = _a.image, showProLogo = _a.showProLogo, progressState = _a.progressState, tag = _a.tag, tagColor = _a.tagColor, text = _a.text, linkProps = _a.linkProps, _d = _a.isFullSize, isFullSize = _d === void 0 ? false : _d, dataTestId = _a.dataTestId, _e = _a.headingLevel, headingLevel = _e === void 0 ? 'h3' : _e, scope = _a.scope, scopeCount = _a.scopeCount;
    var boxVariant = progressState ? cardStyles[progressState] : false;
    console.log("Image: ", image);
    return (react_1["default"].createElement(overrides_1.Card, { display: "grid", gridTemplateRows: "repeat(3, max-content) 1fr max-content", minHeight: isFullSize ? gamut_styles_1.pxRem(exports.cardHeight * 2 + 32) : gamut_styles_1.pxRem(exports.cardHeight), variant: boxVariant !== null && boxVariant !== void 0 ? boxVariant : 'navy', shadow: "medium", position: "relative" },
        react_1["default"].createElement(Header_1.Header, { invertColors: progressState === 'completed', showProLogo: showProLogo, text: text }),
        react_1["default"].createElement(TrackLink_1.TrackLink, { target: '/', asButton: true, data: linkProps.trackingData, href: (_c = linkProps.href) !== null && _c !== void 0 ? _c : '/', to: linkProps.routeTo, className: styles_module_scss_1["default"].titleLink, onClick: linkProps.onClick, "aria-label": title + ", " + text + ", " + (showProLogo ? 'Pro only' : ''), "data-testid": dataTestId },
            react_1["default"].createElement(overrides_1.HeadingDeprecated, { className: classnames_1["default"](styles_module_scss_1["default"].heading, (_b = {},
                    _b[styles_module_scss_1["default"].completedHeading] = progressState === 'completed',
                    _b[styles_module_scss_1["default"].inProgressHeading] = progressState === 'inProgress',
                    _b)), as: headingLevel, fontSize: "xs", hideMargin: true }, title)),
        react_1["default"].createElement("div", null, !progressState && (react_1["default"].createElement(Subtitle_1.Subtitle, { scope: scope, scopeCount: scopeCount, difficulty: difficulty }))),
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].imageContainer }, isFullSize && image && (react_1["default"].createElement(index_2.Image, { image: image, progressState: progressState }))),
        react_1["default"].createElement(index_1.Footer, { progressState: progressState, tag: tag, tagColor: tagColor })));
};
