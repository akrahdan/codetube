"use strict";
exports.__esModule = true;
exports.PortalRouter = void 0;
var gamut_styles_1 = require("@codecademy/gamut-styles");
var react_1 = require("react");
var routes_1 = require("portal/routes");
var createRootComponent_1 = require("components/createRootComponent");
var routing_1 = require("libs/location/routing");
var selectors_1 = require("state/location/selectors");
var authSlice_1 = require("state/auth/authSlice");
var hooks_1 = require("store/hooks");
var auth_1 = require("services/auth");
exports.PortalRouter = function (_a) {
    var portalData = _a.portalData, statusCode = _a.statusCode;
    var dispatch = hooks_1.useAppDispatch();
    var data = auth_1.useGetCurrentUserQuery().data;
    if (data) {
        var token = localStorage.getItem('token');
        var userResponse = {
            user: data,
            token: token
        };
        dispatch(authSlice_1.setCredentials(userResponse));
    }
    var locationType = hooks_1.useAppSelector(selectors_1.selectLocationType);
    var _b = routing_1.getRouteMetaForLocation(routes_1.routesMeta, locationType), Scene = _b.scene, pageName = _b.pageName;
    return (react_1["default"].createElement(Scene, null));
};
exports["default"] = createRootComponent_1.createRootComponent(exports.PortalRouter, { theme: gamut_styles_1.theme });
