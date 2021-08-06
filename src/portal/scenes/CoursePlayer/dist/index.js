"use strict";
exports.__esModule = true;
var styles_module_css_1 = require("./styles.module.css");
var Manager_1 = require("./Manager");
var react_1 = require("react");
var Container_1 = require("./Container");
var Overlay_1 = require("./Overlay");
var control_bar_1 = require("./control-bar/control-bar");
var progress_bar_1 = require("./progress-bar/progress-bar");
var header_1 = require("./header/header");
var command_layer_1 = require("./command-layer/command-layer");
var buffering_indicator_1 = require("./buffering-indicator/buffering-indicator");
var video_1 = require("./video/video");
var sync_settings_1 = require("./sync-settings/sync-settings");
var sync_clip_progress_1 = require("./sync-clip-progress/sync-clip-progress");
var captions_1 = require("./captions/captions");
var error_modal_1 = require("./error-modal/error-modal");
var keyboard_shortcuts_1 = require("./keyboard-shortcuts/keyboard-shortcuts");
var classnames_1 = require("classnames");
var lecture_1 = require("./contentItem/lecture");
var CoursePlayer = function () {
    var _a;
    var _b = react_1.useState(false), toggle = _b[0], setToggle = _b[1];
    return (React.createElement("div", { className: styles_module_css_1["default"].next },
        React.createElement("div", { className: classnames_1["default"](styles_module_css_1["default"].courseLayout, (_a = {},
                _a[styles_module_css_1["default"].navCollapse] = toggle,
                _a)) },
            React.createElement("div", { className: styles_module_css_1["default"].coursePlayerLayout },
                React.createElement("div", { className: styles_module_css_1["default"].navToggleButtonContainer },
                    React.createElement("button", { className: styles_module_css_1["default"].navToggle, onClick: function () {
                            setToggle(!toggle);
                        } },
                        React.createElement("span", null,
                            React.createElement("svg", { className: styles_module_css_1["default"].navToggleSvg, xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 24 24" },
                                React.createElement("path", { d: "M2 17.02h17.33v2H2zM2 11.06h15.49v2H2zM18.55 2.52L17.2 3.98l1.16 1.08H2v2h16.4L17.35 8.2l1.46 1.37L22.2 5.9l-3.64-3.39zm.78 3.54v-.08l.04.04-.04.04z" }))))),
                React.createElement("div", { tabIndex: -1 },
                    React.createElement("div", { className: styles_module_css_1["default"].playerWrapper },
                        React.createElement(Manager_1["default"], null,
                            React.createElement(Container_1["default"], null,
                                React.createElement(sync_settings_1["default"], null),
                                React.createElement(sync_clip_progress_1["default"], null),
                                React.createElement(error_modal_1["default"], null),
                                React.createElement(Overlay_1["default"], null),
                                React.createElement(captions_1["default"], null),
                                React.createElement(buffering_indicator_1["default"], null),
                                React.createElement(header_1["default"], null),
                                React.createElement(keyboard_shortcuts_1["default"], null),
                                React.createElement(command_layer_1["default"], null),
                                React.createElement(video_1["default"], null),
                                React.createElement("div", { style: { position: 'absolute', bottom: 0, right: 0, left: 0 } },
                                    React.createElement(progress_bar_1["default"], null),
                                    React.createElement(control_bar_1["default"], null))))))),
            React.createElement("div", { className: styles_module_css_1["default"].courseLayoutNav },
                React.createElement("div", { className: styles_module_css_1["default"].courseLayoutNavContent },
                    React.createElement("div", { className: styles_module_css_1["default"].navNavigation },
                        React.createElement("div", { className: styles_module_css_1["default"].navHeader },
                            React.createElement("div", { className: styles_module_css_1["default"].courseTitleSection },
                                React.createElement("h1", { className: styles_module_css_1["default"].courseTitle },
                                    React.createElement("a", { className: styles_module_css_1["default"].courseTitleLink }, "Building a Streaming Service From Scratch")),
                                React.createElement("h2", { className: styles_module_css_1["default"].courseSubTitle }, "Basics and Fundamentals")),
                            React.createElement("div", null,
                                React.createElement("div", { role: 'tablist', tabIndex: 0, className: styles_module_css_1["default"].tabList },
                                    React.createElement("div", { className: styles_module_css_1["default"].tabListHeader },
                                        React.createElement("button", { tabIndex: -1, className: classnames_1["default"](styles_module_css_1["default"].navTab, styles_module_css_1["default"].navTabItem) },
                                            React.createElement("div", { tabIndex: -1, className: styles_module_css_1["default"].navTabItemCss },
                                                React.createElement("div", { tabIndex: -1, className: styles_module_css_1["default"].nestedCss }, "Table of Contents"),
                                                React.createElement("span", { className: styles_module_css_1["default"].tableContentBackground }))),
                                        React.createElement("button", { className: classnames_1["default"](styles_module_css_1["default"].navTab, styles_module_css_1["default"].navTabItem) },
                                            React.createElement("div", { tabIndex: -1, className: styles_module_css_1["default"].navTabItemCss },
                                                React.createElement("div", { tabIndex: -1, className: styles_module_css_1["default"].nestedCss }, "Notes"),
                                                React.createElement("span", { className: styles_module_css_1["default"].notesBackground }))))))),
                        React.createElement("div", { className: styles_module_css_1["default"].navContent },
                            React.createElement("div", { role: 'tabpanel', className: styles_module_css_1["default"].navTabPanel },
                                React.createElement("div", { className: styles_module_css_1["default"].navPanelItem },
                                    React.createElement("div", { className: styles_module_css_1["default"].navPanelItemBackground },
                                        React.createElement("div", { className: styles_module_css_1["default"].navPanelPadding },
                                            React.createElement("div", { className: styles_module_css_1["default"].navDisplay },
                                                React.createElement("div", { className: styles_module_css_1["default"].progressContainer },
                                                    React.createElement("svg", { className: styles_module_css_1["default"].svgProgress, "aria-label": "module completed", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", transform: "rotate(-90)" },
                                                        React.createElement("circle", { r: 11, cx: 12, cy: 12, className: styles_module_css_1["default"].svgProgressBackground, strokeWidth: 2 }),
                                                        React.createElement("text", { className: styles_module_css_1["default"].svgProgressText, x: "49%", y: "-31%", textAnchor: "middle", transform: "rotate(90)" }, "1"),
                                                        React.createElement("circle", { r: 11, cx: 12, cy: 12, strokeWidth: 2, strokeDasharray: "69.11503837897544 69.11503837897544", strokeDashoffset: 0, className: styles_module_css_1["default"].svgProgressCircle }))),
                                                React.createElement("div", { className: styles_module_css_1["default"].navItemContent },
                                                    React.createElement("div", { className: styles_module_css_1["default"].navItemHeader }, "Course Header"),
                                                    React.createElement("div", { className: styles_module_css_1["default"].navItemSubTitle },
                                                        React.createElement("svg", { className: styles_module_css_1["default"].svgDuration, xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 24 24" },
                                                            React.createElement("path", { d: "M12 23.1a11.44 11.44 0 1 1 11.43-11.43c0 6.3-5.13 11.42-11.43 11.42zm0-20.87a9.44 9.44 0 0 0 0 18.87 9.44 9.44 0 0 0 0-18.87z" }),
                                                            React.createElement("path", { d: "M13 11V3.95h-2V11H4.36v2H13v-2z" })),
                                                        React.createElement("span", { className: styles_module_css_1["default"].screenReader }, "Module Length"),
                                                        "10 mins")))),
                                        React.createElement("div", { className: styles_module_css_1["default"].navDisplayCss })),
                                    React.createElement("div", { className: styles_module_css_1["default"].courseLectureBg },
                                        React.createElement("div", { style: { height: 'auto', overflow: 'visible', visibility: 'visible' }, className: styles_module_css_1["default"].lectureDiv },
                                            React.createElement("button", { className: styles_module_css_1["default"].lectureContent },
                                                React.createElement("div", { className: styles_module_css_1["default"].contentItemCircle },
                                                    React.createElement("div", { className: styles_module_css_1["default"].contentCircleThing },
                                                        React.createElement("svg", { "aria-label": "selected", className: styles_module_css_1["default"].contentCircleSvg, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                                                            React.createElement("path", { d: "M6.23 20.7L19.77 12 6.23 3.3" })))),
                                                React.createElement("div", { className: styles_module_css_1["default"].contentItemBody },
                                                    React.createElement("h3", { className: styles_module_css_1["default"].contentBodyH3 },
                                                        React.createElement("div", { className: styles_module_css_1["default"].contentCenter },
                                                            React.createElement("span", null, "Course Overview"))),
                                                    React.createElement("div", { className: styles_module_css_1["default"].contentItemDuration }, "1m 32s")))))),
                                React.createElement(lecture_1.Lecture, null),
                                React.createElement(lecture_1.Lecture, null),
                                React.createElement(lecture_1.Lecture, null)))))))));
};
exports["default"] = CoursePlayer;
