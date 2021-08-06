"use strict";
var _a, _b;
exports.__esModule = true;
exports.routesMeta = exports.routesMap = void 0;
var component_1 = require("@loadable/component");
var routeActions = require("./state/location/actions");
var Path = component_1["default"](function () { return Promise.resolve().then(function () { return require('./scenes/Paths'); }); });
var Profile = component_1["default"](function () { return Promise.resolve().then(function () { return require('./scenes/Profile'); }); });
var CoursePlayer = component_1["default"](function () { return Promise.resolve().then(function () { return require('./scenes/CoursePlayer'); }); });
exports.routesMap = (_a = {},
    _a["" + routeActions.path] = '/',
    _a["" + routeActions.profile] = '/profiles/:id',
    _a["" + routeActions.coursePlayer] = '/course-player/:id',
    _a);
exports.routesMeta = (_b = {},
    _b["" + routeActions.path] = {
        scene: Path,
        pageName: "projects"
    },
    _b["" + routeActions.profile] = {
        scene: Profile,
        pageName: undefined
    },
    _b["" + routeActions.coursePlayer] = {
        scene: CoursePlayer,
        pageName: undefined
    },
    _b);
