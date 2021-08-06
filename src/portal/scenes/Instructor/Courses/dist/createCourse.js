"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
exports.CreateCourse = exports.routesMeta = void 0;
require("./course.scss");
var getRouteComponent_1 = require("./getRouteComponent");
var routes_1 = require("./routes");
var CourseCategory_1 = require("./CourseCategory");
var CourseTitle_1 = require("./CourseTitle");
var CourseDescription_1 = require("./CourseDescription");
var InstructionChoice_1 = require("./InstructionChoice");
var codefluent_svg_1 = require("static/images/brand/logo/codefluent.svg");
var react_1 = require("react");
var react_router_1 = require("react-router");
var classnames_1 = require("classnames");
var courses_1 = require("services/courses");
exports.routesMeta = (_a = {},
    _a["" + routes_1.CATEGORY] = {
        scene: CourseCategory_1["default"],
        pageName: undefined
    },
    _a["" + routes_1.TITLE] = {
        scene: CourseTitle_1["default"],
        pageName: undefined
    },
    _a["" + routes_1.DESCRIPTION] = {
        scene: CourseDescription_1["default"],
        pageName: undefined
    },
    _a["" + routes_1.CHOICE] = {
        scene: InstructionChoice_1["default"],
        pageName: undefined
    },
    _a);
var initialState = {
    title: '',
    description: '',
    category: ''
};
exports.CreateCourse = function (props) {
    var _a = react_1.useState('choice'), locationType = _a[0], setLocationType = _a[1];
    var createCourse = courses_1.useCreateCourseMutation()[0];
    var _b = react_1.useState(''), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(25), width = _c[0], setWidth = _c[1];
    var _d = react_1.useState(1), step = _d[0], setStep = _d[1];
    var _e = react_1.useState(initialState), course = _e[0], setCourse = _e[1];
    var push = react_router_1.useHistory().push;
    var headings = [routes_1.CHOICE, routes_1.TITLE, routes_1.CATEGORY, routes_1.DESCRIPTION,];
    var handleCreateCourse = function (courseRequest) { return __awaiter(void 0, void 0, void 0, function () {
        var history, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    history = props.history;
                    return [4 /*yield*/, createCourse(courseRequest).unwrap()];
                case 1:
                    result = _a.sent();
                    if (result) {
                        push("/instructor/course/" + result.id + "/manage");
                    }
                    console.log('Course: ', result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var Scene = getRouteComponent_1.getRouteComponent(exports.routesMeta, locationType).scene;
    return (React.createElement("div", { className: "full-page-takeover--window--1ei3d" },
        React.createElement("div", { className: "full-page-takeover--page--2QirY", "data-purpose": "page" },
            React.createElement("div", null,
                " ",
                React.createElement("div", { className: "full-page-takeover--header--2mfbT" },
                    React.createElement("div", { className: "full-page-takeover--logo-block--1Op9u" },
                        React.createElement("img", { className: "udemy-logo full-page-takeover--rebrand-logo--36Lru", alt: "Udemy", width: 91, height: 34, src: codefluent_svg_1["default"] })),
                    React.createElement("div", { className: "full-page-takeover--header-divider--3XSTc" }),
                    React.createElement("div", { className: "full-page-takeover--header-text-block--1PdFS", "data-purpose": "header-text" },
                        "Step ",
                        step,
                        " of 4"),
                    React.createElement("div", { className: "full-page-takeover--header-buttons--1lu2t" },
                        React.createElement("button", { "data-purpose": "exit-button", type: "button", className: "btn btn-tertiary" }, "Exit"))),
                React.createElement("div", { "data-purpose": "header-bottom", className: "full-page-takeover--header-bottom--progress--2Hfvp" },
                    React.createElement("div", { className: "full-page-takeover--header-bottom--progress-highlight--1Pr6t", style: { width: width + "%" } }))),
            React.createElement(Scene, { course: course, handleChange: function (v) { return setValue(v); }, updateCourse: setCourse }),
            React.createElement("div", { "data-purpose": "footer", className: "full-page-takeover--footer--2wFgA" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-xxs-6 full-page-takeover--button-container--1rnpO" },
                            React.createElement("div", { className: "udlite-in-udheavy" }, (locationType != routes_1.CHOICE) && React.createElement("button", { onClick: function () {
                                    var heading = headings[step - 1];
                                    var wd = ((step - 1) * 100 / (headings.length));
                                    setWidth(wd);
                                    setStep(step - 1);
                                    setLocationType(heading);
                                }, type: "button", "data-purpose": "left-button", className: "udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md udlite-link-neutral full-page-takeover--left-button--3-75z" },
                                React.createElement("span", null, "Previous")))),
                        React.createElement("div", { className: "col-xxs-6 full-page-takeover--button-container--1rnpO" },
                            React.createElement("div", { className: "udlite-in-udheavy" }, React.createElement("button", { type: "button", onClick: function () {
                                    if (step >= headings.length) {
                                        handleCreateCourse(course);
                                    }
                                    else {
                                        var heading = headings[step];
                                        var wd = ((step + 1) * 100 / (headings.length));
                                        setWidth(wd);
                                        setStep(step + 1);
                                        setLocationType(heading);
                                        setValue('');
                                    }
                                }, "data-purpose": "right-button", className: classnames_1["default"]("udlite-btn udlite-btn-large udlite-btn-primary udlite-heading-md full-page-takeover--right-button--i1q_g", {
                                    'udlite-btn-disabled': !course[locationType] && !value
                                }), disabled: !course[locationType] && !value, tabIndex: -1 },
                                React.createElement("span", null, locationType == routes_1.DESCRIPTION ? 'Create Course' : ' Continue'))))))))));
};
exports["default"] = exports.CreateCourse;
